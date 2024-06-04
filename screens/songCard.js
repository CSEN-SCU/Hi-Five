import { useState } from 'react';
import { Image, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const SongCard = ({ songCover, songTitle, songArtist, trackUri }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity style={styles.song_container} onPress={() => setModalVisible(true)}>
                    <Image
                        style={styles.song_cover}
                        source={{ uri: songCover }}
                    />
                    <View style={styles.song_info}>
                        <Text style={styles.song_title}>{songTitle}</Text>
                        <Text style={styles.song_artist}>{songArtist}</Text>
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
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={styles.exitbutton}
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                            <Icon name="x" size={35} color='#FFFFFF'/>
                        </TouchableOpacity>
                        <Image
                            style={styles.modal_song_cover}
                            source={songCover}
                        />
                        <Text style={styles.modal_song_text}>{songTitle}</Text>
                        <Text style={styles.modal_artist_text}>{songArtist}</Text>


                        <TouchableOpacity
                            style={{ ...styles.postButton, backgroundColor: "#FFFFFF" }}
                            onPress={() => {
                                setModalVisible(false);
                                console.log("post button clicked")
                            }}
                        >
                            <Text style={styles.buttonText}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
