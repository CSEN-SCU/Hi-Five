import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import SongCard from "./songCard";
import SearchBar from "./searchBar";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getRecentlyPlayedTracks,
  searchForTracks,
} from "../backend/SpotifyAPI/functions";

function parseTracksForSongs(tracks) {
    
    track_list = tracks.map((track) => ({
      trackUri: track.uri,
      songTitle: track.name,
      songArtist: track.artists.map((artist) => artist.name).join(", "),
      songCover: track.album.images[0] ? track.album.images[0].url : null,
    }));
    console.log(track_list);
  return track_list;
}

const SongSelector = ({ navigation }) => {
  
  //const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState([]);

    let recentlyPlayedSongs = [];
    
    AsyncStorage.getItem("global_user_id").then((userId) => getRecentlyPlayedTracks(userId).then(
        (tracks) => {
        recentlyPlayedSongs = parseTracksForSongs(tracks);
        //   handleSearchQueryChange("");
        } // TODO rerender if needed
    ));

    const [searchQuery, setSearchQuery] = useState("");
    const [songs, setSongs] = useState(recentlyPlayedSongs);

  const handleSearchQueryChange = async (query) => {
    if (query == "") {
      console.log("recentlyPlayedSongCards", recentlyPlayedSongs); // DEBUG
      setSongs(recentlyPlayedSongs);
      return;
    }
    setSearchQuery(query);
    let tracks = await searchForTracks(
      await AsyncStorage.getItem("global_user_id"),
      query
    );
    console.log("tracks", tracks); // DEBUG
    console.log(
      "songCards == parseTracksForSongCards(tracks)",
      parseTracksForSongs(tracks)
    ); // DEBUG
    setSongs(
      parseTracksForSongs(tracks)
    );
    console.log("Search Query:", query);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*Top Nav Bar*/}
      <View style={styles.topBar}>
        <Pressable onPress={(onPress = () => navigation.goBack())}>
          <Icon name="arrow-left" size={20} style={styles.iconTopStyle} />
        </Pressable>
      </View>

      <Text style={styles.screenTitle}>Share your song</Text>
      <SearchBar onSearchQueryChange={handleSearchQueryChange} />

      {/* list of recently played songs */}
      <View style={styles.songContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 7.5 }}></View>
          {songs.map((song, index) => (
            <SongCard
              key={index}
              songCover={song.songCover}
              songTitle={song.songTitle}
              songArtist={song.songArtist}
              trackUri={song.trackUri}
            />
          ))}
          <View style={{ marginBottom: 7.5 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SongSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#202020",
  },
  iconTopStyle: {
    justifyContent: "center",
    paddingRight: 10,
    paddingVertical: 2,
    color: "#B2EED3",
  },
  topBar: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 30,
  },
  screenTitle: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 25,
    paddingBottom: 10,
  },
  songContainer: {
    backgroundColor: "#323232",
    marginTop: 20,
    marginBottom: 300,
    marginHorizontal: 20,
    height: 650,
    borderRadius: 15,
    paddingHorizontal: 15,
    overflow: "hidden",
  },
});
