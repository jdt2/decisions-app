import React from 'react';
import { StyleSheet, View, ScrollView, Image, Animated, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TextInput, Text, Subheading, Headline, IconButton, List, Card, Chip } from 'react-native-paper';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Header from '../components/Header';
import Subheader from '../components/Subheader';
import ImageBlurLoading from 'react-native-image-blur-loading';
import FastImage from 'react-native-fast-image';

export default function RoomSwipe({ navigation }) {

    const movies = [
        {
            name: "Baby Driver",
            year: 2017,
            description: "After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail.",
            genres: ["Action", "Crime", "Drama"],
            director: ['Edgar Wright'],
            writers: ['Edgar Wright'],
            stars: ['Ansel Elgort', 'Jon Bernthal'],
            thumbnail: require('../../assets/exampleMovies/babyDriverThumbnail.png'),
            pic: require('../../assets/exampleMovies/babyDriver.png')
        },
        {
            name: "Shawshank Redemption",
            year: 1994,
            description: "",
            genres: ["Action", "Crime", "Drama"],
            director: ['Edgar Wright'],
            writers: ['Edgar Wright'],
            stars: ['Ansel Elgort', 'Jon Bernthal'],
            thumbnail: require('../../assets/exampleMovies/shawshankThumbnail.png'),
            pic: require('../../assets/exampleMovies/shawshank.png')
        },
        {
            name: "The Godfather",
            year: 1972,
            description: "",
            genres: ["Action", "Crime", "Drama"],
            director: ['Edgar Wright'],
            writers: ['Edgar Wright'],
            stars: ['Ansel Elgort', 'Jon Bernthal'],
            thumbnail: require('../../assets/exampleMovies/godfatherThumbnail.png'),
            pic: require('../../assets/exampleMovies/godfather.png')
        }
    ];

    const [movie, setMovie] = React.useState(movies[0]);
    const [nextMovie, setNextMovie] = React.useState(movies[1]);
    const [index, setIndex] = React.useState(0);
    const translateX = new Animated.Value(0)
    const translateY = new Animated.Value(0)

    const handlePan = Animated.event(
        [{ nativeEvent: { translationX: translateX, translationY: translateY } }], { useNativeDriver: true }
    )

    const y = new Animated.Value(0)
    const windowHeight = Dimensions.get('window').height
    const windowWidth = Dimensions.get('window').width
    const TopOrBottom = y.interpolate({ inputRange: [0, windowHeight / 2 - 1, windowHeight / 2], outputRange: [1, 1, -1], extrapolate: 'clamp' })
    const nextOpacity = translateX.interpolate({ inputRange: [-windowWidth, 0, windowWidth], outputRange: [1, 0, 1], extrapolate: 'clamp' })
    const nextScale = translateX.interpolate({ inputRange: [-windowWidth, 0, windowWidth], outputRange: [1, 0.5, 1], extrapolate: 'clamp' })

    const rotate = Animated.multiply(translateX, TopOrBottom).interpolate({
        inputRange: [-500, 500],
        outputRange: [`-30deg`, `30deg`],
        extrapolate: 'clamp'
    })

    const reset = Animated.parallel([
        Animated.spring(translateX, {
            toValue: 0,
            friction: 4,
            useNativeDriver: true
        }),
        Animated.spring(translateY, {
            toValue: 0,
            friction: 4,
            useNativeDriver: true
        })
    ])

    const handleSwipe = ({ nativeEvent }) => {
        const { state, translationX } = nativeEvent
        if (state === 5) { //When the user takes their finger off the screen
            if (translationX > 160 || translationX < -160) {
                Animated.timing(translateX, {
                    toValue: translationX > 160 ? windowWidth : -windowWidth,
                    duration: 50,
                    useNativeDriver: true,
                }).start(() => {
                    /* setMovie(nextMovie)
                    setNextMovie(movies[++index % 3]) */
                    setIndex(index + 1);
                })
            }
            else reset.start()
        }
    }

    const displayCard = (movie) => {
        return (
            <Card elevation={5} style={styles.innerCard}>
                {/* <ImageBlurLoading
                    thumbnailSource={movie.thumbnail}
                    source={movie.pic}
                    style={styles.poster}
                /> */}
                {/* <FastImage
                    source={movie.pic}
                    style={styles.poster}
                /> */}
                <Image source={movie.pic} style={styles.poster} />
                <Card.Content style={styles.cardContent}>
                    <Header fontSize={24} lineHeight={29}>{movie.name} ({movie.year})</Header>
                    <Text style={styles.description}>{movie.description}</Text>
                    <Header fontSize={24} lineHeight={29}>Genres</Header>
                    <View style={styles.genres}>
                        {movie.genres.map((genre, i) => (
                            <Chip key={i} style={styles.genre} textStyle={{ color: 'white' }}>{genre}</Chip>
                        ))}
                    </View>
                    <View style={styles.details}>
                        <Header style={{ marginBottom: 16, }} fontSize={20} lineHeight={24}>Director{movie.director.length > 1 && '(s)'}   <Text>{movie.director.map((e, i) => (i !== movie.director.length - 1 ? e + ", " : e))}</Text></Header>
                        <Header style={{ marginBottom: 16, }} fontSize={20} lineHeight={24}>Writer{movie.writers.length > 1 && '(s)'}   <Text>{movie.writers.map((e, i) => (i !== movie.writers.length - 1 ? e + ", " : e))}</Text></Header>
                        <Header style={{ marginBottom: 16, }} fontSize={20} lineHeight={24}>Stars   <Text>{movie.stars.map((e, i) => (i !== movie.stars.length - 1 ? e + ", " : e))}</Text></Header>
                    </View>
                </Card.Content>
            </Card>
        );
    }

    const renderMovies = () => {
        return movies.map((movie, i) => {
            if (i < index) {
                return null;
            } else if (i == index) {
                return (
                    <PanGestureHandler key={i} onGestureEvent={handlePan} onHandlerStateChange={handleSwipe} >
                        <Animated.ScrollView style={[styles.card, { transform: [{ translateX }, { rotate }] }]} showsVerticalScrollIndicator={false}>
                            {displayCard(movie)}
                        </Animated.ScrollView>
                    </PanGestureHandler>
                );
            } else {
                return (
                    <Animated.ScrollView key={i} style={[styles.card, { opacity: nextOpacity, transform: [{ scale: nextScale }] }]}>
                        {displayCard(movie)}
                    </Animated.ScrollView>
                );
            }
        }).reverse();
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false} keyboardShouldPersistTaps="never">
            <View style={styles.container}>
                {renderMovies()}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#fff',
        marginHorizontal: 8,
        paddingBottom: 80,
    },
    card: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
        position: 'absolute',
        top: 40,
        backgroundColor: 'white',
    },
    innerCard: {
        height: "100%",
    },
    cardContent: {
        marginVertical: 24,
    },
    poster: {
        width: '100%',
        height: 512,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    description: {
        marginTop: 16,
        marginBottom: 32,
        fontSize: 16,
        lineHeight: 24,
    },
    genres: {
        flex: 1,
        flexDirection: 'row',
    },
    genre: {
        marginRight: 20,
        backgroundColor: '#263238',
    },
    details: {
        marginTop: 32,
    }
});
