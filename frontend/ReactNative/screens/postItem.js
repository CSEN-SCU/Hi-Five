import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import Icon from 'react-native-vector-icons/Ionicons';

export default class PostItem extends React.Component {
    state = {
        buttonColor: '#FFFFFF'
    }

    handleClick = () => {
        // Toggle between white and red color
        const newColor = this.state.buttonColor === '#FFFFFF' ? '#B2EED3' : '#FFFFFF';
        this.setState({ buttonColor: newColor });

        if (newColor == '#FFFFFF') {
            console.log('Hi-Five button pressed (white)');
        }
        else {
            console.log('Hi-Five button pressed (teal)');
        }
    };

    render() {
        return (
            <View>
                <View style={styles.user_info}>
                    <Image
                        style={styles.profile_pic}  // required Dimensions and styling of Image
                        source={require('../../../frontend/ReactNative/assets/concert.png')} // enter your avatar image path 
                    />
                    <Text style={styles.username}>johnjohn</Text>
                </View>
                <View style={styles.card}>
                    <Image
                        style={styles.song_cover}  // required Dimensions and styling of Image
                        source={require('../../../frontend/ReactNative/assets/heros-cover.png')} // enter your avatar image path 
                    />
                    <Text style={styles.song_title}>Superhero</Text>
                    <Text style={styles.song_artist}>Metro Boomin, Future, Chris Brown</Text>


                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                        <TouchableOpacity onPress={() => console.log('Close button pressed')}>
                            <Icon name='close' size={40} color='#FFFFFF' />
                        </TouchableOpacity >
                        <TouchableOpacity style={styles.playButtonContainer}>
                            <Icon name='play' size={50} color='#FFFFFF' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handleClick}>
                            <Icon name='hand-right' size={30} color={this.state.buttonColor} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        backgroundColor: '#323232',
        opacity: 100,
        paddingVertical: 25,
        paddingHorizontal: 35,
        width: 340,
        height: 450,
        borderRadius: 15,
        marginBottom: 15
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
        width: 275,
        height: 275,
        borderRadius: 10,
        marginBottom: 10,
        alignSelf: "center"
    },

    song_artist: {
        fontSize: 11,
        color: '#FFFFFF'
    },

    song_title: {
        fontSize: 18,
        color: '#FFFFFF'
    },

    playButtonContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 32,
    }
});