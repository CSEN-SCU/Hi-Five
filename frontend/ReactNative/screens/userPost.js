import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';

const UserPost = ({ songCover, songTitle, songArtist }) => {

    const [posted] = useState(true);

    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={[styles.card, posted ? styles.postedCard : null]}>
            {posted ? (
                <Image
                    style={styles.song_cover}
                    source={songCover}
                />
            ) : (
                <View style={styles.music_icon_container}>
                    <Icon name="musical-notes-outline" size={32.5} color="#B2EED3" />
                </View>
            )}
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.song_title}>
                    {posted ? songTitle : "Add a song"}
                </Text>
                <Text style={styles.song_artist}>
                    {posted ? songArtist : "Share the vibe!"}
                </Text>
            </View>
        </View>
    )
}

export default UserPost;


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