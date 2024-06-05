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
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getRecentlyPlayedTracks,
  searchForTracks,
} from "../backend/SpotifyAPI/functions";
import { useRef } from 'react';

function parseTracksForSongs(tracks) {
  // console.log("tracks", tracks); // DEBUG
  let track_list = tracks.map((track) => ({
    trackUri: track.uri,
    songTitle: track.name,
    songArtist: track.artists.map((artist) => artist.name).join(", "),
    songCover: track.album.images[0] ? track.album.images[0].url : null,
  }));
  // console.log(track_list);
  return track_list;
}

const SongSelector = ({ navigation }) => {

  const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState([]);

  const getRecentSongs = async () => {
    // console.log("getting recent songs");
    const userId = await AsyncStorage.getItem('global_user_id');
    const response = await getRecentlyPlayedTracks(userId);
    const songData = response.map(song => {
      return {
        trackUri: song.track.uri,
        songCover: song.track.album.images[0].url,
        songTitle: song.track.name,
        songArtist: song.track.artists.map((artist) => artist.name).join(", "),
      };
    });
    setRecentlyPlayedSongs(songData);
    setSongs(songData);
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState(recentlyPlayedSongs);
  useEffect(() => {
    getRecentSongs();
  }, []);
  
  let controller = new AbortController();
  let lastQueryTime = useRef(0);

  const handleSearchQueryChange = async (query) => {
    const currentQueryTime = Date.now();
    // console.log("before currentQueryTime", currentQueryTime, "lastQueryTime", lastQueryTime.current);
    lastQueryTime.current = currentQueryTime;

    // Cancel the previous fetch request
    controller.abort();

    // Create a new AbortController for the new fetch request
    controller = new AbortController();

    if (query == "") {
      setSongs(recentlyPlayedSongs);
      // console.log("processed empty search query");
      return;
    }

    setSearchQuery(query);

    try {
      let tracks = await searchForTracks(
        await AsyncStorage.getItem("global_user_id"),
        query,
        controller.signal
      );

      // Only update the state if this is the latest search query
      // console.log("currentQueryTime", currentQueryTime, "lastQueryTime", lastQueryTime.current);
      if (currentQueryTime === lastQueryTime.current) {
        // console.log("processed search query:", query);
        const songs = parseTracksForSongs(tracks);
        setSongs(songs);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        // console.log('Fetch request cancelled');
      } else {
        throw error;
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*Top Nav Bar*/}
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()}>
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
              trackUri={song.trackUri}
              songCover={song.songCover}
              songTitle={song.songTitle}
              songArtist={song.songArtist}
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
