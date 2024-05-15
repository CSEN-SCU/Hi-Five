import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import UserPost from './userPost';
import PostItem from './postItem';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Feed = ({ navigation }) => {

    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular
    });

    const scrollViewRef = useRef(null);

    if (!fontsLoaded) {
        return null;
    }

    const posts = [
        {
            profilePic: require('../../../frontend/ReactNative/assets/concert.png'),
            username: 'johnjohn',
            songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'),
            songTitle: 'Superhero',
            songArtist: 'Metro Boomin, Future, Chris Brown'
        },
        {
            profilePic: require('../../../frontend/ReactNative/assets/concert.png'),
            username: 'johnjohn',
            songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'),
            songTitle: 'Superhero',
            songArtist: 'Metro Boomin, Future, Chris Brown'
        },
        {
            profilePic: require('../../../frontend/ReactNative/assets/concert.png'),
            username: 'johnjohn',
            songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'),
            songTitle: 'Superhero',
            songArtist: 'Metro Boomin, Future, Chris Brown'
        },
        {
            profilePic: require('../../../frontend/ReactNative/assets/concert.png'),
            username: 'johnjohn',
            songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'),
            songTitle: 'Superhero',
            songArtist: 'Metro Boomin, Future, Chris Brown'
        },
        {
            profilePic: require('../../../frontend/ReactNative/assets/concert.png'),
            username: 'johnjohn',
            songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'),
            songTitle: 'Superhero',
            songArtist: 'Metro Boomin, Future, Chris Brown'
        },
    ];

    return (<View style={styles.container}>
        <View>
            <View style={styles.topBar}>
                <View style={styles.leftIcon}>
                    <TouchableOpacity onPress={() => console.log('clicked friend button')} >
                        <FeatherIcon name='users' size={20} style={styles.iconTopStyle} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.push('Playlist')}>
                        <MatIcon name='playlist-music' size={20} style={styles.iconTopStyle} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.navTitle}>Hi-Five</Text>
                <TouchableOpacity onPress={() => navigation.push('ProfileScreen')}>
                    <FeatherIcon name='settings' size={20} style={styles.iconTopStyle} />
                </TouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}>  
                <TouchableOpacity onPress={onPress = () => navigation.push('SongSelector')}>
                    <UserPost />
                </TouchableOpacity>
                {posts.map((post, index) => (
                    <PostItem
                        key={index}
                        profilePic={post.profilePic}
                        username={post.username}
                        songCover={post.songCover}
                        songTitle={post.songTitle}
                        songArtist={post.songArtist}
                        scrollViewRef={scrollViewRef}
                    />
                ))}
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
    iconTopStyle: {
        justifyContent: "center",
        paddingVertical: 2,
        paddingHorizontal: 5,
        color: '#B2EED3'
    },
    topBar: {
        marginTop: 60,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    navTitle: {
        color: '#B2EED3',
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        paddingRight: 20,
    },
    leftIcon: {
        flexDirection: 'row',
    }
});