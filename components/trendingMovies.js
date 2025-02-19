import {View, Text, TouchableWithoutFeedback, Dimensions, ScrollView} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated , {interpolate,useAnimatedStyle} from 'react-native-reanimated';
import {fallBackMoviePoster, image500} from "../api/MovieDB";
import {LinearGradient} from "expo-linear-gradient";



var {width,height} = Dimensions.get('window');

export default function TrendingMovies({ data}) {
    
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie',item);
    }


    return (
                
            <View className="mb-8 ">
                <Carousel
                    autoPlay
                    autoPlayInterval={3000}
                    data={data}
                    renderItem={({ item , animationValue}) => <MovieCard item={item} handleClick={handleClick} animationValue={animationValue}/>}
                    height={height*0.7}
                    width={width}
                    mode="parallax"
                    style={{ alignItems: 'center' ,justifyContent:'center', alignSelf:'center'}}
                    modeConfig={{
                        parallaxScrollingScale: 1, // Controls zoom effect
                        parallaxScrollingOffset: 80, // Adjust offset for centering
                        parallaxAdjacentItemScale: 1, // Scale for non-active items
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
            [1,1,1]
        );
        return {
            opacity,
        };
    });
    const titleAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            animationValue.value,
            [-1, -0.5, 0, 0.5, 1], // Input range (left, near-left, center, near-right, right)
            [0, 0, 1, 0, 0] // Output opacity values (only show title when centered)
        );

        return {
            opacity,
        };
    });
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View>
             <Animated.View
        style={[
          {
            width: width, // Adjust width as needed
            height: height * 0.65, // Adjust height as needed
            overflow: 'hidden',
            alignSelf:'center'
          },
          animatedStyle, // Apply animated opacity
        ]}
      >
            <Image
            source={{uri: image500(item.poster_path) || fallBackMoviePoster}}
            style={[{
                width:width,
                height:height*0.65,
                alignSelf:'center',


            },
            animatedStyle,
        ]}
            />
                 <LinearGradient
                     colors={['transparent', 'rgba(23,23,23,0.7)','rgba(23,23,23,1)']}
                     style={{width,height:height*0.45}}
                     start={{x:0.5,y:0.2}}
                     end={{x:0.5,y:1}}
                     className="absolute bottom-0"
                 />

            </Animated.View>
                {/* Title with animated opacity */}
                <Animated.Text
                    style={[
                        {
                            height: height ,
                            width: width ,
                            color: '#BAC2C6',
                            textAlign: 'center',
                            fontSize: 20,
                            fontWeight: 'bold',
                        },
                        titleAnimatedStyle, // Apply animated opacity to the title
                    ]}
                >

                    {item.title}

                </Animated.Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

