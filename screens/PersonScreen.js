import { View, Text, Dimensions, Platform } from 'react-native'
import React, {useState,useEffect} from 'react'
import { ScrollView } from 'react-native';
import { TouchableOpacity,Image } from 'react-native';
import { ChevronDoubleLeftIcon } from 'react-native-heroicons/mini';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../themes/_index';
import { useNavigation } from '@react-navigation/native';
import MovieList from "../components/movieList";
import {TvList} from "../components/movieList";
import Loading from "../components/loading";
import { useRoute } from '@react-navigation/native';
import {fallBackPersonImage, fetchPersonDetails, fetchPersonMovies, fetchPersonTv, image342} from '../api/MovieDB';


var {width,height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : 'my-3'

const PersonScreen = () => {
    const {params:item}=useRoute();
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);
    const [personTv, setPersonTv] = useState([]);
    const [person, setPerson] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true);
      getPersondetails(item.id);
      getPersonMovies(item.id);
      getPersonTv(item.id);

    
    }, [item]);

    const getPersondetails = async id => {
        const data = await fetchPersonDetails(id);
        if(data) setPerson(data);
        setLoading(false);
    }
    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id);
        if (data && data.cast) setPersonMovies(data.cast);
    }
    const getPersonTv = async id => {
        const data = await fetchPersonTv(id);
        if (data && data.cast) setPersonTv(data.cast);
    }
    

  return (
    <ScrollView 
    
    className="flex-1 bg-neutral-900 "
    
    >
       <SafeAreaView className={" z-20 w-full flex-row justify-between items-center px-4 " + verticalMargin}>
          <TouchableOpacity onPress={(id) => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
            <ChevronDoubleLeftIcon size="28" strokeWidth={2.5} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon size={"35"} color={isFavourite? "red" : "white"}/>
          </TouchableOpacity>
        </SafeAreaView>
        {/*person details*/}
        {
            loading?(
                <Loading/>
            ):(
                <View>
                    <View className="flex-row justify-center"
                          style={{
                              shadowColor:'gray',
                              shadowOffset:{width:0,height:5},
                              shadowRadius:40,
                              shadowOpacity:1,
                              elevation:10
                          }}
                    >
                        <View   className="items-center verflow-hidden h-72 w-72 border-neutral-700">
                            <Image
                                source={{uri: image342(person?.profile_path || fallBackPersonImage)}}
                                style={{height:height*0.34,width:width*0.65, borderRadius:20 ,borderWidth:5,borderColor:'#404040', marginBottom:2}}
                            />
                        </View>
                    </View>
                    <View className={"mt-6"}>
                        <Text className={"text-3xl text-white font-bold text-center"}>
                           {person?.name}
                        </Text>
                        <Text className={"text-base text-neutral-500 text-center"}>
                            {person?.place_of_birth}
                        </Text>
                    </View>
                    <View className={"mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full"}>
                        <View className={"border-r-2 border-r-neutral-400 px-2 items-center"}>
                            <Text style={{fontSize:13}} className={"text-white font-semibold"}>Gender :</Text>
                            <Text style={{fontSize:11}} className={"text-neutral-400 text-sm"}>{person?.gender==1?'Female':'Male'}</Text>
                        </View>
                        <View className={"border-r-2 border-r-neutral-400 px-2 items-center"}>
                            <Text style={{fontSize:13}} className={"text-white font-semibold"}>Birthday :</Text>
                            <Text style={{fontSize:11}} className={"text-neutral-400 text-sm"}>{person?.birthday}</Text>
                        </View>
                        <View className={"border-r-2 border-r-neutral-400 px-2 items-center"}>
                            <Text style={{fontSize:13}} className={"text-white font-semibold"}>Known for :</Text>
                            <Text style={{fontSize:11}} className={"text-neutral-400 text-sm"}>{person?.known_for_department}</Text>
                        </View>
                        <View className={" px-2 items-center"}>
                            <Text style={{fontSize:13}} className={"text-white font-semibold"}>Popularity :</Text>
                            <Text style={{fontSize:11}} className={"text-neutral-400 text-sm"}>{person?.popularity?.toFixed(2)} %</Text>
                        </View>
                    </View>
                    <View className={"my-6 mx-4 space-y-2"}>
                        <Text className={"text-white text-lg"}>
                            Biography
                        </Text>
                        <Text ClassName={"tracking-wide"} style={{color:"gray"}}>
                           {person?.biography || "N/A"}
                        </Text>
                    </View>
                    {/*movie list*/}
                    <MovieList title={`Movies : ${person?.name}`} hideSeeAll={true} data={personMovies}/>
                    <TvList name={`Tv Series: ${person?.name}`} hideSeeAll={true} data={personTv}/>
                </View>
            )
        }

    </ScrollView>
  )
}

export default PersonScreen