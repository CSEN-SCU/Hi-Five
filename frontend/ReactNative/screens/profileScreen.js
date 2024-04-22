import {Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ProfileScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/*Top Nav Bar*/}
            <View style={styles.topBar}>
                <Pressable onPress={()=>Alert.alert("You pressed the back button")}>
                    <Icon name='arrow-left' size={20} style={styles.iconTopStyle}/>
                </Pressable>
                <Text style={styles.navTitle}>Profile</Text>
                <Pressable onPress={()=>Alert.alert("You pressed the settings/edit button")}>
                    <Icon name='settings' size={20} style={styles.iconTopStyle}/>
                </Pressable>
            </View>
            {/*Profile Icon*/}
            <View style={styles.profileInfo}>
                <Image style={styles.profilePhoto} source={require('../assets/concert.png')}></Image>
                <Text style={styles.nameText}>Dave Chapelle</Text>
                <Text style={styles.usernameText}>dave_chapelle</Text>
                <Pressable style={styles.editButton} onPress={()=>Alert.alert("You pressed the settings/edit button")}>
                    <Icon name='edit' size={10} style={styles.iconBodyStyle}/>
                    <Text style={styles.editText}>Edit</Text>
                </Pressable>
                <View style={styles.streakContainer}>
                    <Text style={styles.nameText}>Streak</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#202020',
    },
    iconTopStyle:{
        justifyContent: "center",
        paddingRight: 10,
        paddingVertical: 2,
        color: '#B2EED3'
    },

    topBar:{
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 30
    },
    navTitle:{
        color: '#fff',
        fontSize: '20px'
    },
    profilePhoto:{
        marginTop: 64,
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        overflow: "hidden",
    },
    profileInfo:{
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'column',
    },
    editButton:{
        alignContent: "center",
        justifyContent: "center",
        paddingVertical: 4,
        flexDirection: "row",
        marginTop: 5,
    },
    editText:{
        justifyContent: "center",
        paddingRight: 5,
        color: '#fff'
    },
    iconBodyStyle:{
        justifyContent: "center",
        paddingRight: 5,
        paddingVertical: 3,
        color: '#fff'
    },
    nameText: {
        marginTop: 35,
        fontSize: '25px',
        justifyContent: "center",
        color: '#fff'
    },
    usernameText:{
        marginTop: 5,
        fontSize: '15px',
        justifyContent: "center",
        color: '#fff'
    },
    streakContainer:{
        color: '#2E2C2C'
    }
});
