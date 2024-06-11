// addFriend list page
import * as React from 'react';
import { Alert, Image, TouchableOpacity, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from "./searchBar";
import Icon from 'react-native-vector-icons/Feather';
import FriendCard from './friendCard';
import { getUsers, getUserFollowing, getUserUsername, addFollowing } from '../backend/Firebase/users.js';
import { spotifyProfilePic } from '../backend/SpotifyAPI/functions.js';

const AddFriends = ({ navigation }) => {

    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    async function getUserCards(query) {
        // console.log("getUserCards query", query); // DEBUG
        const userIds = Object.keys(await getUsers());

        const globalUserId = await AsyncStorage.getItem('global_user_id');
        const following = await getUserFollowing(globalUserId);

        let users = [];

        users = await Promise.all(
            userIds.map(async (id) => {
                const username = await getUserUsername(id);
                const profilePic = await spotifyProfilePic(id);
        
                if (username.toLowerCase().startsWith(query.toLowerCase()) && id !== globalUserId && !following.includes(id)) {
                    return { id, profilePic, username };
                }
        }));

        users = users.filter(user => user !== undefined);

        // console.log("getUserCards users.filter(user => user !== undefined)", users); // DEBUG

        return users;
    }

    useEffect(() => {
        getUserCards("").then((users) => {
            // console.log("useEffect getUsers users", users); // DEBUG
            setAllUsers(users);
            setUsers(users);
        });
    }, []);

    let controller = new AbortController();
    let lastQueryTime = useRef(0);

    const handleSearchQueryChange = async (query) => {
        // console.log("handleSearchQueryChange query", query); // DEBUG
        const currentQueryTime = Date.now();
        // console.log("before currentQueryTime", currentQueryTime, "lastQueryTime", lastQueryTime.current);
        lastQueryTime.current = currentQueryTime;

        // Cancel the previous fetch request
        controller.abort();

        // Create a new AbortController for the new fetch request
        controller = new AbortController();

        if (query == "") {
            setUsers(allUsers);
            // console.log("processed empty search query");
            return;
        }

        setSearchQuery(query);

        try {
            let userCards = await getUserCards(query);

            // Only update the state if this is the latest search query
            // console.log("currentQueryTime", currentQueryTime, "lastQueryTime", lastQueryTime.current);
            if (currentQueryTime === lastQueryTime.current) {
                // console.log("processed search query:", query);
                setUsers(userCards);
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                // console.log('Fetch request cancelled');
            } else {
                throw error;
            }
        }
    };

    // const SearchBar = () => {
    //     const [searchQuery, setSearchQuery] = React.useState('');
    
    //     return (
    //         <View style={styles.searchBarContainer}>
    //             <Searchbar
    //                 placeholder="Search for others"
    //                 onChangeText={setSearchQuery}
    //                 value={searchQuery}
    //                 inputStyle={styles.searchInput}
    //                 style={styles.searchbar}
    //                 onSearchQueryChange={handleSearchQueryChange}
    //             />
    //         </View>
    
    //     );
    // };

    // const users = [
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    //     { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    // ];

    return (
        <SafeAreaView style={styles.container}>
            {/*Top Nav Bar*/}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={onPress = () => navigation.goBack()}>
                    <Icon name='arrow-left' size={20} style={styles.iconTopStyle} />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Find Others</Text>
                <Text style={styles.editText}>   </Text>
            </View>

            {/* list of friends */}
            <SearchBar onSearchQueryChange={handleSearchQueryChange} placeholder={"Search for a user"}/>

            <View style={styles.friendContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 7.5 }}></View>
                    {users.sort((a, b) => a.username.localeCompare(b.username)).map((user) => (
                        <FriendCard
                            key={user.id}
                            profilePic={user.profilePic}
                            username={user.username}
                            onPress={async () => {
                                await addFollowing(await AsyncStorage.getItem('global_user_id'), user.id);
                                setUsers(await getUserCards(searchQuery)); // update the list of users
                            }}
                            unaddable={false}
                            id={user.id}
                        />
                    ))}
                    <View style={{ marginBottom: 7.5 }}></View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default AddFriends;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#202020',
    },
    iconTopStyle: {
        justifyContent: "center",
        paddingVertical: 2,
        color: '#B2EED3'
    },
    topBar: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 30,
        marginBottom: 15
    },
    navTitle: {
        color: '#fff',
        fontSize: 20,
    },
    friendContainer: {
        marginTop: 5,
        marginHorizontal: 10,
        overflow: 'hidden'
    },
    editText: {
        color: '#fff',
        fontSize: 15
    },
    searchBarContainer: {
        marginHorizontal: 20,
    },

    searchInput: {
        fontSize: 16,
        alignSelf: 'center'
    },

    searchbar: {
        height: 38,
        alignItems: 'center'
    }
});