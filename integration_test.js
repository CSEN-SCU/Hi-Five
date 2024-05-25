import React, { useEffect } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthorizationCodeGrant, getAuthorizeURL } from './backend/SpotifyAPI/functions.js';

import { CLIENT_ID } from '@env'

// console.log("Object.getOwnPropertyNames(Object.getPrototypeOf(AuthSession))", Object.getOwnPropertyNames(Object.getPrototypeOf(AuthSession)));

const config = {
  clientId: CLIENT_ID,
  redirectUri: "hi-five://auth", // AuthSession.makeRedirectUri({ scheme: 'hi-five' })
  scopes: ["user-top-read", "user-read-private", "playlist-modify-public", "playlist-modify-private", "user-read-recently-played", "user-library-read", "user-library-modify"],
};

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
};

async function handleAuthorizationResponse(response) {
  console.log("response", response);
  const url = new URL(response.url);
  const params = new URLSearchParams(url.search);
  const code = params.get('code');
  console.log("code", code);
  await useAuthorizationCodeGrant(code);
  // console.log("response", response);
  // console.log("accessToken", accessToken);
  // let userId = await getSpotifyUserIdUsingAccessToken(accessToken);
  // console.log("userId", userId);
  // await addUserUsingAccessTokenAndDefaults(userId, accessToken);
  // console.log("getUser(accessToken)", await getUser(accessToken));
  // await AsyncStorage.setItem('global_access_token', accessToken);
  // console.log("AsyncStorage.getItem('global_access_token')", await AsyncStorage.getItem('global_access_token'));
}











import * as WebBrowser from 'expo-web-browser';

const AuthorizationButton = () => {
  const handleAuthorization = async () => {
    try {
      const authorizeURL = await getAuthorizeURL();
      const result = await WebBrowser.openAuthSessionAsync(authorizeURL, config.redirectUri);
      if (result.type === 'success') {
        handleAuthorizationResponse(result);
      }
    } catch (error) {
      console.error('Authorization error:', error);
      Alert.alert('Error', 'Failed to authorize with Spotify');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Authorize with Spotify" onPress={handleAuthorization} />
    </View>
  );
};



// import * as AuthSession from 'expo-auth-session';
// import * as AuthSession from 'expo';

// const AuthorizationButton = () => {
//   const handleAuthorization = async () => {
//     try {
//       const authorizeURL = await getAuthorizeURL();
//       const result = await AuthSession.startAsync({ authUrl: authorizeURL });
//       if (result.type === 'success') {
//         handleAuthorizationResponse(result);
//       }
//     } catch (error) {
//       console.error('Authorization error:', error);
//       Alert.alert('Error', 'Failed to authorize with Spotify');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Authorize with Spotify" onPress={handleAuthorization} />
//     </View>
//   );
// };

// const AuthorizationButton = () => {
//   const [request, response, promptAsync] = AuthSession.useAuthRequest(config, discovery);

//   useEffect(() => {
//     if (response?.type === 'success') {
//       handleAuthorizationResponse(response);
//     }
//   }, [response]);

//   const handleAuthorization = async () => {
//     try {
//       await promptAsync();
//     } catch (error) {
//       console.error('Authorization error:', error);
//       Alert.alert('Error', 'Failed to authorize with Spotify');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Authorize with Spotify" onPress={handleAuthorization} />
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthorizationButton;