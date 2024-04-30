// feed.js
// splash page/login page

import { Alert, ImageBackground, Pressable, StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import PostItem from './postItem';
import UserPost from './userPost';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


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
            <UserPost />
            <ScrollView showsVerticalScrollIndicator={false}>
                <UserPost />
                <PostItem />
                <PostItem />
                <PostItem />
                <PostItem />
            </ScrollView>
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
    },
});
