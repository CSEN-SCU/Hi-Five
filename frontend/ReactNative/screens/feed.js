// feed.js
// splash page/login page

import { Alert, ImageBackground, Pressable, StyleSheet, Text, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import PostItem from './postItem';


const LoginScreen = () => {

    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }

    return (<View style={styles.container}>
        <View style={styles.feed_container}>
            <PostItem />
        </View>
    </View>)
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#202020',
        alignItems: 'center'
    },
    feed_container: {
        marginTop: 100
    }


});
