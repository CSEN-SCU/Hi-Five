// home.js
// scroll feed & home page

import { Alert, ImageBackground, Pressable, StyleSheet, Text, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';

const Home = () => {

    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }

    // CHANGE LATER; NEEDS TO DYNAMICALLY CHANGE
    const posts = [
        { id: 1, title: 'Post 1', description: 'Description of Post 1' },
        { id: 2, title: 'Post 2', description: 'Description of Post 2' },
        { id: 3, title: 'Post 3', description: 'Description of Post 3' },
    ]

    return (
        <View styles={styles.container}>
            
            <Card style={styles.music_card}>

            </Card>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000',
    },
    music_card: {

    }
});