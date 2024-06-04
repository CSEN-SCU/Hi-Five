import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const SearchBar = ({ onSearchQueryChange }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleChangeText = (query) => {
    setSearchQuery(query);
    onSearchQueryChange(query); // Call the callback function with the new search query
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for a song"
        onChangeText={handleChangeText}
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
