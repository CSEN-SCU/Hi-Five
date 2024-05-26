import { useState } from 'react';
import { Modal, View, Button, Platform, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useAuthorizationCode, getAuthorizationUrl, generateRandomString } from './backend/SpotifyAPI/auth.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REDIRECT_URI } from '@env'

const SpotifyLoginButton = () => {
  const [authUrl, setAuthUrl] = useState(null);
  const [codeVerifier, setCodeVerifier] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const initiateAuth = async () => {
    // console.log("initiateAuth");
    const newCodeVerifier = generateRandomString(64);
    const newAuthUrl = await getAuthorizationUrl(newCodeVerifier);
    setCodeVerifier(newCodeVerifier);
    setAuthUrl(newAuthUrl);
    // console.log("newAuthUrl", newAuthUrl);
    if (Platform.OS === 'web') window.location.href = newAuthUrl;
    setModalVisible(true);
  };

  const handleNavigationChange = async (event) => {
    // console.log("handleNavigationChange event", event);
    if (!event.url.startsWith(REDIRECT_URI)) return true;
    useAuthorizationCode((new URL(event.url)).searchParams.get('code'), codeVerifier).then(response => {
      AsyncStorage.setItem('global_access_token', response);
    });
    setModalVisible(false);
    return false;
  };

  return (
    <View style={styles.container}>
      <Button title="Login with Spotify" onPress={initiateAuth} />
      {authUrl && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => { setModalVisible(!modalVisible); }}
        >
          {authUrl && (
            <WebView
              source={{ uri: authUrl }}
              onNavigationStateChange={handleNavigationChange}
            />
          )}
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
