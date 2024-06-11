import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/Ionicons";
import { getUserPlaylistId, getUserSnapshotPlaylistId } from "../backend/Firebase/users";
import { addTrackToPlaylist, removeTrackFromPlaylist } from "../backend/SpotifyAPI/functions";
import AsyncStorage from '@react-native-async-storage/async-storage';
const defaultProfilePic = require('../assets/default-pfp.png');

export default class PostItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hiFiveButtonColor: "#FFFFFF",
      isPlaying: false,
      cancelButtonColor: "#FFFFFF",
      sound: null,
    };
  }

  _onPlaybackStatusUpdate = async (playbackStatus) => {
    const { sound } = this.state;
    if (!playbackStatus.isLoaded) {
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
      }
    } else {
      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        this.setState({ isPlaying: false });
        // console.log("sound 1", sound); // DEBUG
        await sound.setStatusAsync({ shouldPlay: false, positionMillis: 0 });
      }
    }
  };

  async componentDidMount() {
    const { songPreview } = this.props;
    // const songPreview = "https://p.scdn.co/mp3-preview/2c08c5c6325fb502aa4b94c3880f06095114b22d?cid=1afd86bd959b46549fad0dc7389b1f1a";
    try {
      // await Audio.setIsEnabledAsync(false);
      // await Audio.setIsEnabledAsync(true);
      const { sound: soundObject } = await Audio.Sound.createAsync(
        { uri: songPreview } ,
        { shouldPlay: false }
      );
      await soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
      this.setState({ sound: soundObject });
    } catch (error) {
      console.log("Failed to load sound", error);
      Alert.alert("Error", "Failed to load sound: " + error.message);
    }
  }

  togglePlayPause = async () => {
    const { isPlaying, sound } = this.state;
    // console.log("togglePlayPause sound", sound); // DEBUG
    if (sound) {
      try {
        // console.log("sound 2", sound); // DEBUG
        if (isPlaying) {
          await sound.setStatusAsync({ shouldPlay: false });
        } else {
          await sound.setStatusAsync({ shouldPlay: true });
        }
        this.setState({ isPlaying: !isPlaying });
      } catch (error) {
        console.error("Error during playback control", error);
        Alert.alert("Error", `Playback error: ${error.message}`);
      }
    }
  };

  toggleCancel = async () => {
    const { hiFiveButtonColor } = this.state;
    const userId = await AsyncStorage.getItem('global_user_id');
    const userPlaylistId = await getUserPlaylistId(userId);
    const userSnapshotPlaylistId = await getUserSnapshotPlaylistId(userId);
    const { trackUri } = this.props;
    // const trackUri = "spotify:track:49Q4EjrGxgllOt6jXJPfeI";

    // console.log(userId);
    // console.log(userPlaylistId);
    // console.log(userSnapshotPlaylistId);
    // console.log(trackUri);

    if (hiFiveButtonColor === "#B2EED3") {
      this.setState({
        cancelButtonColor: "#FF5733",
        hiFiveButtonColor: "#FFFFFF",
      });
    } else {
      const newColor =
        this.state.cancelButtonColor === "#FFFFFF" ? "#FF5733" : "#FFFFFF";
      this.setState({ cancelButtonColor: newColor });
    }

    console.log(
      `Close button color changed to ${this.state.cancelButtonColor === "#FFFFFF" ? "white" : "red"
      }`
    );

    // user disliked/discarded the song
    if (this.state.cancelButtonColor !== "FFFFFF") {
      await removeTrackFromPlaylist(userId, trackUri/*.split(":")[2]*/, userPlaylistId, userSnapshotPlaylistId);
    }
  };

  handClick = async () => {
    const newColor =
      this.state.hiFiveButtonColor === "#FFFFFF" ? "#B2EED3" : "#FFFFFF";
    this.setState({ hiFiveButtonColor: newColor });
    const userId = await AsyncStorage.getItem('global_user_id');
    const userPlaylistId = await getUserPlaylistId(userId);
    const { trackUri } = this.props;
    // const trackUri = "spotify:track:49Q4EjrGxgllOt6jXJPfeI";


    // console.log(userId);
    // console.log(userPlaylistId);
    // console.log(trackUri);

    // user hi-fived the song
    if (this.state.hiFiveButtonColor == "#B2EED3") {
      await addTrackToPlaylist(userId, trackUri/*.split(":")[2]*/, userPlaylistId);
    }

    if (this.state.cancelButtonColor === "#FF5733") {
      this.setState({ cancelButtonColor: "#FFFFFF" });
      console.log("Close button color changed to white");
    }

    console.log(
      `Hi-Five button pressed (${newColor === "#FFFFFF" ? "white" : "teal"})`
    );
  };

  componentWillUnmount() {
    if (this.state.sound) {
      this.state.sound.unloadAsync().catch(error => console.log(error));
    }
    // Audio.setIsEnabledAsync(false).then(() => Audio.setIsEnabledAsync(true));
  }

  render() {
    const { profilePic, username, songCover, songTitle, songArtist, postDate, trackUri } =
      this.props;

    const limitCharacters = (str, limit) => {
      return str.length > limit ? str.substring(0, limit) + "..." : str;
    };

    return (
      <View>
        <View style={styles.user_info}>
          <Image
            style={styles.profile_pic}
            source={profilePic && profilePic.length > 0 ? { uri: profilePic[0]?.url } : defaultProfilePic}
          />
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.postDate}>{(new Date(postDate.seconds * 1000)).toLocaleTimeString()}</Text>
        </View>
        <View style={styles.card}>
          <Image style={styles.song_cover} source={{ uri: songCover }} />
          <Text style={styles.song_title}>
            {limitCharacters(songTitle, 30)}
          </Text>
          <Text style={styles.song_artist}>
            {limitCharacters(songArtist, 50)}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <TouchableOpacity onPress={this.toggleCancel}>
              <Icon
                name="close"
                size={40}
                color={this.state.cancelButtonColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playButtonContainer}
              onPress={this.togglePlayPause}
            >
              <Icon
                name={this.state.isPlaying ? "pause" : "play"}
                size={50}
                color="#FFFFFF"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handClick}>
              <Icon
                name="hand-right"
                size={30}
                color={this.state.hiFiveButtonColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    backgroundColor: "#323232",
    opacity: 100,
    paddingVertical: 25,
    paddingHorizontal: 35,
    width: 340,
    height: 450,
    borderRadius: 15,
    marginBottom: 15,
  },
  user_info: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },

  profile_pic: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    marginRight: 7.5,
  },

  username: {
    fontSize: 15,
    color: "#FFFFFF",
  },

  song_cover: {
    width: 275,
    height: 275,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",
  },

  song_artist: {
    fontSize: 11,
    color: "#FFFFFF",
  },

  song_title: {
    fontSize: 18,
    color: "#FFFFFF",
  },

  playButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 32,
  },
  postDate: {
    marginLeft: 'auto',
    marginRight: 10,
    fontSize: 12,
    color: '#888',
  },
});
