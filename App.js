import LoginScreen from "./screens/loginScreen";
import Feed from "./screens/feed";
import ProfileScreen from "./screens/profileScreen";
import SongSelector from "./screens/songSelector"
import FriendsList from "./screens/FriendsList";
import Playlist from "./screens/playlist";

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SpotifyLoginButton from './integration_test.js'; // DEBUG

const Stack = createNativeStackNavigator();

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
      <SpotifyLoginButton />
    );

    // return (
    //     <AuthorizationButton></AuthorizationButton>
    //     // <NavigationContainer>
    //     //     <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     //         {isLoggedIn ? (
    //     //             <>
    //     //                 <Stack.Screen name="Feed" component={Feed} />
    //     //                 <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    //     //                 <Stack.Screen name="SongSelector" component={SongSelector} />
    //     //                 <Stack.Screen name="FriendsList" component={FriendsList} />
    //     //                 <Stack.Screen name="Playlist" component={Playlist} />
    //     //             </>
    //     //         ) : (
    //     //                 <Stack.Screen name="LoginScreen" component={LoginScreen} />
    //     //         )}
    //     //     </Stack.Navigator>
    //     // </NavigationContainer>        
    // );
}

export default App;