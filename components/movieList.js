import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { styles } from '../themes/_index'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import {fallBackMoviePoster, image185, image500} from "../api/MovieDB"

var {width,height} = Dimensions.get('window');

export default function MovieList ({title , data ,hideSeeAll,category}) {

  const navigation = useNavigation();



  return (
    <View className="mb-8 space-y-2 bg-neutral-900" style={{marginTop:8}}>
      <View className="mx-4 flex-row justify-between items-center">
        <Text className=" text-xl" style={{fontSize:20,color:'#fff'}}>
          {title}
        </Text>
        {!hideSeeAll && (
          <TouchableOpacity onPress={() => navigation.navigate('Category',{title,category})}>
          <Text style={styles.text} className="text-lg">View all</Text>
        </TouchableOpacity>
        )}
      </View>
      {/* movie row */}
      <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:0}}
      >
       {
        data.map((item, index) => {
          return(
            <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie',item)}>
              <View className="space-y-1 mr-4">
                <Image source={{uri: image185(item.poster_path) || fallBackMoviePoster}}
                style={{
                  width: width*0.33,
                  height: height*0.22,
                  borderRadius:20,
                  marginTop:15,
                  marginLeft:15
                }}
                />
              <Text style={{color:"#BAC2C6" ,marginBottom:5}} className="ml-1 text-center">
                  {item.title.length>14? item.title.substring(0,14) + '...': item.title}
                </Text>
                </View>
            </TouchableWithoutFeedback>

          )
        })
       } 
      </ScrollView>
    </View>
  )
}

export function TvList ({name , data ,hideSeeAll,category}) {

    const navigation = useNavigation();



    return (
        <View className="mb-8 space-y-2 bg-neutral-900" style={{marginTop:8}}>
            <View className="mx-4 flex-row justify-between items-center">
                <Text className=" text-xl" style={{fontSize:20,color:'#fff'}}>
                    {name}
                </Text>
                {!hideSeeAll && (
                    <TouchableOpacity onPress={() => navigation.navigate('CategoryTv',{name,category})}>
                        <Text style={styles.text} className="text-lg">View all</Text>
                    </TouchableOpacity>
                )}
            </View>
            {/* movie row */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal:0}}
            >
                {
                    data.map((item, index) => {
                        return(
                            <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Tv',item)}>
                                <View className="space-y-1 mr-4">
                                    <Image source={{uri: image185(item.poster_path) || fallBackMoviePoster}}
                                           style={{
                                               width: width*0.33,
                                               height: height*0.22,
                                               borderRadius:20,
                                               marginTop:15,
                                               marginLeft:15
                                           }}
                                    />
                                    <Text style={{color:"#BAC2C6" ,marginBottom:5}} className="ml-1 text-center">
                                        {item.name.length>14? item.name.substring(0,14) + '...': item.name}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>

                        )
                    })
                }
            </ScrollView>
        </View>
    )
}
