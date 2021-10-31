import React from 'react';
import { StyleSheet, View, ScrollView, Image, Animated, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TextInput, Text, Subheading, Headline, IconButton, List } from 'react-native-paper';
import { PanGestureHandler } from 'react-native-gesture-handler';

const profiles = [
    {
        name: "John Doe",
        age: 27,
        likes: ["Hockey", "Hiking"],
        pic: "https://www.exampleimagelink.png"
    },
    {
        name: "Alexis Texas",
        age: 22,
        likes: ["Parties", "Bananas"],
        pic: "https://www.exampleimagelink2.png"
    },
    {
        name: "Jane Smith",
        age: 35,
        likes: ["Netflix", "Wine"],
        pic: "https://www.exampleimagelink3.png"
    }
]

let index = 0;

export default function RoomSwipe({ navigation }) {
    const [profile, setProfile] = React.useState(profiles[0]);
    const [nextProfile, setNextProfile] = React.useState(profiles[1]);
    const translateX = new Animated.Value(0)
    const translateY = new Animated.Value(0)

    const handlePan = Animated.event(
        [{ nativeEvent: { translationX: translateX, translationY: translateY } }], { useNativeDriver: true }
    )

    const y = new Animated.Value(0)
    const windowHeight = Dimensions.get('window').height
    const TopOrBottom = y.interpolate({ inputRange: [0, windowHeight / 2 - 1, windowHeight / 2], outputRange: [1, 1, -1], extrapolate: 'clamp' })

    const rotate = Animated.multiply(translateX, TopOrBottom).interpolate({
        inputRange: [-500, 500],
        outputRange: [`-30deg`, `30deg`],
        extrapolate: 'clamp'
    })

    const reset = Animated.parallel([
        Animated.timing(translateX, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }),
        Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        })
    ])

    const handleSwipe = ({ nativeEvent }) => {
        const { state, translationX } = nativeEvent
        if (state === 5) { //When the user takes their finger off the screen
            if (translationX > 160 || translationX < -160) {
                setProfile(nextProfile)
                setNextProfile(profiles[++index % 3])
            }
            else reset.start()
        }
    }

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false} keyboardShouldPersistTaps="never">
            <View style={styles.container}>
                <View style={styles.card}>
                    {/* <Image source={profile.pic}></Image> */}
                    <Text>{nextProfile.name}</Text>
                    <Text>Age: {nextProfile.age}</Text>
                    <Text>Likes: {nextProfile.likes.join(', ')}</Text>
                </View>
                <PanGestureHandler onGestureEvent={handlePan} onHandlerStateChange={handleSwipe} >
                    <Animated.View style={[styles.card, { transform: [{ translateX }, { rotate }] }]}>
                        {/* <Image source={profile.pic}></Image> */}
                        <Text>{profile.name}</Text>
                        <Text>Age: {profile.age}</Text>
                        <Text>Likes: {profile.likes.join(', ')}</Text>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: "rgb(230,230,230)",
        width: "100%",
        height: "100%",
        borderRadius: 5,
        position: 'absolute',
        borderWidth: 1.5,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
