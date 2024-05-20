import LoginScreen from "./screens/loginScreen";
import Feed from "./screens/feed";
import ProfileScreen from "./screens/profileScreen";
import SongSelector from "./screens/songSelector"
import FriendsList from "./screens/FriendsList";

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isLoggedIn ? (
                    <>
                        <Stack.Screen name="Feed" component={Feed} />
                        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                        <Stack.Screen name="SongSelector" component={SongSelector} />
                        <Stack.Screen name="FriendsList" component={FriendsList} />
                    </>
                ) : (
                        <Stack.Screen name="LoginScreen" component={LoginScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>        
    );
}

export default App;