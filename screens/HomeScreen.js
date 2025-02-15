import '../global.css';
import React, {useEffect, useState} from 'react'
import {View, Text, Platform, TouchableOpacity, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import {Bars3CenterLeftIcon,  MagnifyingGlassIcon} from "react-native-heroicons/mini";
import {styles} from '../themes/_index';
import TrendingMovies from "../components/trendingMovies";
import MovieList from '../components/movieList';
import {useNavigation} from "@react-navigation/native";
import Loading from "../components/loading";
import {fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies} from "../api/MovieDB";


const ios = Platform.OS =='ios';
export default function HomeScreen() {

    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if(data && data.results) setTrending(data.results);
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
    <View className="flex-1 bg-neutral-800">
        {/* search bar and logo */}
        <SafeAreaView className={ios? "-mb-2" : "mb-3 mt-5"}>
            <StatusBar style="light"/>
            <View className="flex-row justify-between items-center mx-4">
                <Bars3CenterLeftIcon size="30" strokeWidth={2} color="#AB8BFF"/>
                <Text className=" text-4xl font-bold" style={styles.text}>
                    Fillum
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <MagnifyingGlassIcon size="30" strokeWidth={2} color="#AB8BFF" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        {
            loading ? (
                <Loading/>
            ):(
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 10,backgroundColor:'#262626'}}
                >
                    {loading?(
                            <Text className=" text-4xl font-bold" style={styles.text}>
                                Try using a VPN (●'◡'●)
                            </Text>
                        )
                        :(
                         <TrendingMovies data={trending}/>
                    )
                    }

                    {/* upcoming movies */}
                    {upcoming.length>0 && <MovieList title="Upcoming" data={upcoming}/>}

                    {/* top rated movies row         */}
                    {topRated.length>0 && <MovieList title="Top Rated" data={topRated}/>}

                </ScrollView>
            )
        }
    </View>
  )
}
