import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated , {interpolate,useAnimatedStyle} from 'react-native-reanimated';



var {width,height} = Dimensions.get('window');

export default function TrendingMovies({ data }) {
    
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie',item);
    }


    return (
        <View className="mb-8 mt-5 ">
            <Text style={{fontSize:20,
              marginLeft:15  
            }}className="text-white  mx-4 mb-0">Trending</Text>
            

            <Carousel
                autoPlay
                autoPlayInterval={7000}
                data={data}
                renderItem={({ item , animationValue}) => <MovieCard item={item} handleClick={handleClick} animationValue={animationValue}/>}
                height={height*0.5}
                width={width}
                mode="parallax"
                style={{ alignItems: 'center' ,justifyContent:'center', alignSelf:'center'}}
                modeConfig={{
                    parallaxScrollingScale: 0.9, // Controls zoom effect
                    parallaxScrollingOffset: 120, // Adjust offset for centering
                    parallaxAdjacentItemScale: 0.8, // Scale for non-active items
                }}
                
                
            />
        </View>
    );
}



const MovieCard = ({ item , handleClick , animationValue}) => {
    const animatedStyle = useAnimatedStyle(() =>{
        const opacity = interpolate(
            animationValue.value,
            [-1,0,1],
            [0.5,1,0.5]
        );
        return {
            opacity,
        };
    });
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
             <Animated.View
        style={[
          {
            width: width * 0.7, // Adjust width as needed
            height: height * 0.5, // Adjust height as needed
            borderRadius: 20,
            overflow: 'hidden',
            alignSelf:'center'
          },
          animatedStyle, // Apply animated opacity
        ]}
      >
            <Image
            source={require('../assets/images (1).png')}
            style={[{
                width:width*0.7,
                height:height*0.5,
                borderRadius:20,
                alignSelf:'center',
                overflow:'hidden'
                
            },
            animatedStyle,
        ]}
            />
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

