import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const defaultProfilePic = require('../assets/default-pfp.png');

const FriendCard = ({ profilePic, username, onPress, unaddable, id }) => {
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image
                    style={styles.profile_pic}
                    source={profilePic && profilePic.length > 0 ? { uri: profilePic[0]?.url } : defaultProfilePic}
                />
                <Text style={styles.username}>{username}</Text>
            </View>
            <TouchableOpacity style={unaddable ? styles.unfriendButton : styles.addButton} onPress={onPress}>
                <MatIcon
                    name={unaddable ? 'cancel' : 'plus-circle-outline'}
                    size={25}
                    color={unaddable ? 'red' : 'green'}
                />
            </TouchableOpacity>
        </View>
    )
}

export default FriendCard;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: "center",
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'space-between'
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: "center",
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
    unfriendButton: {
        marginLeft: 15,
        padding: 5,
        borderRadius: 2,
        color: '#dd0000'
        // backgroundColor: '#dd0000'
    },
    addButton: {
        marginLeft: 15,
        padding: 5,
        borderRadius: 2,
        // backgroundColor: '#008800'
    },
    unfriendText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold'
    },
    addText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold'
    }
});





// import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// const FriendCard = ({ profilePic, username, onUnfriend, unaddable }) => {
//     return (
//         <View style={styles.container}>
//             <Image
//                 style={styles.profile_pic}
//                 source={profilePic}
//             />
//             <Text style={styles.username}>{username}</Text>
//             {unaddable && (
//                 <TouchableOpacity style={styles.unfriendButton} onPress={onUnfriend}>
//                     <Text style={styles.unfriendText}>X</Text>
//                 </TouchableOpacity>
//             )}
//         </View>
//     )
// }

// export default FriendCard;

// const styles = StyleSheet.create({
//     container: {
//         paddingVertical: 10,
//         flexDirection: 'row',
//         alignItems: "center",
//         marginLeft: 15,
//         // justifyContent: 'space-between'r
//     },
//     profile_pic: {
//         width: 40,
//         height: 40,
//         borderRadius: 40 / 2,
//         marginRight: 10
//     },
//     username: {
//         fontSize: 15,
//         color: '#FFFFFF'
//     },
//     unfriendButton: {
//         marginLeft: 15,
//         padding: 3,
//         borderRadius: 2,
//         backgroundColor: '#dd0000'
//     },
//     unfriendText: {
//         color: '#FFFFFF',
//         fontSize: 13,
//         fontWeight: 'bold'
//     }
// });










// import { Image, StyleSheet, Text, View } from 'react-native';

// const FriendCard = ({ profilePic, username }) => {

//     return (
//         <View style={styles.container}>
//             <Image
//                 style={styles.profile_pic}
//                 source={profilePic}
//             />
//             <Text style={styles.username}>{username}</Text>
//         </View>
//     )
// }

// export default FriendCard;

// const styles = StyleSheet.create({
//     container: {
//         paddingVertical: 10,
//         flexDirection: 'row',
//         alignItems: "center",
//         marginLeft: 15
//     },
//     profile_pic: {
//         width: 40,
//         height: 40,
//         borderRadius: 40 / 2,
//         marginRight: 10
//     },
//     username: {
//         fontSize: 15,
//         color: '#FFFFFF'
//     },
    
// });