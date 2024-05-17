import React, { useState } from "react";
import { StyleSheet, Text, View, Image, State } from "react-native";
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import Icon from 'react-native-vector-icons/Ionicons';

const UserPost = () => {

    const [posted, setPosted] = useState(false);

    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={[styles.card, posted ? styles.postedCard : null]}>
            {posted ? (
                <Image
                    style={styles.song_cover}
                    source={require('../../../frontend/ReactNative/assets/heros-cover.png')}
                />
            ) : (
                <View style={styles.music_icon_container}>
                    <Icon name="musical-notes-outline" size={32.5} color="#B2EED3"/>
                </View>
            )}
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.song_title}>
                    {posted ? "Superhero" : "Add a song"}
                </Text>
                <Text style={styles.song_artist}>
                    {posted ? "Metro Boomin, Future, Chris Brown" : "Share the vibe!"}
                </Text>
            </View>
        </View>
    )
}

export default UserPost;


const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#323232',
        opacity: 100,
        paddingVertical: 18,
        paddingHorizontal: 18,
        width: 340,
        height: 85,
        borderRadius: 15,
        marginBottom: 15,
        alignItems: "center",
    },

    user_info: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: "center",
        marginLeft: 15
    },

    profile_pic: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        marginRight: 7.5
    },

    username: {
        fontSize: 15,
        color: '#FFFFFF'
    },

    song_cover: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10
    },

    song_artist: {
        fontSize: 12,
        color: '#FFFFFF'
    },

    song_title: {
        fontSize: 15,
        color: '#FFFFFF'
    },

    music_icon_container: {
        backgroundColor: '#000000',
        borderRadius: 10,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    }
});