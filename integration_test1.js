import React, { useState } from 'react';
import { WebView } from 'react-native-webview';

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

  const scopes = ["user-top-read", "user-read-private", "playlist-modify-public", "playlist-modify-private", "user-read-recently-played", "user-library-read", "user-library-modify"];
  const scopesString = encodeURIComponent(scopes.join(' '));

  return accessToken ? (
    // If the access token is set, render your application
    <YourApp />
  ) : (
    // If the access token is not set, render the WebView
    <WebView
      source={{ uri: `https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=token&redirect_uri=YOUR_REDIRECT_URL&scope=${scopesString}` }}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
}