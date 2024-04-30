import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from "react-native";
import Slider from "react-native-slider";
import Moment from "moment";

export default class UserPost extends React.Component {

    render() {
        return (
            <View>
                <View style={styles.card}>
                    <Image
                        style={styles.song_cover}  // required Dimensions and styling of Image
                        source={require('../../../frontend/ReactNative/assets/heros.png')} // enter your avatar image path 
                    />
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.song_title}>Superhero</Text>
                        <Text style={styles.song_artist}>Metro Boomin, Future, Chris Brown</Text>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#323232',
        opacity: 100,
        paddingVertical: 18,
        paddingHorizontal: 18,
        width: 340,
        height: 85,
        borderRadius: 15,
        marginBottom: 15,
        alignItems: "center",
    },

    user_info: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: "center",
        marginLeft: 15
    },

    profile_pic: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        marginRight: 7.5
    },

    username: {
        fontSize: 15,
        color: '#FFFFFF'
    },

    song_cover: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10
    },

    song_artist: {
        fontSize: 12,
        color: '#FFFFFF'
    },

    song_title: {
        fontSize: 15,
        color: '#FFFFFF'
    }
});