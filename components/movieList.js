import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { styles } from '../themes/_index'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';

var {width,height} = Dimensions.get('window');

export default function MovieList ({title , data}) {

  let movieName = 'Spiderman Across the SpiderVerse';
  const navigation = useNavigation();

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl" style={{fontSize:20}}>
          {title}
        </Text>
        <TouchableOpacity>
          <Text style={styles.text} className="text-lg">See All</Text>
        </TouchableOpacity>
      </View>
      {/* movie row */}
      <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:15}}
      >
       {
        data.map((item, index) => {
          return(<>
            <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Movie',item)}>
              <View className="space-y-1 mr-4">
                <Image source={require('../assets/images (1).png')} 
                
                style={{
                  width: width*0.33,
                  height: height*0.22,
                  borderRadius:20,
                  marginTop:15,
                  marginLeft:15
                }}
                />
              <Text className="text-neutral-300 ml-1">
                {movieName.length>14 ? movieName.slice(0,14)+'...':movieName}
                </Text>
                </View>
            </TouchableWithoutFeedback>
            </>
          )
        })
       } 
      </ScrollView>
    </View>
  )
}

