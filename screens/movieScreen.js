import { View, Text ,ScrollView, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDoubleLeftIcon} from 'react-native-heroicons/mini';
import { styles } from '../themes/_index';
import { Dimensions } from 'react-native';
import { HeartIcon} from 'react-native-heroicons/solid';
import { useState } from 'react';
import { theme } from '../themes/_index';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';

  var {width,height} = Dimensions.get('window');
  const ios = Platform.OS == 'ios';
  const topMargin = ios ? '' : 'mt-3';

export default function MovieScreen(){

  let movieName='Thunderbolts*';
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const {params: item} = useRoute();
  const [cast, setcast] = useState([1,2,3,4,5]);
  useEffect(() => {

  },[item])
  return (
    <ScrollView 
    className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.background} className="rounded-xl p-1">
            <ChevronDoubleLeftIcon size="28" strokeWidth={2.5} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon size={"35"} color={isFavourite? theme.background : "white"}/>
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
          source={require('../assets/imagesy.png')}
          style={{width,height:height*0.6}}
          />
          <LinearGradient 
          colors={['transparent', 'rgba(23,23,23,0.7)','rgba(23,23,23,1)']}
          style={{width,height:height*0.45}}
          start={{x:0.5,y:0}}
          end={{x:0.5,y:1}}
          className="absolute bottom-0"
          />
          </View>
        </View>
        <View style={{marginTop: -(height*0.05)}} className="space-y-4">
          {/* movie details */}
          <Text className="text-white text-center text-3xl font-bold tracking-wider mb-3"> 
            {
              movieName
            }
          </Text>
          {/* status release date runtime */}
          <Text className="text-neutral-400 font-semibold text-base text-center mb-2">
            Released • 2025 • 170 min
          </Text>
          {/* genres */}
          <View className="flex-row space-x-4 justify-center mb-2">
            <Text className="text-neutral-400 mx-2 font-semibold text-base text-center">
              Action •
            </Text>
            <Text className="text-neutral-400  mx-2 font-semibold text-base text-center">
              Thrill • 
            </Text>
            <Text className="text-neutral-400  mx-2 font-semibold text-base text-center">
               Comedy 
            </Text>
          </View>
            
        </View>
      <View>
        <Text className="text-neutral-400 mx-4 tracking-wider "> 
        A group of antiheroes are caught in a deadly trap by Valentina Allegra de Fontaine and are forced into a dangerous mission that could bring them redemption if they unite as a team.
        </Text>
      </View>
      {/* cast */}
            <Cast cast={cast}/>
    </ScrollView>
  )
}