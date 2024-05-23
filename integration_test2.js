import React, { useEffect } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import { getSpotifyID } from '../../backend/backend.js';

import { CLIENT_ID } from '@env'

const config = {
  clientId: CLIENT_ID,
  redirectUri: AuthSession.makeRedirectUri({ scheme: 'hi-five' }),
  scopes: ["user-top-read", "user-read-private", "playlist-modify-public", "playlist-modify-private", "user-read-recently-played", "user-library-read", "user-library-modify"],
};

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
};

const AuthorizationButton = () => {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(config, discovery);

  useEffect(() => {
    if (response?.type === 'success') {
      const access_token = response.params.code;
      console.log(response)
      AsyncStorage.setItem('access_token', access_token);
      console.log('Access token stored:', access_token);
      console.log(getSpotifyID(access_token))
    }
  }, [response]);

  const handleAuthorization = async () => {
    try {
      await promptAsync();
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthorizationButton;