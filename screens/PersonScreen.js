import { View, Text, Dimensions, Platform } from 'react-native'
import React, {useState} from 'react'
import { ScrollView } from 'react-native';
import { TouchableOpacity,Image } from 'react-native';
import { ChevronDoubleLeftIcon } from 'react-native-heroicons/mini';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../themes/_index';
import { useNavigation } from '@react-navigation/native';
import MovieList from "../components/movieList";
import Loading from "../components/loading";


var {width,height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : 'my-3'

const PersonScreen = () => {
  const navigation = useNavigation();
   const [isFavourite, toggleFavourite] = useState(false);
    const [personMovies, setPersonMovies] = useState([1,2,3,4,5])
    const [loading, setLoading] = useState(false);
  return (
    <ScrollView 
    
    className="flex-1 bg-neutral-900 "
    
    >
       <SafeAreaView className={" z-20 w-full flex-row justify-between items-center px-4 " + verticalMargin}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.background} className="rounded-xl p-1">
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
                        <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-700">
                            <Image
                                source={require('../assets/Keanu.png')}
                                style={{height:height*0.43,width:width*0.74}}
                            />
                        </View>
                    </View>
                    <View className={"mt-6"}>
                        <Text className={"text-3xl text-white font-bold text-center"}>
                            Keanu Reeves
                        </Text>
                        <Text className={"text-base text-neutral-500 text-center"}>
                            London , United Kingdom
                        </Text>
                    </View>
                    <View className={"mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full"}>
                        <View className={"border-r-2 border-r-neutral-400 px-2 items-center"}>
                            <Text style={{fontSize:13}} className={"text-white font-semibold"}>Gender :</Text>
                            <Text style={{fontSize:11}} className={"text-neutral-400 text-sm"}> Male</Text>
                        </View>
                        <View className={"border-r-2 border-r-neutral-400 px-2 items-center"}>
                            <Text style={{fontSize:13}} className={"text-white font-semibold"}>Birthday :</Text>
                            <Text style={{fontSize:11}} className={"text-neutral-400 text-sm"}>1964-09-02</Text>
                        </View>
                        <View className={"border-r-2 border-r-neutral-400 px-2 items-center"}>
                            <Text style={{fontSize:13}} className={"text-white font-semibold"}>Known for :</Text>
                            <Text style={{fontSize:11}} className={"text-neutral-400 text-sm"}> Actor</Text>
                        </View>
                        <View className={" px-2 items-center"}>
                            <Text style={{fontSize:13}} className={"text-white font-semibold"}>Popularity :</Text>
                            <Text style={{fontSize:11}} className={"text-neutral-400 text-sm"}> Male</Text>
                        </View>
                    </View>
                    <View className={"my-6 mx-4 space-y-2"}>
                        <Text className={"text-white text-lg"}>
                            Biography
                        </Text>
                        <Text ClassName={"tracking-wide"} style={{color:"gray"}}>
                            Keanu Charles Reeves is a Canadian actor and musician. He is the recipient of numerous accolades in a career on screen spanning four decades. In 2020, The New York Times ranked him as the fourth-greatest actor of the 21st century, and in 2022 Time magazine named him one of the 100 most influential people in the world.
                        </Text>
                    </View>
                    {/*movie list*/}
                    <MovieList title={'Movies'} hideSeeAll={true} data={personMovies}/>
                </View>
            )
        }

    </ScrollView>
  )
}

export default PersonScreen