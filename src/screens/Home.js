import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TextInput, Text, Subheading, Headline, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {

    React.useEffect(() => {
        AsyncStorage.removeItem("roomCode");
    }, [])

    const joinRoom = () => {
        navigation.navigate("JoinRoom");
    }

    const startRoom = () => {
        navigation.navigate("HostStreaming");
    }

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false} keyboardShouldPersistTaps="never">
            <View style={styles.container}>
                <Button compact style={{ width: 250, }} contentStyle={styles.startButton} onPress={startRoom}>
                    <Image
                        source={require('../../assets/startRoom.png')}
                        style={{ width: 241, height: 156, }}
                    />
                </Button>
                <Button compact contentStyle={styles.joinButton} onPress={() => joinRoom()}>
                    <Image
                        source={require('../../assets/joinRoom.png')}
                        style={{ width: 241, height: 156, }}
                    />
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    startButton: {
        padding: 0,
        justifyContent: 'flex-start',
    },
    joinButton: {
        padding: 0,
        justifyContent: 'flex-end',
    }
});
