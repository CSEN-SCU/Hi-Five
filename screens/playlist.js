// playlist page

import {TouchableOpacity, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import PlaylistSongCard from './playlistSongCard';
import {getPlaylist} from "../backend/SpotifyAPI/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";


const Playlist = ({ navigation }) => {

    //const userId = await AsyncStorage.getItem("global_user_id", userId);

    const [songs, setSongs] = useState([]);

    const getPlaylistSongs = async () => {
        console.log("getting playlist songs");
        const userId = await AsyncStorage.getItem('global_user_id');
        const response = await getPlaylist(userId, '');
        console.log(response.tracks.items);
        const songData = response.tracks.items.map(song => {
            return {
                trackUri: song.track.uri,
                songTitle: song.track.name,
                songArtist: song.track.artists.map((artist) => artist.name).join(", "),
                songCover: song.track.album.images[0] ? song.track.album.images[0].url : null,
            };
        });
        setSongs(songData);
    }
    useEffect(() => {
        getPlaylistSongs();
    }, []);

    // const songs = [
    //     { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    //     { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    //     { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    //     { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    //     { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    //     { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    //     { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    //     { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    //     { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    //     { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    //     { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    //     { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    //     { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    //     { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    //     { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    //     { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    // ];

    return (
        <SafeAreaView style={styles.container}>
            {/*Top Nav Bar*/}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='arrow-left' size={20} style={styles.iconTopStyle} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("spotify button pressed")}>
                    <Icon2 name='spotify' size={25} style={styles.iconTopStyle} />
                </TouchableOpacity>
            </View>


            <Text style={styles.screenTitle}>Current Playlist</Text>

            {/* list of recently played songs */}
            <View style={styles.songContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 7.5 }}></View>
                    {songs.length === 0 ?
                        <Text style={{ color: '#FFFFFF', alignSelf: 'center', fontSize: 15 , paddingTop: 10}}>No songs in playlist</Text>
                        :
                        songs.map((song, index) => (
                            <PlaylistSongCard
                                key={index}
                                songCover={song.songCover}
                                songTitle={song.songTitle}
                                songArtist={song.songArtist}
                            />
                        ))
                    }
                    <View style={{ marginBottom: 7.5 }}></View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Playlist;

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
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 25
    },
    screenTitle: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 25,
        paddingBottom: 10
    },
    songContainer: {
        backgroundColor: '#323232',
        marginTop: 10,
        marginBottom: 300,
        marginHorizontal: 20,
        height: 675,
        borderRadius: 15,
        paddingHorizontal: 15,
        overflow: 'hidden'
    },
});