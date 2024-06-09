// friend list page
import { Alert, Image, TouchableOpacity, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getUserFollowing, getUserUsername } from '../backend/Firebase/users.js';
import { spotifyProfilePic } from '../backend/SpotifyAPI/functions.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import FriendCard from './friendCard';
import { removeFollowing } from '../backend/Firebase/users.js';

const AddFriendsButton = ({ navigation }) => {
    return (
        <View style={styles.addFriendCard}>
            <View style={styles.add_icon_container}>
                <Icon name="plus" size={32.5} color="#B2EED3" />
            </View>
            <Text style={styles.addText}>Find Others</Text>
        </View>
    )
}

async function getFriends(userId) {
  const followingIds = await getUserFollowing(userId);

  const friends = await Promise.all(
    followingIds.map(async (id) => {
      const username = await getUserUsername(id);
      const profilePic = await spotifyProfilePic(id);

      return { id, profilePic, username };
    })
  );

  return friends;
}

const FriendsList = ({ navigation }) => {

    [friends, setFriends] = useState([]);

    useFocusEffect(() => {
        AsyncStorage.getItem('global_user_id')
            .then(userId => {
                getFriends(userId)
                    .then(result => {
                        setFriends(result);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    });

    // const friends = [
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
                <Text style={styles.navTitle}>Following</Text>
                <TouchableOpacity onPress={() => console.log("edit friends button clicked")}>
                    <Text style={{...styles.editText, opacity: 0}}>Edit</Text> 
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.push('AddFriends')}>
                <AddFriendsButton />
            </TouchableOpacity>
            {/* list of friends */}
            <View style={styles.friendContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {friends.sort((a, b) => a.username.localeCompare(b.username)).map((friend) => (
                        <FriendCard
                            key={friend.id}
                            profilePic={friend.profilePic}
                            username={friend.username}
                            onPress={async () => {
                                await removeFollowing(await AsyncStorage.getItem('global_user_id'), friend.id);
                                setFriends(await getFriends(await AsyncStorage.getItem('global_user_id')));
                            }}
                            unaddable={true}
                            id={friend.id}
                        />
                    ))}
                    <View style={{ marginBottom: 7.5 }}></View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default FriendsList;

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
        marginTop: 5,
        marginBottom: 20
    },
    navTitle: {
        color: '#fff',
        fontSize: 20,
    },
    friendContainer: {
        marginTop: 10,
        marginHorizontal: 10,
        overflow: 'hidden'
    },
    editText: {
        color: '#fff',
        fontSize: 15,
    },
    addFriendCard: {
        marginHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addText: {
        color: '#fff',
        fontSize: 15
    },
    add_icon_container: {
        backgroundColor: '#121212',
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    }
});