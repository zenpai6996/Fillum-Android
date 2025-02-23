import { View, Text ,ScrollView, TouchableOpacity, Platform , FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDoubleLeftIcon} from 'react-native-heroicons/mini';
import { styles } from '../themes/_index';
import { Dimensions } from 'react-native';
import { HeartIcon} from 'react-native-heroicons/solid';
import { theme } from '../themes/_index';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import {TvList} from "../components/movieList";
import Loading from "../components/loading";
import {
    fallBackMoviePoster,
    fetchTvCredits,
    fetchSimilarTv,
    fetchTvDetails,
    image500
} from "../api/MovieDB";


var {width,height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-3';

export default function TvScreen(){

    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const {params: item} = useRoute();
    const [cast, setCast] = useState([]);
    const [similarTv, setSimilarTv] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tv, setTv] = useState([]);

    useEffect(() => {
        setLoading(true);
        getTvDetails(item.id);
        getTvCredits(item.id);
        getSimilarTv(item.id);
    },[item]);

    const getTvDetails = async id => {
        const data = await fetchTvDetails(id);
        if(data) setTv(data);

        setLoading(false);
    }
    const getTvCredits = async id =>{
        const data = await fetchTvCredits(id);
        if(data && data.cast) setCast(data.cast);
    }
    const getSimilarTv = async id => {
        const data = await fetchSimilarTv(id);
        if(data && data.results) setSimilarTv(data.results);

    }


    return (
        <ScrollView
            className="flex-1 bg-neutral-900"
        >
            {/* back button and movie poster */}
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}>
                    <TouchableOpacity onPress={() => navigation.goBack("Home")} style={styles.background} className="rounded-xl p-1">
                        <ChevronDoubleLeftIcon size="28" strokeWidth={2.5} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size={"35"} color={isFavourite? theme.background : "white"}/>
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading?(
                        <Loading/>
                    ):(
                        <View>
                            <Image
                                source={{uri:image500(tv.poster_path)||fallBackMoviePoster}}
                                style={{
                                    width,
                                    height:height*0.6,
                                }}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(23,23,23,0.7)','rgba(23,23,23,1)']}
                                style={{width,height:height*0.45}}
                                start={{x:0.5,y:0}}
                                end={{x:0.5,y:1}}
                                className="absolute bottom-0"
                            />
                        </View>
                    )
                }

            </View>
            <View style={{marginTop: -(height*0.05)}} className="space-y-4">
                {/* movie details */}
                <Text className="text-white text-center text-3xl font-bold tracking-wider ">
                    {
                        tv.name  || "Error"
                    }
                </Text>
                {
                    tv?.id?(<>
                            <Text className="text-neutral-400 font-semibold text-base text-center mb-2 mt-1">
                                {tv.tagline}
                            </Text>
                        <Text className="text-neutral-400 font-semibold text-base text-center ">
                            {tv.status}  •   {tv.first_air_date.split('-')[0]}
                        </Text></>
                    ) : null
                }


                {/* genres */}
                <View className="flex-row space-x-4 justify-center mb-3 text-center mt-2">
                    {tv?.genres?.slice(0, 2).map((genre, index) => (
                        <Text key={index} className="text-neutral-400 mx-1 font-semibold text-base">
                            {genre.name}
                            {index < 1 ? ' • ' : ''}
                        </Text>
                    ))}
                </View>

            </View>
            <View>
                <Text className="text-neutral-400 mx-4 tracking-wider ">
                    {tv?.overview}
                </Text>
            </View>
            {/* cast */}
            {cast.length>0 && <Cast navigation={navigation} cast={cast}/>}
            {/* similar movies */}
            {similarTv.length>0 && <TvList name="Similar Tv Series" hideSeeAll={true} data={similarTv}/>}
        </ScrollView>
    )
}