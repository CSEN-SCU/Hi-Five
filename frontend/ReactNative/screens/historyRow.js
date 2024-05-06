import {Image, View, StyleSheet} from "react-native";

const HistoryRow = () => {
    return (
        <View style={styles.rowContainer}>
            <Image style={styles.photo} source={require('../assets/cover.jpg')}></Image>
            <Image style={styles.photo} source={require('../assets/cover.jpg')}></Image>
            <Image style={styles.photo} source={require('../assets/cover.jpg')}></Image>
            <Image style={styles.photo} source={require('../assets/cover.jpg')}></Image>
            <Image style={styles.photo} source={require('../assets/cover.jpg')}></Image>
            <Image style={styles.photo} source={require('../assets/cover.jpg')}></Image>
            <Image style={styles.photo} source={require('../assets/cover.jpg')}></Image>
        </View>
    )
}

export default HistoryRow;

const styles = StyleSheet.create({
    rowContainer:{
        //marginLeft: 20,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
    },
    photo:{
        marginTop: 10,
        marginHorizontal: 5,
        width: 40,
        height: 40,
        overflow: "hidden",
    },
});
