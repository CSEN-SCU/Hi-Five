// addFriend list page
import * as React from 'react';
import { Alert, Image, TouchableOpacity, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import FriendCard from './friendCard';


const SearchBar = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <View style={styles.searchBarContainer}>
            <Searchbar
                placeholder="Search for others"
                onChangeText={setSearchQuery}
                value={searchQuery}
                inputStyle={styles.searchInput}
                style={styles.searchbar}
            />
        </View>

    );
};

const AddFriends = ({ navigation }) => {

    const friends = [
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../assets/heros-cover.png'), username: 'dave_chapelle' },
    ];

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
            <SearchBar/>

            <View style={styles.friendContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 7.5 }}></View>
                    {friends.map((friend, index) => (
                        <FriendCard
                            key={index}
                            profilePic={friend.profilePic}
                            username={friend.username}
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