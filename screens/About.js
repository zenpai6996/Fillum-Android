import React from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';

export default function AboutScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#171717' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 20 }}>
                Connect with me:
            </Text>

            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/zenpai6996')} style={styles.button}>
                <Text style={styles.buttonText}>GitHub</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/souharda-roy-barman-02a835343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app')} style={styles.button}>
                <Text style={styles.buttonText}>LinkedIn</Text>
            </TouchableOpacity>
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
