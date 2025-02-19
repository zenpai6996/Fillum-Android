import React from 'react';
import { View, Text, Linking, TouchableOpacity,Image } from 'react-native';

export default function AboutScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#171717' }}>
          <Image style={{
                              height:100,
                              width:100,
                              marginBottom:15,
                              borderRadius:20
                          }} source={require('../assets/logo3.png')}/>
                          <Text className={"text-5xl text-center"} style={{marginBottom:10,color:"#AB88FF"}}>Fillum</Text>
            <View className={" bg-neutral-700 items-center pt-3"} style={{borderRadius:10}}>
            <Text  className={"text-center"} style={{width:350, fontSize: 15, fontWeight: 'semibold', color: 'white', marginBottom: 20 }}>
            Fillum is designed to be a movie companion and recommendation app for my fellow Cinephiles 🎥 and provide users with a rich collection of short films and musical stories from around the globe.      
            </Text>
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 20 , marginTop:10}}>
                Connect with me:
            </Text>

            <View className={"flex-row"}>
            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/zenpai6996')} style={{marginRight:20, }} >
            <Image source={require('../assets/github.png')} style={{ borderWidth:3 , borderColor:"grey", borderRadius:10}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/souharda-roy-barman-02a835343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app')} >
            <Image style={{width:98,height:98,borderWidth:3 , borderColor:"grey", borderRadius:10}} source={require('../assets/linked.png')}/>
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = {
    button: {
        backgroundColor: '#0077b6',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        width: 200,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
};
