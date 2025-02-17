import '../global.css';
import React, {useEffect, useState} from 'react'
import {View, Text, Platform, TouchableOpacity, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import {Bars3CenterLeftIcon, ChevronDoubleLeftIcon, MagnifyingGlassIcon} from "react-native-heroicons/mini";
import {styles} from '../themes/_index';
import TrendingMovies from "../components/trendingMovies";
import MovieList from '../components/movieList';
import {useNavigation} from "@react-navigation/native";
import Loading from "../components/loading";
import {fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies} from "../api/MovieDB";
import {Image} from "react-native";

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
    <View className="flex-1 bg-neutral-900">
        {/* search bar and logo */}
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " } style={{position:'absolute'}}>
            <StatusBar style="light"/>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} className="rounded-xl p-1 ">
            <Image style={{
                height:38,
                width:38,
            }} source={require('../assets/movie_11524268.png')}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <MagnifyingGlassIcon size="30" strokeWidth={2} color="#AB8BFF" />
            </TouchableOpacity>

        </SafeAreaView>
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 10,backgroundColor:'#171717'}}
        >
        {
            loading ? (
                <Loading/>
            ):(
                <View>
                    <TrendingMovies data={trending}/>
                </View>
            )
        }



            {/* upcoming movies */}
            {upcoming.length>0 && <MovieList title="Upcoming" data={upcoming}/>}

            {/* top rated movies row         */}
            {topRated.length>0 && <MovieList title="Top Rated" data={topRated}/>}

        </ScrollView>
    </View>
  )
}
