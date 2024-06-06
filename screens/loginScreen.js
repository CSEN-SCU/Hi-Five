import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  Modal,
  View,
  Button,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { WebView } from "react-native-webview";
import {
  useAuthorizationCode,
  getAuthorizationUrl,
  generateRandomString,
} from "../backend/SpotifyAPI/auth.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REDIRECT_URI } from "@env";

const LoginScreen = ({ login }) => {
  const [authUrl, setAuthUrl] = useState(null);
  const [codeVerifier, setCodeVerifier] = useState(null);
  const [processingCode, setProcessingCode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const initiateAuth = async () => {
    // console.log("initiateAuth");
    const newCodeVerifier = generateRandomString(64);
    const newAuthUrl = await getAuthorizationUrl(newCodeVerifier);
    setCodeVerifier(newCodeVerifier);
    setAuthUrl(newAuthUrl);
    // console.log("newAuthUrl", newAuthUrl);
    if (Platform.OS === "web") window.location.href = newAuthUrl;
    setModalVisible(true);
  };

    const handleNavigationChange = async (event) => {
        if (!event.url.startsWith(REDIRECT_URI)) return true;
        let code = new URL(event.url).searchParams.get("code");
        if (!processingCode && code) {
          setProcessingCode(true);
          try {
            setModalVisible(false);
            const userId = await useAuthorizationCode(
                code,
                codeVerifier
            );
            console.log('User ID:', userId);
            await AsyncStorage.setItem("global_user_id", userId);
            console.log('User ID set in AsyncStorage');
          } catch (error) {
            console.error('Error setting user ID:', error);
          }
          login();
          return false;
        } else {
          return true;
        }
    };

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/concert.png")}
        style={styles.background}
        imageStyle={{ opacity: 0.5 }}
      ></ImageBackground>
      <View style={styles.overlay}>
        <Text style={styles.nameTitle}>Hi-Five</Text>
        <Text style={styles.tagline}>Share the Vibe!</Text>
        <Pressable
          style={[styles.loginButton, styles.shadowProp]}
          onPress={initiateAuth}
        >
          <Text style={styles.loginText}>Login with Spotify</Text>
          <Icon name="spotify" size={25} style={styles.iconStyle} />
        </Pressable>
      </View>
      {authUrl && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
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

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000",
  },
  loginButton: {
    backgroundColor: "#1ED760",
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "80%",
  },
  loginText: {
    fontSize: 17,
    color: "#000",
    fontWeight: "bold",
    marginRight: 10,
  },
  iconStyle: {
    color: "black",
  },
  nameTitle: {
    color: "#B2EED3",
    fontSize: 70,
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
  },
  tagline: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    marginBottom: 200,
    fontFamily: "Poppins_400Regular",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width: "115%",
    height: "115%",
    marginBottom: 50,
    zIndex: -1,
  },
  shadowProp: {
    shadowColor: "#1A1C1F",
    shadowOffset: { width: -2, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
