import {Alert, ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
    return (<View style={styles.container}>
            <ImageBackground source={require('../../../frontend/ReactNative/assets/concert.png')} resizeMode="cover"
                             imageStyle={{opacity: 0.5}}>
                <View style={styles.login}>
                    <Text style={styles.nameTitle}>Hi-Five</Text>
                    <Text style={styles.tagline}>Share the Vibe!</Text>
                    <Pressable  style={styles.loginButton} onPress={()=>Alert.alert("You pressed the login button")}>
                        <Icon name='spotify' size={20} style={styles.iconStyle}/>
                        <Text style={styles.loginText}>Sign In With Spotify</Text>
                    </Pressable>
                </View>
            </ImageBackground>
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
    iconStyle:{
        justifyContent: "center",
        paddingRight: 10,
        paddingVertical: 2,
    },
    loginButton:{
        backgroundColor:"#1ED760",
        borderRadius: 4,
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 15,
        display: "inline-block",
        marginHorizontal: "20%"
    },
    loginText: {
        fontSize: 20,
        color: "#000",
        textAlign: 'center',
        fontWeight: 'bold',

    },
    nameTitle: {
        color: '#cfd',
        fontSize: 75,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    tagline: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 200,
    },
    login: {
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
    },
});
