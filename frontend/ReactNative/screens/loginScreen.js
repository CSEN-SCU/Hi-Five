import React, { useState } from 'react';
import { Alert, ImageBackground, Pressable, StyleSheet, Text, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const LoginScreen = () => {

    return (<View style={styles.container}>
        <ImageBackground
            source={require('../../../frontend/ReactNative/assets/concert.png')}
            style={styles.background}
            imageStyle={{ opacity: 0.5 }}
        >
        </ImageBackground>
        <View style={styles.overlay}>
            <Text style={styles.nameTitle}>Hi-Five</Text>
            <Text style={styles.tagline}>Share the Vibe!</Text>
            <Pressable style={[styles.loginButton, styles.shadowProp]} onPress={() => Alert.alert("You pressed the login button")}>
                <Text style={styles.loginText}>Login with Spotify</Text>
                <Icon name='spotify' size={25} style={styles.iconStyle} />
            </Pressable>
        </View>

        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000',
    },
    loginButton: {
        backgroundColor: "#1ED760",
        borderRadius: 45,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '80%'
    },
    loginText: {
        fontSize: 17,
        color: "#000",
        fontWeight: 'bold',
        marginRight: 10
    },
    iconStyle: {
        color: "black"
    },
    nameTitle: {
        color: '#cfd',
        fontSize: 70,
        textAlign: 'center',
        // fontFamily: 'Poppins_700Bold'
    },
    tagline: {
        color: '#fff',
        fontSize: 17,
        textAlign: 'center',
        marginBottom: 200,
        // fontFamily: 'Poppins_400Regular',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        width: '115%',
        height: '115%',
        marginBottom: 50,
        zIndex: -1
    },
    shadowProp: {
        shadowColor: '#1A1C1F',
        shadowOffset: { width: -2, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    }
});
