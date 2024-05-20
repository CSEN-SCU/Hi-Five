// playlist page

import { Alert, Image, TouchableOpacity, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import PlaylistSongCard from './playlistSongCard';

const Playlist = ({ navigation }) => {

    const songs = [
        { songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../../../frontend/ReactNative/assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/*Top Nav Bar*/}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={onPress = () => navigation.goBack()}>
                    <Icon name='arrow-left' size={20} style={styles.iconTopStyle} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress = () => console.log("spotify button pressed")}>
                    <Icon2 name='spotify' size={25} style={styles.iconTopStyle} />
                </TouchableOpacity>
            </View>


            <Text style={styles.screenTitle}>Current Playlist</Text>

            {/* list of recently played songs */}
            <View style={styles.songContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 7.5 }}></View>
                    {songs.map((song, index) => (
                        <PlaylistSongCard
                            key={index}
                            songCover={song.songCover}
                            songTitle={song.songTitle}
                            songArtist={song.songArtist}
                        />
                    ))}
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
