import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TextInput, Text, Subheading, Headline, IconButton, List } from 'react-native-paper';
import ContainedButton from '../components/ContainedButton';

export default function HostStreaming({ navigation }) {

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false} keyboardShouldPersistTaps="never">
            <View style={styles.container}>
                <Image source={require('../../assets/instructions1.png')} style={styles.instruction} />
                <Image source={require('../../assets/instructions2.png')} style={styles.instruction} />
                <Image source={require('../../assets/instructions3.png')} style={styles.instruction} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingVertical: 77,
    },
    instruction: {
        width: '100%',
        height: '30%',
    },
});
