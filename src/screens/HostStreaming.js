import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TextInput, Text, Subheading, Headline, IconButton, List } from 'react-native-paper';
import ContainedButton from '../components/ContainedButton';
import { createRoom } from '../api/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HostStreaming({ navigation }) {

    React.useEffect(() => {
        const newRoom = async () => {
            const roomCode = await AsyncStorage.getItem("roomCode");
            if (roomCode === null) {
                createRoom();
            }
        }
        newRoom();
    }, []);

    const genresScreen = () => {
        navigation.navigate("HostGenres");
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false} keyboardShouldPersistTaps="never">
            <View style={styles.container}>
                <Image source={require('../../assets/streaming/netflix.png')} style={styles.service} />
                <Image source={require('../../assets/streaming/hulu.png')} style={styles.service} />
                <Image source={require('../../assets/streaming/prime.png')} style={styles.service} />
                <Image source={require('../../assets/streaming/crunchyroll.png')} style={styles.service} />
                <Image source={require('../../assets/streaming/disney.png')} style={styles.service} />
                <Image source={require('../../assets/streaming/hbo.png')} style={styles.service} />
                <Image source={require('../../assets/streaming/apple.png')} style={styles.service} />
                <Image source={require('../../assets/streaming/peacock.png')} style={styles.service} />
                <ContainedButton style={styles.nextButton} onPress={genresScreen}>Next</ContainedButton>
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
    service: {
        width: 156,
        height: 156,
        borderRadius: 12,
        marginTop: 24,
        marginHorizontal: 8,
    },
    nextButton: {
        flexGrow: 1,
        marginTop: 44,
        marginHorizontal: 22,
    }
});
