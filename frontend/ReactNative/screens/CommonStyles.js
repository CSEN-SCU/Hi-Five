// CommonStyles.js
// fonts, colors, etc to be used throughout the app

import { StyleSheet } from 'react-native';

const CommonStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    // Add more shared styles here
});

export default CommonStyles;