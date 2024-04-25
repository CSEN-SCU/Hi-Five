import { StyleSheet, Text, View, Image, Pressable, Alert} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';


export default function PostItem({ post }) {
    return (
        <View>
            <View style={styles.user_info}>
                <Image
                    style={styles.profile_pic}  // required Dimensions and styling of Image
                    source={require('../../../frontend/ReactNative/assets/concert.png')} // enter your avatar image path 
                />
                <Text style={styles.username}>bigboyjohn</Text>
            </View>
            <View style={styles.card}>
                <Image
                    style={styles.song_cover}  // required Dimensions and styling of Image
                    source={require('../../../frontend/ReactNative/assets/concert.png')} // enter your avatar image path 
                />
                <Text style={styles.song_title}>Song Title</Text>
                <Text style={styles.song_artist}>Song Artist</Text>

                <View style={styles.interaction_bar}>
                    <Pressable onPress={() => Alert.alert("You pressed the left button")}>
                        <Icon name='closecircleo' size={50} style={styles.interaction_button} />
                    </Pressable>
                    <Pressable onPress={() => Alert.alert("You pressed the middle button")}>
                        <Icon name='closecircleo' size={50} style={styles.interaction_button} />
                    </Pressable>
                    <Pressable onPress={() => Alert.alert("You pressed the right button")}>
                        <Icon name='closecircleo' size={50} style={styles.interaction_button} />
                    </Pressable>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        backgroundColor: '#323232',
        opacity: 100,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: 340,
        height: 440,
        borderRadius: 15
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
        width: 300,
        height: 300,
        borderRadius: 10
    },

    song_artist: {
        fontSize: 15,
        color: '#FFFFFF'
    },

    song_title: {
        fontSize: 15,
        color: '#FFFFFF'
    },

    interaction_bar: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
    },

    interaction_button: {
        paddingHorizontal: 25,
        size: 50
    },
});