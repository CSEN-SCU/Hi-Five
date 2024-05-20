import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search for a song"
                onChangeText={setSearchQuery}
                value={searchQuery}
                inputStyle={styles.searchInput}
                style={styles.searchbar}
            />
        </View>
        
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },

    searchInput: {
        fontSize: 16,
        alignSelf: 'center'
    },

    searchbar: {
        height: 38,
        alignItems: 'center'
    }
})
