import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TextInput, Text, Subheading, Headline, IconButton, List } from 'react-native-paper';
import ContainedButton from '../components/ContainedButton';

export default function Room({ navigation }) {

    const goToInstructions = () => {
        navigation.navigate("Instructions");
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false} keyboardShouldPersistTaps="never">
            <View style={styles.container}>
                <View />
                <List.Section style={styles.list}>
                    <ScrollView alwaysBounceVertical={false}>
                        <List.Item style={styles.listItem} titleStyle={styles.listItemTitle} title="Noah Longhi" right={(props) => <List.Icon {...props} icon="star" />} />
                        <List.Item style={styles.listItem} titleStyle={styles.listItemTitle} title="Jesse Du" right={(props) => <List.Icon {...props} icon="account-cancel" />} />
                        <List.Item style={styles.listItem} titleStyle={styles.listItemTitle} title="Munim Tazwar" right={(props) => <List.Icon {...props} icon="account-cancel" />} />
                        <List.Item style={styles.listItem} titleStyle={styles.listItemTitle} title="Yadu Sunil" right={(props) => <List.Icon {...props} icon="account-cancel" />} />
                    </ScrollView>
                </List.Section>
                <View style={styles.buttonContain}>
                    <ContainedButton onPress={() => goToInstructions()}>
                        Ready
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
    list: {
        borderWidth: 1,
        borderRadius: 12,
        height: 512,
        padding: 16,
    },
    buttonContain: {
        paddingBottom: 48,
    },
    listItem: {

    },
    listItemTitle: {
        fontSize: 24,
        fontFamily: 'Inter_600SemiBold',
    }
});
