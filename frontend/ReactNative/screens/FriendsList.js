// friend list page
import { Alert, Image, TouchableOpacity, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FriendCard from './friendCard';

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

const FriendsList = ({ navigation }) => {

    const friends = [
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
        { profilePic: require('../../../frontend/ReactNative/assets/heros-cover.png'), username: 'dave_chapelle' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/*Top Nav Bar*/}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={onPress = () => navigation.goBack()}>
                    <Icon name='arrow-left' size={20} style={styles.iconTopStyle} />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Following</Text>
                <TouchableOpacity onPress={() => console.log("edit friends button clicked")}>
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.push('AddFriends')}>
                <AddFriendsButton />
            </TouchableOpacity>
            {/* list of friends */}
            <View style={styles.friendContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
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
        fontSize: 15
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