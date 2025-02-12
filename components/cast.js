import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {styles} from '../themes/_index';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';

const Cast = ({cast , navigation}) => {
  let personName = "Keanu Reeves";
  let charectorName = "John Wick";
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
                marginRight:10,
                marginTop:20
              }}
              onPress={() => navigation.navigate('Person',person)}
            >
              <View className="overflow-hidden rounded-full h-20 w-20 items-center border-neutral-400">
              <Image
                style={{
                borderRadius:75,
                height:120,
                width:120,
                marginRight:12,
                borderWidth:3,
                borderColor:"#6A6F72"
              }}
               className="rounded-2xl h-24 w-20"
                source={require('../assets/Keanu.png')}
              />
              </View>
              <Text className="text-white text-xs mt-3">
                {
                  charectorName.length>10 ? charectorName.slice(0,10)+"..." : charectorName
                }
              </Text>
              <Text className="text-neutral-400 text-xs mt-3">
                {
                  personName.length>10 ? personName.slice(0,10)+"..." : personName
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