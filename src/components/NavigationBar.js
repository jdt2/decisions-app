import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function NavigationBar({ navigation, back, route}) {
    return (
        <Appbar.Header statusBarHeight={44} style={styles.header}>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content titleStyle={styles.content} title={"Decisions"} />
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
    }
});
