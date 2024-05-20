import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { startListener } from '../../backend/backend.js'

export default function App() {
  const [accessToken, setAccessToken] = useState(null);

  const onNavigationStateChange = (webViewState) => {
    const { url } = webViewState;

    // Check if the redirect url is reached
    if (url.includes('YOUR_REDIRECT_URL')) {
      // Extract the access token from the url
      const token = url.split('=')[1];
      setAccessToken(token);
    }
  };

  return accessToken ? (
    // If the access token is set, render your application
    <YourApp />
  ) : (
    // If the access token is not set, render the WebView
    <WebView
      source={{ uri: 'https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=token&redirect_uri=YOUR_REDIRECT_URL' }}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
}