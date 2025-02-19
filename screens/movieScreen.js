import { View, Text ,ScrollView, TouchableOpacity, Platform } from 'react-native'
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
import MovieList from '../components/movieList';
import Loading from "../components/loading";
import {fallBackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500} from "../api/MovieDB";


  var {width,height} = Dimensions.get('window');
  const ios = Platform.OS == 'ios';
  const topMargin = ios ? '' : 'mt-3';

export default function MovieScreen(){

  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const {params: item} = useRoute();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  },[item]);

  const getMovieDetails = async id => {
    const data = await fetchMovieDetails(id);
    if(data) setMovie(data);
    setLoading(false);
  }
  const getMovieCredits = async id =>{
    const data = await fetchMovieCredits(id);
    if(data && data.cast) setCast(data.cast);
  }
  const getSimilarMovies = async id => {
    const data = await fetchSimilarMovies(id);
    if(data && data.results) setSimilarMovies(data.results);

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
                    source={{uri:image500(movie.poster_path)||fallBackMoviePoster}}
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
          <Text className="text-white text-center text-3xl font-bold tracking-wider mb-3"> 
            {
              movie.title  || "Error"
            }
          </Text>
          {
            movie?.id?(
                <Text className="text-neutral-400 font-semibold text-base text-center mb-2 ">
                  {movie.status}  •  {movie.release_date.split('-')[0]}  •  {movie.runtime} min
                </Text>
            ) : null
          }


          {/* genres */}
          <View className="flex-row space-x-4 justify-center mb-3 text-center mt-5">
            {
              movie?.genres?.map((genre,index) =>{
                let showDot = index+1 != movie.genres.length;
                return (
              <Text key={index} className="text-neutral-400 mx-2 font-semibold text-base ">
                {genre?.name}   {showDot?"•":null}
              </Text>
              )
            })}
          </View>
            
        </View>
      <View>
        <Text className="text-neutral-400 mx-4 tracking-wider ">
          {movie?.overview}
        </Text>
      </View>
      {/* cast */}
            {cast.length>0 && <Cast navigation={navigation} cast={cast}/>}
      {/* similar movies */}
      {similarMovies.length>0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies}/>}
    </ScrollView>
  )
}