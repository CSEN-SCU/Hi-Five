import { Image, StyleSheet, Text, View } from 'react-native';

const PlaylistSongCard = ({ songCover, songTitle, songArtist }) => {

    return (
        <View style={styles.container}>
            <Image
                style={styles.song_cover}
                source={songCover}
            />
            <View style={styles.song_info}>
                <Text style={styles.song_title}>{songTitle}</Text>
                <Text style={styles.song_artist}>{songArtist}</Text>
            </View>
        </View>
    )
}

export default PlaylistSongCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: 7.5
    },
    song_cover: {
        height: 50,
        width: 50,
        borderRadius: 10,
        marginRight: 10
    },
    song_info: {
        color: '#FFFFFF',
        alignContent: 'center'
    },
    song_title: {
        fontSize: 15,
        color: '#FFFFFF',
    },
    song_artist: {
        fontSize: 12,
        color: '#FFFFFF',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});