import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TextInput, Text, Subheading, Headline, IconButton, List } from 'react-native-paper';
import ContainedButton from '../components/ContainedButton';
import { genreList } from '../constants/constants';

export default function HostGenres({ navigation, route }) {

    const [genres, setGenres] = React.useState(genreList);

    const filtersScreen = () => {
        navigation.navigate("HostFilters", { ...route.params, genres });
    }

    const toggleGenre = (id) => {
        let genre = genres[id];
        genre.selected = !genre.selected;
        setGenres({ ...genres, genre })
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false} keyboardShouldPersistTaps="never">
            <View style={styles.container}>
                <View style={styles.allContainer}><Heading>All</Heading></View>
                {Object.keys(genres).sort((a, b) => genres[a].name - genres[b].name).map((key, i) => (
                    <Pressable key={key} onPress={() => toggleGenre(key)}>
                        <ImageBackground source={genres[key].image} style={styles.genre} imageStyle={styles.genreImage}>
                            {genres[key].selected && <View style={styles.genreContainer}><Icon style={styles.check} name="check-circle" size={30} color="white" /></View>}
                        </ImageBackground>
                    </Pressable>
                ))}
                <ContainedButton style={styles.nextButton} onPress={filtersScreen}>Next</ContainedButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingTop: 5,
        paddingBottom: 36,
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    nextButton: {
        flexGrow: 1,
        marginTop: 44,
        marginHorizontal: 22,
    },
    genreContainer: {
        flex: 1,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,.2)'
    },
    genre: {
        width: 156,
        height: 156,
        marginTop: 24,
        marginHorizontal: 8,
        padding: 0,
    },
    genreImage: {
        borderRadius: 12,
    },
    check: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    allContainer: {
        width: 156,
        height: 156,
        marginTop: 24,
        marginHorizontal: 8,
        backgroundColor: '#263238',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
