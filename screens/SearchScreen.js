import {
    View,
    Text,
    Dimensions,
    TextInput,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Image
} from 'react-native'
import React, {useCallback, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {XMarkIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";
import Loading from "../components/loading";
import {debounce} from 'lodash';
import { fallBackMoviePoster, image185 } from '../api/MovieDB';
import { fetchSearchMovies , fetchSearchTv} from '../api/MovieDB';



const {width,height} = Dimensions.get('window');

export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleSearch = value => {
        if(value && value.length >2){
            setLoading(true);
            fetchSearchMovies({
                query:value,
                include_adult:'false',
                language:'en-US',
                page:'1'
            }).then(data=>{
                if(data && data.results && data.results >0){
                    setLoading(false);
                    setResults(data.results);
                }else{
                    fetchSearchTv({
                                query:value,
                                include_adult:'false',
                                language:'en-US',
                                page:'1'
                            }).then(data=>{
                                setLoading(false);
                                if(data && data.results) setResults(data.results);
                            });
                        }
                    });
                } else {
                    setLoading(false);
                    setResults([]);
                }
            }
    const handleTextDebounce= useCallback(debounce(handleSearch,400),[]);
    return(
        <SafeAreaView className={"bg-neutral-800 flex-1"}>
            <View className={"mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full"}>
                <TextInput
                onChangeText={handleTextDebounce}
                placeholder="Search for Movies"
                placeholderTextColor={'#AB8BFF'}
                className={" pl-6 flex-1 text-base font-semibold text-white tracking-wider"}
                />
                <TouchableOpacity
                    onPress={() => navigation.goBack('Home')}
                    className={"rounded-full  m-1 "}>
                   <Image  source={require('../assets/x-button.png')} style={{width:50,height:50}}/>
                </TouchableOpacity>
            </View>
            {/*results*/}
            {
                loading?(
                    <Loading/>
                ):(

                        results.length>0 ? (
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{paddingHorizontal:15}}
                                className="space-y=3"
                            >
                                <Text className="text-white font-bold ml-1 text-lg">Result ({results.length})</Text>
                                <View className={"flex-row justify-between flex-wrap"}>
                                    {
                                        results.map((item,index) => {
                                            return(
                                                <TouchableWithoutFeedback
                                                    key={index}
                                                    onPress={() => {
                                                        if (item.title) {
                                                            navigation.push("Movie", item); // Navigate to the Movie screen if it has a `title`
                                                        } else if (item.name) {
                                                            navigation.push("Tv", item); // Navigate to the Tv screen if it has a `name`
                                                        }
                                                    }}
                                                >
                                                    <View className={"space-y-2 mb-4 mt-3"}>
                                                        <Image
                                                            className={"rounded-3xl"}
                                                            source={{
                                                                uri: image185(item?.poster_path) || fallBackMoviePoster
                                                            }}
                                                            style={{
                                                                width: width*0.45,
                                                                height: height*0.3,

                                                            }}
                                                        />
                                                        <Text className={"text-neutral-300 ml-1"}>
                                                        {item?.title ? (item.title.length > 18 ? item.title.slice(0, 18) + '...' : item.title) : (item?.name ? (item.name.length > 18 ? item.name.slice(0, 18) + '...' : item.name) : 'Unknown')}


                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                        ):(
                            <View
                                style={{marginTop:height*0.1}}
                                className={"flex-col justify-center items-center"}>
                                <Image
                                    source={require("../assets/noresult-removebg-preview.png")}
                                    className={"h-96 w-96"}

                                />
                                <Text className={"text-white text-5xl font-bold"}>
                                    No Results Found
                                </Text>
                            </View>
                        )

                )
            }


        </SafeAreaView>
    )
}