import { Image, StyleSheet, Text, View } from 'react-native';

const FriendCard = ({ profilePic, username }) => {

    return (
        <View style={styles.container}>
            <Image
                style={styles.profile_pic}
                source={profilePic}
            />
            <Text style={styles.username}>{username}</Text>
        </View>
    )
}

export default FriendCard;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: "center",
        marginLeft: 15
    },
    profile_pic: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        marginRight: 10
    },
    username: {
        fontSize: 15,
        color: '#FFFFFF'
    },
    
});