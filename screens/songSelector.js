import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import SongCard from './songCard';
import SearchBar from './searchBar';

const SongSelector = ({ navigation }) => {
    
    const songs = [
        { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
        { songCover: require('../assets/heros-cover.png'), songTitle: 'Superhero', songArtist: 'Metro Boomin, Future, Chris Brown' },
    ];
    
    return (
        <SafeAreaView style={styles.container}>
            {/*Top Nav Bar*/}
            <View style={styles.topBar}>
                <Pressable onPress={onPress = () => navigation.goBack()}>
                    <Icon name='arrow-left' size={20} style={styles.iconTopStyle} />
                </Pressable>
            </View>

            
            <Text style={styles.screenTitle}>Share your song</Text>
            <SearchBar />
            
            {/* list of recently played songs */}
            <View style={styles.songContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{marginTop: 7.5}}></View>
                    {songs.map((song, index) => (
                        <SongCard
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

export default SongSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#202020',
    },
    iconTopStyle: {
        justifyContent: "center",
        paddingRight: 10,
        paddingVertical: 2,
        color: '#B2EED3'
    },
    topBar: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 30
    },
    screenTitle: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 25,
        paddingBottom: 10
    },
    songContainer: {
        backgroundColor: '#323232',
        marginTop: 20,
        marginBottom: 300,
        marginHorizontal: 20,
        height: 650,
        borderRadius: 15,
        paddingHorizontal: 15,
        overflow: 'hidden'
    },
});
