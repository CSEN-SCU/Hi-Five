import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, State } from "react-native";
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import Icon from 'react-native-vector-icons/Ionicons';

export default class PostItem extends React.Component {

    state = {
        buttonColor: '#FFFFFF',
        isPlaying: false
    }

    handClick = () => {
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
    
    togglePlayPause = () => {
        // Toggle between play and pause for the play button
        this.setState(prevState => ({ isPlaying: !prevState.isPlaying }));

        // Log the play button state
        if (!this.state.isPlaying) {
            console.log('Play button pressed');
        } else {
            console.log('Pause button pressed');
        }
    };

    render() {
        const { profilePic, username, songCover, songTitle, songArtist } = this.props;

        return (
            <View>
                <View style={styles.user_info}>
                    <Image
                        style={styles.profile_pic}
                        source={profilePic}
                    />
                    <Text style={styles.username}>{username}</Text>
                </View>
                <View style={styles.card}>
                    <Image
                        style={styles.song_cover}
                        source={songCover}
                    />
                    <Text style={styles.song_title}>{songTitle}</Text>
                    <Text style={styles.song_artist}>{songArtist}</Text>

                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                        <TouchableOpacity
                            onPress={() => console.log('close button pressed')}>
                            <Icon name='close' size={40} color='#FFFFFF' />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.playButtonContainer}
                            onPress={this.togglePlayPause}
                            >
                            <Icon name={this.state.isPlaying ? 'pause' : 'play'} size={50} color='#FFFFFF' />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.handClick}
                            activeOpacity={1}>
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