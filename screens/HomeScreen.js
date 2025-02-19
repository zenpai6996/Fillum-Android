import '../global.css';
import React, {useEffect, useState} from 'react'
import {View, Text, Platform, TouchableOpacity, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import TrendingMovies from "../components/trendingMovies";
import MovieList from '../components/movieList';
import {useNavigation} from "@react-navigation/native";
import Loading from "../components/loading";
import {fetchTopRatedMovies, fetchTrendingMovies, fetchTrendingTv, fetchUpcomingMovies} from "../api/MovieDB";
import {Image} from "react-native";
import { Modal, Portal, Button, Provider as PaperProvider } from 'react-native-paper';
import { Dimensions } from 'react-native';


const styles = {
    modalContainer: {
    backgroundColor: '#171717',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    
    },
    modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    },
    button: {
    marginVertical: 5,
    width: '100%',
    },
    };
var {width,height} = Dimensions.get('window');

const ios = Platform.OS =='ios';
export default function HomeScreen() {

    const [trending, setTrending] = useState([]);
    const [trendingTv, settrendingTv] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [showMovies, setShowMovies] = useState(true); 
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
        getTrendingTv();
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
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if(data && data.results) setTopRated(data.results);
        setLoading(false);
    }
    
  return(
    <PaperProvider>
    <View className="flex-1 bg-neutral-900">
        <StatusBar style="light" />

      
        <Portal>
            <Modal visible={visible} onDismiss={() => setVisible(false)} style={{width:width*0.8}}contentContainerStyle={styles.modalContainer}>
                <Text style={styles.modalTitle}>Choose Category</Text>
                <Button mode="contained" onPress={() => { setShowMovies(true); getTrendingMovies(); setVisible(false); }} style={styles.button}>
                    Movies
                </Button>
                <Button mode="contained" onPress={() => { setShowMovies(false); getTrendingTv(); setVisible(false); }} style={styles.button}>
                 TV Shows
                </Button>
            </Modal>
        </Portal>

       
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4" style={{ position: 'absolute' }}>
            <TouchableOpacity onPress={() => setVisible(true)} className="rounded-xl p-1 mt-5">
                <Image style={{ height: 30, width: 30 }} source={require('../assets/menu.png')} />
            </TouchableOpacity>

            <TouchableOpacity className="rounded-xl p-1 mt-5 ">
                <Image style={{ height: 30, width: 30 }} source={require('../assets/search.png')} />
            </TouchableOpacity>
        </SafeAreaView>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10, backgroundColor: '#171717' }}>
            {loading ? (
                <Loading />
            ) : (
                <View>
                   
                    {showMovies ? 
                    
                        <TrendingMovies data={trending} /> 
                    
                    :   <TrendingMovies data={trendingTv} />}
                </View>
            )}

            {/* Upcoming Movies (Only Show If Movies Are Selected) */}
            {showMovies && upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} />}

            {/* Top Rated Movies (Only Show If Movies Are Selected) */}
            {showMovies && topRated.length > 0 && <MovieList title="Top Rated" data={topRated} />}
        </ScrollView>
    </View>
</PaperProvider>
);
}

// Styles

