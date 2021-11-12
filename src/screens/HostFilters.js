import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TextInput, Text, Subheading, Headline, IconButton, List, Switch } from 'react-native-paper';
import ContainedButton from '../components/ContainedButton';
import Header from '../components/Header';

export default function HostFilters({ navigation }) {

    const startRoom = () => {
        navigation.navigate("Room", {host: true});
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false} keyboardShouldPersistTaps="never">
            <View style={styles.container}>
                <View style={styles.option}>
                    <Header style={styles.optionContent} fontSize={24}>Age Restriction</Header>
                    <Switch />
                </View>
                <View style={styles.option}>
                    <Header style={styles.optionContent} fontSize={24}>Date</Header>
                    <Switch />
                </View>
                <View style={styles.option}>
                    <Header style={styles.optionContent} fontSize={24}>IMDb Rating</Header>
                    <Switch />
                </View>
                <View style={styles.option}>
                    <Header style={styles.optionContent} fontSize={24}>Director</Header>
                    <Switch />
                </View>
                <View style={styles.option}>
                    <Header style={styles.optionContent} fontSize={24}>Actor</Header>
                    <Switch />
                </View>
                <View style={styles.option}>
                    <Header style={styles.optionContent} fontSize={24}>Awards</Header>
                    <Switch />
                </View>
                <View style={styles.option}>
                    <Header style={styles.optionContent} fontSize={24}>Keywords</Header>
                    <Switch />
                </View>
                <ContainedButton style={styles.nextButton} onPress={startRoom}>Next</ContainedButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 11,
        paddingBottom: 36,
        paddingHorizontal: 24,
    },
    nextButton: {
        flexGrow: 1,
        marginTop: 44,
    },
    option: {
        marginTop: 24,
        backgroundColor: "#263238",
        flexGrow: 1,
        borderRadius: 12,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    optionContent: {
        flexGrow: 1,
        color: '#fff',
    }
});
