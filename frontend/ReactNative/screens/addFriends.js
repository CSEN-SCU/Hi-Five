// addFriend list page
import { Alert, Image, TouchableOpacity, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FriendCard from './friendCard';

const addFriends = ({ navigation }) => {

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
                <Text style={styles.navTitle}>Add Friends</Text>
                <TouchableOpacity onPress={() => console.log("edit friends button clicked")}>
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            </View>

            {/* list of friends */}
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

export default addFriends;

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
        marginTop: 5
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
    }
});