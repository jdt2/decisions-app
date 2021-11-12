import React from 'react';
import { StyleSheet, View, ScrollView, Image, Animated, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TextInput, Text, Subheading, Headline, IconButton, List } from 'react-native-paper';
import ContainedButton from '../components/ContainedButton';
import { discoverMovies } from '../api/api';

// TODO: Merge with RoomSwipe for preloading

export default function Instructions({ navigation }) {

    const windowWidth = Dimensions.get('window').width
    const windowHeight = Dimensions.get('window').height
    const firstX = new Animated.Value(-windowWidth/2)
    const secondX = new Animated.Value(windowWidth/2)
    const thirdY = new Animated.Value(windowHeight)
    
    const firstOpacity = firstX.interpolate({ inputRange: [-windowWidth/2, 0], outputRange: [0, 1], extrapolate: 'clamp' })
    const secondOpacity = secondX.interpolate({ inputRange: [0, windowWidth/2], outputRange: [1, 0], extrapolate: 'clamp' })
    const thirdOpacity = thirdY.interpolate({ inputRange: [0, windowHeight], outputRange: [1, 0], extrapolate: 'clamp' })

    React.useEffect(() => {
        Animated.stagger(500, [
            Animated.timing(firstX, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(secondX, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(thirdY, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start()

        console.log(discoverMovies().then((response) => console.log(response)));

        setTimeout(() => {
            navigation.navigate("RoomSwipe");
            navigation.reset({
                index: 0,
                routes: [{ name: 'RoomSwipe' }],
            });
        }, 5000)
    })

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false} keyboardShouldPersistTaps="never">
            <View style={styles.container}>
                <Animated.Image source={require('../../assets/instructions1.png')} style={[styles.instruction, { opacity: firstOpacity, transform: [{ translateX: firstX }] }]} />
                <Animated.Image source={require('../../assets/instructions2.png')} style={[styles.instruction, { opacity: secondOpacity, transform: [{ translateX: secondX }] }]} />
                <Animated.Image source={require('../../assets/instructions3.png')} style={[styles.instruction, { opacity: thirdOpacity, transform: [{ translateY: thirdY }] }]} />
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
