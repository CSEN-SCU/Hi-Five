import React, { useState } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from "react-native";
import Slider from "react-native-slider";
import Moment from "moment";
import Icon from 'react-native-vector-icons/Ionicons';

export default class PostItem extends React.Component {
    state = {
        trackLength: 300,
        timeElapsed: "0:00",
        timeRemaining: "5:00",
        buttonColor: "#FFFFFF"
    };

    changeTime = seconds => {
        this.setState({ timeElapsed: Moment.utc(seconds * 1000).format("m:ss") });
        this.setState({ timeRemaining: Moment.utc((this.state.trackLength - seconds) * 1000).format("m:ss") });
    };

    handleClick = () => {
        // Toggle between white and red color
        const newColor = this.state.buttonColor === '#FFFFFF' ? '#B2EED3' : '#FFFFFF';
        this.setState({ buttonColor: newColor });
        console.log('Hi-Five button pressed');
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
                        source={require('../../../frontend/ReactNative/assets/heros.png')} // enter your avatar image path 
                    />
                    <Text style={styles.song_title}>Superhero</Text>
                    <Text style={styles.song_artist}>Metro Boomin, Future, Chris Brown</Text>
                    
                    <View style={{ margin: 5 }}>
                        <Slider
                            minimumValue={0}
                            maximumValue={this.state.trackLength}
                            trackStyle={styles.track}
                            thumbStyle={styles.thumb}
                            minimumTrackTintColor='#FFFFFF'
                            onValueChange={seconds => this.changeTime(seconds)}
                        ></Slider>
                        <View style={{ marginTop: -12, flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.timeStamp}>{this.state.timeElapsed}</Text>
                            <Text style={styles.timeStamp}>{this.state.timeRemaining}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                        <TouchableOpacity onPress={() => console.log('Close button pressed')}>
                            <Icon name='close' size={40} color='#FFFFFF' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.playButtonContainer} onPress={() => console.log('Play button pressed')}>
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
        height: 475,
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
    track: {
        height: 2,
        borderRadius: 1,
        backgroundColor: '#777777'
    },
    thumb: {
        width: 8,
        height: 8,
        backgroundColor: "#FFFFFF"
    },
    timeStamp: {
        fontSize: 11,
        fontWeight: "500",
        color: "#FFFFFF"
    },
    playButtonContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 32,
    }
});