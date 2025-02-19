import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/movieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from "../screens/SearchScreen";
import TvScreen from "../screens/TV-series/TVScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreenTV from '../screens/TV-series/HomeScreenTV';
import {Screen} from "react-native-screens";
import TV from "../screens/TV-series/HomeScreenTV";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_left',
            }}
        >
            <Stack.Screen name="HomeMain" component={HomeScreen} />
            <Stack.Screen name="Movie" component={MovieScreen} />
            {/*<Stack.Screen name="Tv" component={TvScreen} />*/}
            <Stack.Screen name="Person" component={PersonScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />

        </Stack.Navigator>
    );
}

// Main App Navigation with Drawer
export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                headerShown: false,
                animation: 'slide_from_left',
            }}>
                <Drawer.Screen name="Home" component={HomeStack} />
                {/*<Drawer.Screen name="Tv" component={TV} />*/}


            </Drawer.Navigator>
        </NavigationContainer>
    );
}

