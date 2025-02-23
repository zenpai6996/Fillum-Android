import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import MovieScreen from '../screens/movieScreen';
import PersonScreen from '../screens/PersonScreen';
import AboutScreen from '../screens/About';
import SavedMovies from '../screens/SavedMovies';
import TvScreen from "../screens/TvScreen";
import CategoryScreen from "../screens/CategoryScreen"
import CategoryScreenTv from '../screens/CategoryScreenTv';
import { Ionicons } from 'react-native-vector-icons';
import { enableScreens } from 'react-native-screens';

enableScreens();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator for Home and its related screens
function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_left',
            }}
        >
            <Stack.Screen name="HomeMain" component={HomeScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Movie" component={MovieScreen} />
            <Stack.Screen name="Tv" component={TvScreen} />
            <Stack.Screen name="Person" component={PersonScreen} />
            <Stack.Screen name="Category" component={CategoryScreen} />
            <Stack.Screen name="CategoryTv" component={CategoryScreenTv} />
        </Stack.Navigator>
    );
}


// Bottom Tabs with HomeStack and AboutScreen
export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                screenOptions={
                    
                    ({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = 'home';
                        }else if (route.name === 'Saved') {
                            iconName = 'bookmark';
                        }
                         else if (route.name === 'About') {
                            iconName = 'information-circle';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#AB88FF',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                    tabBarStyle: { backgroundColor: '#171717', paddingBottom: 0},
                    animationEnabled: true,
                    tabBarHideOnKeyboard: true,
                })}
            >
                <Tab.Screen name="Home" component={HomeStack} />
                <Tab.Screen name="Saved" component={SavedMovies} />
                <Tab.Screen name="About" component={AboutScreen} />
                

            </Tab.Navigator>
        </NavigationContainer>
    );
}
