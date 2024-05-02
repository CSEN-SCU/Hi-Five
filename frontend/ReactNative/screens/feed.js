import { StyleSheet, View, Text } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import UserPost from './userPost';
import PostItem from './postItem';


const Feed = () => {

    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }

    return (<View style={styles.container}>
        <View style={styles.feed_container}>
            <Text> oihuoyf </Text>
            <UserPost />
            <PostItem />
        </View>
    </View>)
}

export default Feed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#202020',
        alignItems: 'center',
    },
    feed_container: {
        paddingTop: 100,
        zIndex: -10
    }
});
