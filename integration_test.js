import { useState } from 'react';
import { Modal, View, Button, Platform, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useAuthorizationCodeGrant } from './backend/SpotifyAPI/functions.js';

import { Buffer } from 'buffer';
import 'react-native-url-polyfill/auto';
import { sha256 } from 'js-sha256';
import { CLIENT_ID, REDIRECT_URI } from '@env'
const scope = 'user-top-read user-read-private playlist-modify-public playlist-modify-private user-read-recently-played user-library-read user-library-modify';

function generateRandomString(length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function base64URLEncode(str) {
  return str
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function sha256Encode(plain) {
  const hash = sha256(plain);
  const base64Hash = Buffer.from(hash, 'hex').toString('base64');
  return base64URLEncode(base64Hash);
}

let _codeVerifier = "";

const SpotifyLoginButton = () => {
  const [authUrl, setAuthUrl] = useState(null);
  const [codeVerifier, setCodeVerifier] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const initiateAuth = async () => {
    _codeVerifier = generateRandomString(64);
    const challenge = await sha256Encode(_codeVerifier);

    setCodeVerifier(_codeVerifier);

    const state = generateRandomString(16);
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}&code_challenge_method=S256&code_challenge=${challenge}`;
    
    setAuthUrl(authUrl);

    if (Platform.OS === 'web') {
      window.location.href = authUrl;
    }

    setModalVisible(true); // Open the modal when the auth URL is set
  };

  return (
    <View style={styles.container}>
      <Button title="Login with Spotify" onPress={initiateAuth} />
      {authUrl && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <WebView
            source={{ uri: authUrl }}
            onNavigationStateChange={(event) => {
              // If the URL is not the redirectUri, allow the WebView to handle it
              if (!event.url.startsWith(REDIRECT_URI)) {
                return true;
              }
          
              // If the URL is the redirectUri, don't allow the WebView to handle it
              const url = new URL(event.url);
              const code = url.searchParams.get('code');
              const state = url.searchParams.get('state');
              
              // Validate state and exchange code for tokens here
              console.log('Authorization code:', code);
              useAuthorizationCodeGrant(code);
          
              setModalVisible(false); // Close the modal when the auth process is done
          
              return false;
            }}
          />
        </Modal>
      )}
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

export default SpotifyLoginButton;
export { _codeVerifier };
