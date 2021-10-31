import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TextInput, Text, Subheading, Headline, IconButton } from 'react-native-paper';
import ContainedButton from '../components/ContainedButton';

export default function JoinRoom({ navigation }) {

    const joinRoom = () => {
        navigation.navigate("Room");
    }

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false} keyboardShouldPersistTaps="never">
            <View style={styles.container}>
                <View />
                <TextInput
                    mode="outlined"
                    placeholder="Enter Room Code"
                    style={styles.input}
                />
                <View style={styles.buttonContain}>
                    <ContainedButton onPress={() => joinRoom()}>
                        Join Room
                    </ContainedButton>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    input: {
        marginVertical: 10,
        fontSize: 20,
    },
    startButton: {
        padding: 0,
        justifyContent: 'flex-start',
    },
    joinButton: {
        padding: 0,
        justifyContent: 'flex-end',
    },
    buttonContain: {
      paddingBottom: 48,
    },
});
