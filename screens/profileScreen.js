import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserAccessToken } from '../backend/SpotifyAPI/auth'; // Import getUserAccessToken function
import { getUserDisplayNameUsingAccessToken } from '../backend/SpotifyAPI/auth'; // Import getUserDisplayNameUsingAccessToken function

const ImageCount = props => {
    return (
        <View style={styles.countImageCont}>
            <Image style={styles.photo} source={require('../assets/cover.jpg')}/>
            <Text style={styles.historyCount}>{props.number}</Text>
        </View>

    );
}
const HistoryRowTop = () => {
    return (
        <View style={styles.rowContainer}>
            <ImageCount number = "1"/>
            <ImageCount number = "2"/>
            <ImageCount number = "3"/>
            <ImageCount number = "4"/>
            <ImageCount number = "5"/>
            <ImageCount number = "6"/>
            <ImageCount number = "7"/>
        </View>
    );
};
const HistoryRowBottom = () => {
    return (
        <View style={styles.rowContainer}>
            <ImageCount number="8" />
            <ImageCount number="9" />
            <ImageCount number="10" />
            <ImageCount number="11" />
            <ImageCount number="12" />
            <ImageCount number="13" />
            <ImageCount number="14" />
        </View>
    );
};
const ProfileScreen = ({ navigation }) => {
    const [displayName, setDisplayName] = useState(''); // State to store the display name

    useEffect(() => {
        const fetchDisplayName = async () => {
            try {
                const userId = await AsyncStorage.getItem('global_user_id');
                if (userId) {
                    const accessToken = await getUserAccessToken(userId); // Fetch access token
                    if (accessToken) {
                        const name = await getUserDisplayNameUsingAccessToken(accessToken); // Fetch display name
                        setDisplayName(name);
                    } else {
                        console.error('Access token is not available');
                    }
                } else {
                    console.error('User ID is not available');
                }
            } catch (error) {
                console.error('Error fetching display name:', error);
            }
        };

        fetchDisplayName();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/*Top Nav Bar*/}
            <View style={styles.topBar}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Icon name='arrow-left' size={20} style={styles.iconTopStyle} />
                </Pressable>
                <Text style={styles.navTitle}>Profile</Text>
                <Pressable onPress={() => Alert.alert("You pressed the settings/edit button")}>
                    <Icon name='settings' size={20} style={styles.iconTopStyle} />
                </Pressable>
            </View>
            {/*Profile Info*/}
            <View style={styles.profileInfo}>
                <Image style={styles.profilePhoto} source={require('../assets/concert.png')}></Image>
                <Text style={styles.nameText}>{displayName || 'Loading...'}</Text> 
                <Text style={styles.usernameText}>dave_chapelle</Text>
                <Pressable style={styles.editButton} onPress={() => Alert.alert("You pressed the settings/edit button")}>
                    <Icon name='edit' size={10} style={styles.iconBodyStyle} />
                    <Text style={styles.editText}>Edit</Text>
                </Pressable>
                {/*App Streak*/}
                <View style={styles.streakContainer}>
                    <Text style={styles.streakText}>App Streak</Text>
                    <View style={styles.fireContainer}>
                        <Text style={styles.streakNumber}> &#128293;14</Text>
                    </View>
                </View>
            </View>
            <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>14 Days Ago</Text>
                <HistoryRowTop />
                <HistoryRowBottom />
            </View>
        </SafeAreaView>
    );
};

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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 22,
        marginTop: 5
    },
    navTitle:{
        color: '#fff',
        fontSize: 20,
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
        marginBottom: 20,
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
    countImageCont:{
        flexWrap:"nowrap",
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'column',
    },
    nameText: {
        marginTop: 35,
        fontSize: 35,
        justifyContent: "center",
        color: '#cfd'
    },
    streakText:{
        marginTop: 10,
        fontSize: 35,
        justifyContent: "center",
        color: '#cfd'
    },
    usernameText:{
        marginTop: 5,
        fontSize: 15,
        justifyContent: "center",
        color: '#fff'
    },
    streakContainer: {
        backgroundColor: '#2E2C2C',
        //flexDirection: "column",
        paddingHorizontal: 60,
        borderRadius: 20
    },
    streakNumber:{
        color: "#fff",
        fontSize: 40,
        marginLeft: 20,
        alignItems: 'center',
        marginBottom: 20,
        //justifyContent: "center",
        //textAlign: "center"
    },
    fireContainer:{
        marginTop: 20,
        flexDirection: "row",
    },
    historyContainer:{
        marginTop: 50,
        backgroundColor: '#2E2C2C',
        marginHorizontal: 20,
        borderRadius: 20,
        paddingBottom: 20,
    },
    historyTitle:{
        color: "#fff",
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 20,
    },
    rowContainer:{
        //marginLeft: 20,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
    },
    photo:{
        marginTop: 10,
        marginHorizontal: 5,
        opacity: 60,
        width: 40,
        height: 40,
        overflow: "hidden",
    },
    historyCount:{
        color: "#fff"
    },
});