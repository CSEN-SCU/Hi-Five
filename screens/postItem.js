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
            this.setState({isPlaying: false});
        await sound.setStatusAsync({ shouldPlay: false, positionMillis: 0 });
      }
    }
  };

  async componentDidMount() {
    const { songPreview } = this.props;
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: songPreview },
        { shouldPlay: false }
      );
        await sound.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
      this.setState({ sound });
    } catch (error) {
      console.log("Failed to load sound", error);
      Alert.alert("Error", "Failed to load sound: " + error.message);
    }
  }

  togglePlayPause = async () => {
    const { isPlaying, sound } = this.state;
    if (sound) {
      try {
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

  toggleCancel = () => {
    const { hiFiveButtonColor } = this.state;

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
      `Close button color changed to ${
        this.state.cancelButtonColor === "#FFFFFF" ? "white" : "red"
      }`
    );
  };

  handClick = async () => {
    const newColor =
      this.state.hiFiveButtonColor === "#FFFFFF" ? "#B2EED3" : "#FFFFFF";
      this.setState({ hiFiveButtonColor: newColor });
      
      if (this.state.hiFiveButtonColor == "#B2EED3")
      {
          
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
      this.state.sound.unloadAsync();
    }
  }

  render() {
    const { profilePic, username, songCover, songTitle, songArtist } =
      this.props;

    const limitCharacters = (str, limit) => {
      return str.length > limit ? str.substring(0, limit) + "..." : str;
    };

    return (
      <View>
        <View style={styles.user_info}>
          <Image style={styles.profile_pic} source={{ uri: profilePic }} />
          <Text style={styles.username}>{username}</Text>
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
});
