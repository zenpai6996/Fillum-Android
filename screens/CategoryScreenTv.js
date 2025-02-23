import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { image185, fallBackMoviePoster, fetchTvByCategory } from '../api/MovieDB';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';

var {width,height} = Dimensions.get('window');

const CategoryScreenTv = () => {
  const navigation = useNavigation();
    const {params} = useRoute();
    const {name,category} = params;
  
    const [tv,setTv] = useState([]);
    const [page, setpage] = useState(1);
    const [loading, setloading] = useState(false)
  
    useEffect(() => {
      loadTV();
    },[]);
    useEffect(() => {
      if(page>1) loadTV();
    }, [page])
    
  
    const loadTV = async () => {
      if(loading) return;
      setloading(true);
      const newTv =await fetchTvByCategory(category,page);
      if (newTv.length > 0) {  
        setTv(prevTv => [...prevTv, ...newTv]);
    }
      setloading(false);
    }
    const MAX_PAGES=6;
  
    const loadMoreTv = () => {
     if (!loading && page < MAX_PAGES) {
          setpage(prevPage => prevPage + 1);
      } else if (page >= MAX_PAGES) {
          console.log("You've reached the end of the page （￣︶￣）↗");
      }
    };
  
    return (
      <View className="flex-1 bg-neutral-900 " style={{paddingTop:50}}>
       <TouchableOpacity
                                 style={{
                                     position: 'absolute',
                                     top: 45,
                                     right: 20,
                                     zIndex: 10,
                                   }}
                                onPress={() => navigation.goBack('Home')}
                                className={"rounded-full  m-1 "}>
                               <Image  source={require('../assets/x-button.png')} style={{width:40,height:40}}/>
                            </TouchableOpacity>
        <Text className="text-white text-2xl font-bold mb-4 ml-5" >{name}</Text>
  
        <FlatList
          data={tv}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('Tv',item)}>
                <Image source={{uri: image185(item.poster_path) || fallBackMoviePoster}}
                                style={{
                                  width: width*0.30,
                                  height: height*0.19,
                                  borderRadius:20,
                                  marginTop:15,
                                  marginLeft:10
                                }}
                                />
            </TouchableOpacity>
            )}
            onEndReached={loadMoreTv}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              page >= MAX_PAGES ? (
                  <Text style={{ color: "white", textAlign: "center", margin: 10 }}>
                      🎉 You've reached the end! No more Tv to load.
                  </Text>
              ) : loading ? (
                  <ActivityIndicator size="large" color="white" />
              ) : null
          }
        />
      </View>
    )
}

export default CategoryScreenTv