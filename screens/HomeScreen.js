import '../global.css';
import React from 'react'
import {View, Text, Platform, TouchableOpacity, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import {Bars3CenterLeftIcon,  MagnifyingGlassIcon} from "react-native-heroicons/mini";
import {styles} from '../themes/_index';
import TrendingMovies from "../components/trendingMovies";
import {useState} from 'react';
import MovieList from '../components/movieList';

const ios = Platform.OS =='ios';
export default function HomeScreen() {

    const [trending, settrending] = useState([1,2,3]);
    const [upcoming, setUpcoming] = useState([1,2,3]);
    const [topRated, setTopRated] = useState([1,2,3]);

  return(
    <View className="flex-1 bg-neutral-800">
        {/* search bar and logo */}
        <SafeAreaView className={ios? "-mb-2" : "mb-3 mt-5"}>
            <StatusBar style="light"/>
            <View className="flex-row justify-between items-center mx-4">
                <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white"/>
                <Text className="text-white text-4xl font-bold">
                    <Text style={styles.text}>F</Text>illum
                </Text>
                <TouchableOpacity>
                    <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 10}}
            >
                {/*Trending Movies carousel*/}
            <TrendingMovies data={trending}/>

                {/* upcoming movies */}
            <MovieList title="Upcoming" data={upcoming} />
            
                {/* top rated movies row         */}
            <MovieList title="Top Rated" data={topRated} />
                
        </ScrollView>
    </View>
  )
}
