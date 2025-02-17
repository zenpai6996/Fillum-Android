import {View, Text, TouchableOpacity, Dimensions} from 'react-native'
import React from 'react'
import {styles} from '../themes/_index';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import {fallBackPersonImage, image185} from "../api/MovieDB";

var {width,height} = Dimensions.get('window');

const Cast = ({cast , navigation}) => {
  return (
    <View className="my-8 mt-5">
      <Text className={" mx-4 mb-4 "} style={{
        color:"#fff",
        fontSize:21
      }} >Top Cast</Text>
      <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:15}}
      >
        {
         cast && cast.map((person,index) =>{
          return(
            <TouchableOpacity
            key={index}
              className=" items-center"
              style={{
                marginRight:10
              }}
              onPress={() => navigation.navigate('Person',person)}
            >
              <View  className="overflow-hidden  h-20 w-20 items-center border-neutral-400">
              <Image
                style={{
                width: width*0.33,
                height: height*0.22,
                borderRadius:20,
                marginRight:4,
                borderWidth:2,
                borderColor:"#6A6F72"
              }}
               className="rounded-2xl h-20 w-20"
                source={{uri: image185(person?.profile_path) || fallBackPersonImage}}
              />
              </View>
              <Text className="text-white text-xs mt-3">
                {
                  person?.character.length>10 ? person?.character.slice(0,10)+'...':person?.character
                }
              </Text>
              <Text className="text-neutral-400 text-xs mt-3 " style={{marginBottom:5}}>
                {
                  person?.original_name.length>14?person?.original_name.slice(0,10)+'...':person?.original_name
                }
              </Text>
            </TouchableOpacity>
          )
         })
        }
      </ScrollView>
    </View>
  )
}

export default Cast;