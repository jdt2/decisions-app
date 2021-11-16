import React from 'react';
import { StyleSheet, View, ScrollView, Image, ImageBackground, Pressable } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TextInput, Text, Subheading, Headline, IconButton, List } from 'react-native-paper';
import ContainedButton from '../components/ContainedButton';
import { createRoom } from '../api/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { streamingServices } from '../constants/constants';

export default function HostStreaming({ navigation }) {

    const [services, setServices] = React.useState(streamingServices);

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
        navigation.navigate("HostGenres", { services });
    }

    const toggleService = (id) => {
        let service = services[id];
        service.selected = !service.selected;
        setServices({ ...services, [id]: service })
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false} keyboardShouldPersistTaps="never">
            <View style={styles.container}>
                {Object.keys(services).map((key, i) => (
                    <Pressable key={key} onPress={() => toggleService(key)}>
                        <ImageBackground source={services[key].image} style={styles.service} imageStyle={styles.serviceImage}>
                            {services[key].selected && <View style={styles.streamContainer}><Icon style={styles.check} name="check-circle" size={30} color="white" /></View>}
                        </ImageBackground>
                    </Pressable>
                ))}
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
    nextButton: {
        flexGrow: 1,
        marginTop: 44,
        marginHorizontal: 22,
    },
    streamContainer: {
        flex: 1,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,.2)'
    },
    service: {
        width: 156,
        height: 156,
        marginTop: 24,
        marginHorizontal: 8,
        padding: 0,
    },
    serviceImage: {
        borderRadius: 12,
    },
    check: {
        position: 'absolute',
        top: 10,
        right: 10,
    }
});
