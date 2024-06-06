import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import UserPost from './userPost';
import PostItem from './postItem';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNewestPostId, getPosts } from "../backend/Firebase/posts.js";
import { getTrack, spotifyProfilePic } from "../backend/SpotifyAPI/functions.js";
import { getUser, getUserUsername } from '../backend/Firebase/users.js';

const Feed = ({ navigation }) => {
    const [posted, setPosted] = useState(false);
    const [songDetails, setSongDetails] = useState({ songCover: '.', songTitle: '.', songArtist: '.' });
    const [feedPosts, setFeedPosts] = useState([]);

    useEffect(() => {
        const fetchUserPost = async () => {
            try {
                const userId = await AsyncStorage.getItem('global_user_id');
                const newestPost = await getNewestPostId(userId);

                if (newestPost == undefined) {
                    setPosted(false);
                } else {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const postDate = new Date(newestPost.date.seconds * 1000 + newestPost.date.nanoseconds / 1000000);
                    postDate.setHours(0, 0, 0, 0);

                    if (postDate.getTime() === today.getTime()) {
                        setPosted(true);

                        if (!newestPost.track_uri.startsWith('spotify:track:')) {
                            throw new Error('Invalid track URI');
                        }

                        const trackId = newestPost.track_uri.split(':')[2];
                        const todaySong = await getTrack(userId, trackId);

                        // console.log("feed.js songCover (before set)", todaySong.album.images[0].url); // DEBUG

                        setSongDetails({
                            songCover: todaySong.album.images[0].url || null,
                            songTitle: todaySong.name,
                            songArtist: todaySong.artists.map((artist) => artist.name).join(", ")
                        });

                        // console.log("feed.js songCover (after set)", songDetails.songCover); // DEBUG
                    }
                }
            } catch (error) {
                console.error('Error fetching user post or track details:', error);
            }
        };

        const fetchFeedPosts = async () => {
            try {
                const all_posts = await getPosts();
                const posts = [];

                for (const userId in all_posts) {
                    const user = all_posts[userId];
                    const username = await getUserUsername(userId);
                    const profilePic = await spotifyProfilePic(userId);

                    for (const postId in user) {
                        const curr_post = user[postId];

                        if (!curr_post.track_uri.startsWith('spotify:track:')) {
                            throw new Error('Invalid track URI');
                        }
                        const curr_trackId = curr_post.track_uri.split(':')[2];
                        const curr_track = await getTrack(userId, curr_trackId);

                        const curr_post_details = {
                            date: curr_post.date.toDate(),
                            profilePic: profilePic?.[0]?.url || 'default_profile_pic_url',
                            username: username,
                            songCover: curr_track.album.images?.[0]?.url || 'default_cover_url',
                            songTitle: curr_track.name,
                            songArtist: curr_track.artists.map((artist) => artist.name).join(", "),
                        };

                        posts.push(curr_post_details);
                    }
                }

                posts.sort((a, b) => b.date - a.date);
                setFeedPosts(posts);
            } catch (error) {
                console.error('Error fetching posts or track details:', error);
            }
        };

        const checkFeedUpdates = navigation.addListener('focus', () => {
            fetchUserPost();
            fetchFeedPosts();
        });

        return () => checkFeedUpdates();

    }, [navigation]);

    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }

    const posts = [
        {
            profilePic: require('../assets/concert.png'),
            username: 'johnjohn',
            songCover: require('../assets/heros-cover.png'),
            songTitle: 'Superhero',
            songArtist: 'Metro Boomin, Future, Chris Brown'
        },
        {
            profilePic: require('../assets/concert.png'),
            username: 'johnjohn',
            songCover: require('../assets/heros-cover.png'),
            songTitle: 'Superhero',
            songArtist: 'Metro Boomin, Future, Chris Brown'
        },
        {
            profilePic: require('../assets/concert.png'),
            username: 'johnjohn',
            songCover: require('../assets/heros-cover.png'),
            songTitle: 'Superhero',
            songArtist: 'Metro Boomin, Future, Chris Brown'
        },
        {
            profilePic: require('../assets/concert.png'),
            username: 'johnjohn',
            songCover: require('../assets/heros-cover.png'),
            songTitle: 'Superhero',
            songArtist: 'Metro Boomin, Future, Chris Brown'
        },
        {
            profilePic: require('../assets/concert.png'),
            username: 'johnjohn',
            songCover: require('../assets/heros-cover.png'),
            songTitle: 'Superhero',
            songArtist: 'Metro Boomin, Future, Chris Brown'
        },
    ];

    return (<View style={styles.container}>
        <View>
            <View style={styles.topBar}>
                <View style={styles.leftIcon}>
                    <TouchableOpacity onPress={() => navigation.push('FriendsList')} >
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={onPress = () => navigation.push('SongSelector')}>
                    <UserPost posted={posted} {...songDetails} />
                </TouchableOpacity>
                {feedPosts.map((post, index) => (
                    <PostItem
                        key={index}
                        profilePic={post.profilePic}
                        username={post.username}
                        songCover={post.songCover}
                        songTitle={post.songTitle}
                        songArtist={post.songArtist}
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