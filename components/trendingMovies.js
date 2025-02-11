import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';



var {width,height} = Dimensions.get('window');

export default function TrendingMovies({ data }) {
    
    const navigation = useNavigation();
    const handleClick = () => {
        navigation.navigate('Movie',item);
    }


    return (
        <View className="mb-8 mt-5 ">
            <Text style={{fontSize:20,
              marginLeft:15  
            }}className="text-white t mx-4 mb-0">Trending</Text>
            

            <Carousel
                autoPlayInterval={2000}
                data={data}
                renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick}/>}
                height={height*0.6}
                width={width}
                mode="parallax"
                style={{ alignItems: 'center' ,justifyContent:'center', alignSelf:'center'}}
                pagingEnabled={true}
                snapEnabled={true}
                modeConfig={{
                    parallaxScrollingScale: 0.9, // Controls zoom effect
                    parallaxScrollingOffset: 100, // Adjust offset for centering
                    parallaxAdjacentItemScale: 0.8, // Scale for non-active items
                }}
                
                
            />
        </View>
    );
}



const MovieCard = ({ item , handleClick}) => {
    return (
        <TouchableWithoutFeedback onPress={handleClick}>
            <Image
            source={require('../assets/images/movie-poster.png')}
            style={{
                width:width*0.8,
                height:height*0.6,
                borderRadius:20,
                alignSelf:'center'
            }}
           
            />
        </TouchableWithoutFeedback>
    );
};

