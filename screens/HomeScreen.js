import '../global.css';
import React, {useEffect, useState} from 'react'
import { View, Text, Platform, TouchableOpacity, ScrollView, Animated} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import TrendingMovies from "../components/trendingMovies";
import {TrendingTv} from "../components/trendingMovies";
import MovieList from '../components/movieList';
import {TvList} from "../components/movieList";
import {useNavigation} from "@react-navigation/native";
import Loading from "../components/loading";
import {
    fetchOnAirTv,
    fetchTopRatedMovies, fetchTopRatedTv,
    fetchTrendingMovies,
    fetchTrendingTv,
    fetchUpcomingMovies
} from "../api/MovieDB";
import {Image} from "react-native";
import { Modal,Portal, Button, Provider as PaperProvider } from 'react-native-paper';
import { Dimensions } from 'react-native';




var {width,height} = Dimensions.get('window');

const ios = Platform.OS =='ios';
export default function HomeScreen() {

    const [trending, setTrending] = useState([]);
    const [trendingTv, settrendingTv] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [upcomingTv, setUpcomingTv] = useState([])
    const [topRated, setTopRated] = useState([]);
    const [topRatedTv, setTopRatedTv] = useState([]);
    const [showMovies, setShowMovies] = useState(true); 
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const slideAnim = useState(new Animated.Value(-width))[0];
    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
        getTopRatedTv()
        getTrendingTv();
        getUpcomingTv()
    }, []);

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if(data && data.results) setTrending(data.results);
        setLoading(false);
    }
    const getTrendingTv = async () => {
        const data = await fetchTrendingTv();
        if(data && data.results) settrendingTv(data.results);
        setLoading(false);
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if(data && data.results) setUpcoming(data.results);
        setLoading(false);
    }
    const getUpcomingTv = async () => {
        const data = await fetchOnAirTv();
        if(data && data.results) setUpcomingTv(data.results);
        setLoading(false);
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if(data && data.results) setTopRated(data.results);
        setLoading(false);
    }
    const getTopRatedTv = async () => {
        const data = await fetchTopRatedTv();
        if(data && data.results) setTopRatedTv(data.results);
        setLoading(false);
    }
    const openModal = () => {
        setVisible(true)
        Animated.timing(slideAnim,{
            toValue:0,
            duration:300,
            useNativeDriver:true,
        }).start();
    };
    const closeModal = () => {
        Animated.timing(slideAnim, {
            toValue: -width, 
            duration: 300,
            useNativeDriver: true,
        }).start(() => setVisible(false)); 
    };
    
  return(
    <PaperProvider>
    <View className="flex-1 bg-neutral-900">
        <StatusBar style="light" />

         <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4" style={{ position: 'absolute' }}>
                            <TouchableOpacity onPress={openModal} className="rounded-xl p-1 mt-5">
                                <Image style={{ height: 30, width: 30 }} source={require('../assets/menu.png')} />
                            </TouchableOpacity>

                            <TouchableOpacity className="rounded-xl p-1 mt-5 " onPress={() => navigation.navigate('Search')} >
                                <Image style={{ height: 30, width: 30 }} source={require('../assets/search.png')} />
                            </TouchableOpacity>
                        </SafeAreaView>

        <Portal>

            <Modal visible={visible} onDismiss={closeModal} transparent={true}  >
            <TouchableOpacity

            activeOpacity={1}
            onPress={closeModal}
        >
                <Animated.View

                                                    style={[
                                                            styles.modalContainer,
                                                        {
                                                            transform: [{ translateX: slideAnim }],
                                                        },
                                                    ]}
                                                >
                <TouchableOpacity
                            onPress={closeModal}
                            style={styles.closeButton}
                        >
                            <Image
                                source={require('../assets/x-button.png')}
                                style={{ width: 33, height: 33 }}
                            />
                        </TouchableOpacity>
                <Text style={styles.modalTitle}>Categories :</Text>
                <Button mode="contained" onPress={() => { setShowMovies(true); getTrendingMovies(); setVisible(false); }} style={styles.button} >
                    Movies
                </Button>
                <Button mode="contained" onPress={() => { setShowMovies(false); getTrendingTv(); setVisible(false); }} style={styles.button}>
                 TV Shows
                </Button>
                </Animated.View>
                </TouchableOpacity>
                </Modal>
        </Portal>


        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10, backgroundColor: '#171717' }}>
            {loading ? (
                <Loading />
            ) : (
                <View>
                   
                    {showMovies ? 
                    
                        <TrendingMovies data={trending} /> 
                    
                    :   <TrendingTv data={trendingTv} />}
                </View>
            )}

            {/* Upcoming Movies (Only Show If Movies Are Selected) */}
            {showMovies ? upcoming.length >0 && <MovieList title="Upcoming Movies" category="upcoming" data={upcoming} /> : upcomingTv.length>0 && <TvList category="on_the_air" name="On The Air" data={upcomingTv}/>}

            {/* Top Rated Movies (Only Show If Movies Are Selected) */}
            {showMovies ? topRated.length > 0 && <MovieList title="Top Rated" category="top_rated" data={topRated} /> :  topRatedTv.length>0 && <TvList category="top_rated" name="Top Rated Tv" data={topRatedTv}/>}
        </ScrollView>
    </View>
</PaperProvider>
);
}

// Styles
const styles = {

    modalContainer: {
    backgroundColor: '#171717',
    padding: 20,
    borderRadius: 20,
    width:width*0.8,
    height:height,
    },
    modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'white',
    marginTop:60
    },
    button: {
    marginVertical: 5,
    width: '100%',

    },
     closeButton: {
            position: 'absolute',
            top: 80,
            right: 25,
            zIndex: 1,
        },
    };
//<Button mode="contained" style={styles.button}>
                //Favourite Actors
                //</Button>