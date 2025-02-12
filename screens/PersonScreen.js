import { View, Text, Dimensions, Platform } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ChevronDoubleLeftIcon } from 'react-native-heroicons/mini';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../themes/_index';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';


var {width,height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : 'my-3'

const PersonScreen = () => {
  const navigation = useNavigation();
   const [isFavourite, toggleFavourite] = useState(false);
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
    </ScrollView>
  )
}

export default PersonScreen