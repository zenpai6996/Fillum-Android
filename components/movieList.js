import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { styles } from '../themes/_index'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {image185, image500} from "../api/moviedb";

var {width,height} = Dimensions.get('window');

export default function MovieList ({title , data ,hideSeeAll}) {

  const navigation = useNavigation();



  return (
    <View className="mb-8 space-y-4" style={{marginTop:8}}>
      <View className="mx-4 flex-row justify-between items-center">
        <Text className=" text-xl" style={{fontSize:20,color:'#fff'}}>
          {title}
        </Text>
        {!hideSeeAll && (
          <TouchableOpacity>
          <Text style={styles.text} className="text-lg">See All</Text>
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
                <Image source={{uri: image185(item.poster_path)}}
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

