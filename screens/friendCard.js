import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const FriendCard = ({ profilePic, username, onPress, unaddable, id }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.profile_pic}
                source={profilePic}
            />
            <Text style={styles.username}>{username}</Text>
            <TouchableOpacity style={unaddable ? styles.unfriendButton : styles.addButton} onPress={onPress}>
                <Text style={unaddable ? styles.unfriendText : styles.addText}>{unaddable ? 'X' : '+'}</Text>
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
        // justifyContent: 'space-between'
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
        backgroundColor: '#dd0000'
    },
    addButton: {
        marginLeft: 15,
        padding: 5,
        borderRadius: 2,
        backgroundColor: '#008800'
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