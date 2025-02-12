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

  var {width,height} = Dimensions.get('window');
  const ios = Platform.OS == 'ios';
  const topMargin = ios ? '' : 'mt-3';

export default function MovieScreen(){

  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const {params: item} = useRoute();
  useEffect(() => {

  },[item])
  return (
    <ScrollView contentContainerStyle={{paddingBottom:20,backgroundColor:'#262626'}}
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
          source={require('../assets/images (1).png')}
          style={{width,height:height*0.55}}
          />
          
        </View>
      </View>
    </ScrollView>
  )
}