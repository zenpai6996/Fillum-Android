import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/movieScreen';
import PersonScreen from '../screens/PersonScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation(){
  return(
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_left',
        
      }}
      >
        <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen}/>
        <Stack.Screen name="Movie" options={{headerShown:false}} component={MovieScreen}/>
        <Stack.Screen name="Person" options={{headerShown:false}} component={PersonScreen}/>
      </Stack.Navigator>
    </NavigationContainer>

  )
}

