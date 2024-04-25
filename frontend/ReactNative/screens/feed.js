// home.js
// scroll feed & home page

import { Alert, ImageBackground, Pressable, StyleSheet, Text, View, Dimensions, Card } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';

const Feed = () => {

    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }

    // CHANGE LATER; NEEDS TO DYNAMICALLY CHANGE
    // const posts = [
    //     { username: 'ougrhe', id: 1, song: 'Post 1', song_cover: '' },
    //     { username: 'ougrhe', id: 1, song: 'Post 1', song_cover: '' },
    //     { username: 'ougrhe', id: 1, song: 'Post 1', song_cover: '' },
    // ]

    return (
        <View styles={styles.container}>
            
            <Card style={styles.music_card}>

            </Card>
        </View>
    )
}

export default Feed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#202020',
    },
    music_card: {

    }
});