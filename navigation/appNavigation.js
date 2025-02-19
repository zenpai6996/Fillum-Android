import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import MovieScreen from '../screens/movieScreen';
import PersonScreen from '../screens/PersonScreen';
import AboutScreen from '../screens/About';
import { Ionicons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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
            <Stack.Screen name="Person" component={PersonScreen} />
        </Stack.Navigator>
    );
}
function SavedDrawer() {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false ,animation:'slide_from_bottom'}} >
            <Drawer.Screen name="SavedScreen" component={AboutScreen} />
            <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
    );
}

// Bottom Tabs with HomeStack and AboutScreen
export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Movie') {
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
                })}
            >
                <Tab.Screen name="Movie" component={HomeStack} />
                <Tab.Screen name="About" component={AboutScreen} />
                <Tab.Screen name="Saved" component={SavedDrawer} />

            </Tab.Navigator>
        </NavigationContainer>
    );
}
