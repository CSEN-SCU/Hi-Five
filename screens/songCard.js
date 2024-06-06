import { useState } from 'react';
import { Image, StyleSheet, Text, View, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkPost, addPost, addPostId, getPost } from "../backend/Firebase/posts.js";
import { useNavigation } from '@react-navigation/native';


const SongCard = ({ trackUri, songCover, songTitle, songArtist }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const truncateString = (str, maxLength) => {
        return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
    };

    const handlePost = async () => { 
        const userId = await AsyncStorage.getItem('global_user_id');
        if (!await checkPost(userId)) {
            await addPost(userId, {});
        }

        try {
            await addPostId(userId, trackUri);
            await getPost(userId, {})
            console.log("Post added successfully");
            setModalVisible(false);
            navigation.goBack();
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity style={styles.song_container} onPress={() => setModalVisible(true)}>
                    <Image
                        style={styles.song_cover}
                        source={{ uri: songCover }}
                    />
                    <View style={styles.song_info}>
                        <Text style={styles.song_title}>{truncateString(songTitle, 35)}</Text>
                        <Text style={styles.song_artist}>{truncateString(songArtist, 45)}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.centeredView}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <TouchableOpacity
                                    style={styles.exitbutton}
                                    onPress={() => {
                                        setModalVisible(false);
                                    }}
                                >
                                    <Icon name="x" size={35} color='#FFFFFF' />
                                </TouchableOpacity>
                                <Image
                                    style={styles.modal_song_cover}
                                    source={{ uri: songCover }}
                                />
                                <Text style={styles.modal_song_text}>{truncateString(songTitle, 30)}</Text>
                                <Text style={styles.modal_artist_text}>{truncateString(songArtist, 30)}</Text>

                                <TouchableOpacity
                                    style={{ ...styles.postButton, backgroundColor: "#FFFFFF" }}
                                    onPress={handlePost}
                                >
                                    <Text style={styles.buttonText}>Post</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}

export default SongCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: "center",
    },
    song_container: {
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
    modalView: {
        backgroundColor: "#484848",
        width: 275,
        height: 325,
        borderRadius: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    postButton: {
        backgroundColor: "#F194FF",
        width: 100,
        height: 25,
        borderRadius: 5,
        elevation: 2,
        marginTop: 20,
        justifyContent: "center",
    },
    buttonText: {
        color: "black",
        textAlign: "center",
    },
    modal_song_cover: {
        height: 160,
        width: 160,
        borderRadius: 10,
        marginBottom: 20
    },
    modal_song_text: {
        fontSize: 15,
        color: "#FFFFFF"
    },
    modal_artist_text: {
        fontSize: 12,
        color: "#FFFFFF"
    },
    exitbutton: {
        alignSelf: 'left',
        marginTop: 10,
        marginLeft: 10
    }
});
