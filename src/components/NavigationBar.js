import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import ContainedButton from './ContainedButton';

export default function NavigationBar({ navigation, back, route, roomCode }) {
    return (
        <Appbar.Header statusBarHeight={44} style={styles.header}>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            {roomCode ? <ContainedButton height={64} fontSize={24} style={styles.roomCode}>Room #     {roomCode}</ContainedButton> : <Appbar.Content titleStyle={styles.content} title={"Decisions"} />}
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    header: {
        elevation: 0,
        backgroundColor: 'white',
    },
    content: {
        color: '#263238',
        fontSize: 34,
        fontWeight: "600",
        fontFamily: "Inter_600SemiBold",
    },
    roomCode: {
        flexGrow: 1,
        marginLeft: 18,
        marginRight: 21,
    }
});
