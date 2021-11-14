import React from 'react';
import { StyleSheet, View, ScrollView, Image, Animated, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TextInput, Text, Subheading, Headline, IconButton, List, Card, Chip } from 'react-native-paper';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Header from '../components/Header';
import Subheader from '../components/Subheader';
import ImageBlurLoading from 'react-native-image-blur-loading';
import FastImage from 'react-native-fast-image';
import { getMovies } from '../api/firebase';
import Instructions from './Instructions';

const exampleMovies = [
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

const formatRuntime = (runtime) => {
    if (runtime >= 60) {
        return `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
    } else {
        return `${runtime} m`;
    }

}

export default function RoomSwipe({ navigation, route }) {

    const [movies, setMovies] = React.useState([]);
    const [index, setIndex] = React.useState(0);
    const [showInstructions, setShowInstructions] = React.useState(true);
    const [expandDesc, setExpandDesc] = React.useState(false);
    const windowHeight = Dimensions.get('window').height
    const windowWidth = Dimensions.get('window').width
    const translateX = new Animated.Value(0)
    const translateY = new Animated.Value(0)

    React.useEffect(() => {
        const retrieveMovies = async () => {
            setMovies(await getMovies());
        }
        setTimeout(() => {
            navigation.setOptions({ headerShown: true });
            setShowInstructions(false);

        }, 5000)
        retrieveMovies();
    }, [])

    const handlePan = Animated.event(
        [{ nativeEvent: { translationX: translateX, translationY: translateY } }], { useNativeDriver: true }
    )

    const y = new Animated.Value(0)
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
                <Image source={{ uri: movie.image_path }} style={styles.poster} />
                <Card.Content style={styles.cardContent}>
                    <View style={{ flexDirection: 'row', paddingRight: 16, alignItems: 'center' }}>
                        <Header style={{ flexGrow: 1, paddingRight: 16, }} fontSize={24} lineHeight={29}>{movie.title}</Header>
                        <Text style={styles.subtitle}>{movie.rating} ★</Text>
                    </View>
                    <Text style={[styles.subtitle, { marginTop: 4, }]}>{movie.certification !== "" ? movie.certification + "  ·  " : ""}{formatRuntime(movie.runtime)}  ·  {movie.date.toDate().getFullYear()}</Text>
                    <Text onPress={() => setExpandDesc(!expandDesc)} numberOfLines={!expandDesc ? 5 : null} style={styles.description}>{movie.summary}</Text>
                    <Header fontSize={24} lineHeight={29}>Genres</Header>
                    <View style={styles.genres}>
                        {movie.genres.map((genre, i) => (
                            <Chip key={i} style={styles.genre} textStyle={{ color: 'white' }}>{genre}</Chip>
                        ))}
                    </View>
                    <View style={styles.details}>
                        <Header style={{ marginBottom: 16, }} fontSize={20} lineHeight={24}>Director{movie.director.length > 1 && '(s)'}   <Text>{movie.director.map((e, i) => (i !== movie.director.length - 1 ? e + ", " : e))}</Text></Header>
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
            } else if (i === index) {
                return (
                    <PanGestureHandler key={i} onGestureEvent={handlePan} onHandlerStateChange={handleSwipe} >
                        <Animated.ScrollView style={[styles.card, { transform: [{ translateX }, { rotate }] }]} showsVerticalScrollIndicator={false}>
                            {displayCard(movie)}
                        </Animated.ScrollView>
                    </PanGestureHandler>
                );
            } else {
                return (
                    <Animated.ScrollView key={i} style={[styles.card, { opacity: i === index + 1 ? nextOpacity : 0, transform: [{ scale: nextScale }] }]}>
                        {displayCard(movie)}
                    </Animated.ScrollView>
                );
            }
        }).reverse();
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false} keyboardShouldPersistTaps="never">
            <View style={styles.container}>
                <Instructions showInstructions={showInstructions} />
                <View style={[styles.cardContainer, { display: showInstructions ? 'none' : 'flex' }]}>
                    {renderMovies()}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    cardContainer: {
        flexGrow: 1,
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
    subtitle: {
        fontSize: 14,
        lineHeight: 17,
    },
    description: {
        marginTop: 19,
        marginBottom: 32,
        fontSize: 16,
        lineHeight: 24,
    },
    genres: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
    },
    genre: {
        marginRight: 20,
        marginBottom: 8,
        backgroundColor: '#263238',
    },
    details: {
        marginTop: 24,
    }
});
