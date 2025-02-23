import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { image185, fallBackMoviePoster, fetchMoviesByCategory } from '../api/MovieDB';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';

var {width,height} = Dimensions.get('window');

const CategoryScreen = () => {
  const navigation = useNavigation();
  const {params} = useRoute();
  const {title,category} = params;

  const [movies,setMovies] = useState([]);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false)

  useEffect(() => {
    loadMovies();
  },[]);
  useEffect(() => {
    if(page>1) loadMovies();
  }, [page])
  

  const loadMovies = async () => {
    if(loading) return;
    setloading(true);
    const newMovies =await fetchMoviesByCategory(category,page);
    if (newMovies.length > 0) {  // Only update if new data is received
      setMovies(prevMovies => [...prevMovies, ...newMovies]);
  }
    setloading(false);
  }
  const MAX_PAGES=6;

  const loadMoreMovies = () => {
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
      <Text className="text-white text-2xl font-bold mb-4 ml-5" >{title}</Text>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('Movie',item)}>
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
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            page >= MAX_PAGES ? (
                <Text style={{ color: "white", textAlign: "center", margin: 10 }}>
                    🎉 You've reached the end! No more movies to load.
                </Text>
            ) : loading ? (
                <ActivityIndicator size="large" color="white" />
            ) : null
        }
      />
    </View>
  )
}

export default CategoryScreen