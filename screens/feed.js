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
import { getUserUsername } from '../backend/Firebase/users.js';

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

                        setSongDetails({
                            songCover: todaySong.album.images[0].url || null,
                            songTitle: todaySong.name,
                            songArtist: todaySong.artists.map((artist) => artist.name).join(", ")
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching user post or track details:', error);
            }
        };

        const fetchFeedPosts = async () => {
            try {
                const allPosts = await getPosts();
                const userPromises = [];
                const postPromises = [];

                // Create a batch of promises to fetch user data and post data in parallel
                for (const userId in allPosts) {
                  // Fetch usernames and profile pictures for each user
                  userPromises.push(getUserUsername(userId));
                  userPromises.push(spotifyProfilePic(userId));

                  // Fetch track data for each post in parallel
                  for (const postId in allPosts[userId]) {
                    const post = allPosts[userId][postId];
                    postPromises.push(
                      getTrack(
                        await AsyncStorage.getItem("global_user_id"),
                        post.track_uri.split(":")[2]
                      )
                    );
                  }
                }

                // Wait for all user data to be fetched
                const userResults = await Promise.all(userPromises);
                // Wait for all track data to be fetched
                const postResults = await Promise.all(postPromises);

                // Now userResults and postResults should contain the resolved data
                // console.log("User data:", userResults);
                // console.log("Post data:", postResults);

                const userData = {};
                let userIndex = 0;

                // Organize user data into a dictionary for quick lookup
                for (const userId in allPosts) {
                    userData[userId] = {
                        username: userResults[userIndex],
                        profilePic: userResults[userIndex + 1]?.[0]?.url || 'default_profile_pic_url'
                    };
                    userIndex += 2;
                }

                const posts = [];
                let postIndex = 0;

                // Construct post details using the fetched data
                for (const userId in allPosts) {
                    const user = allPosts[userId];
                    for (const postId in user) {
                        const currPost = user[postId];
                        const currTrack = postResults[postIndex];

                        console.log("Curr Track: ", currTrack)
                        if (currTrack != null)
                        {
                            const currPostDetails = {
                              date: currPost.date.toDate(),
                              profilePic: userData[userId].profilePic,
                              username: userData[userId].username,
                              songCover:
                                currTrack.album.images?.[0]?.url ||
                                "default_cover_url",
                              songTitle: currTrack.name,
                              songArtist: currTrack.artists
                                .map((artist) => artist.name)
                                    .join(", "),
                                songPreview: currTrack.preview_url,
                              trackUri: currTrack.uri
                            };

                            posts.push(currPostDetails);
                        }
                        
                        postIndex++;
                    }
                }

                // Sort posts by date (most recent first)
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
                        songPreview={post.songPreview}
                        trackUri={ post.trackUri}
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