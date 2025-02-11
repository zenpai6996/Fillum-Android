import { View, Text ,ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDoubleLeftIcon } from 'react-native-heroicons/mini';
import { styles } from '../themes/_index';
import { Dimensions } from 'react-native';

var {width,height} = Dimensions.get('window');

export default function MovieScreen(){

  const {params: item} = useRoute();
  useEffect(() => {

  },[item])
  return (
    <ScrollView contentContainerStyle={{paddingBottom:20}}
    className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView className="absolute
        z-20 w-full flex-row justify-between items-center px-4 ">
          <TouchableOpacity style={styles.background} className="rounded-xl p-1">
            <ChevronDoubleLeftIcon size="28" strokeWidth={2.5} color="white"/>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ScrollView>
  )
}