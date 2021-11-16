import React from 'react';
import { StyleSheet, View, ScrollView, Image, Animated, Dimensions, PanResponder } from 'react-native';
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
        return `${Math.floor(runtime / 60)}h ${runtime % 60}m   ·  `;
    } else if (runtime === 0) {
        return "";
    } else {
        return `${runtime} m  ·  `;
    }

}

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function RoomSwipe({ navigation, route }) {

    const [movies, setMovies] = React.useState([]);
    const [index, setIndex] = React.useState(0);
    const [expandDesc, setExpandDesc] = React.useState(false);
    const [_ignoreRegion, setIgnoreRegion] = React.useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    });
    const translateX = new Animated.Value(0)
    const translateY = new Animated.Value(0)

    React.useEffect(() => {
        const retrieveMovies = async () => {
            const retrieved = await getMovies();
            setMovies(retrieved);
        }
        retrieveMovies();
    }, [])

    const nextOpacity = translateX.interpolate({ inputRange: [-windowWidth, 0, windowWidth], outputRange: [1, 0, 1], extrapolate: 'clamp' })
    const nextScale = translateX.interpolate({ inputRange: [-windowWidth, 0, windowWidth], outputRange: [1, 0.8, 1], extrapolate: 'clamp' })

    const rotate = translateX.interpolate({
        inputRange: [-windowWidth, 0, windowWidth],
        outputRange: [`-30deg`, `0deg`, `30deg`],
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

    const _onLayout = ({
        nativeEvent
    }) => {
        setIgnoreRegion(nativeEvent.layout);
    };

    const _isInsideRegion = (x, y, region) => {
        return x >= region.x && x <= region.x + region.width && y >= region.y && y <= region.y + region.height;
    }

    const SwipePanResponder = PanResponder.create({
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
            if (_isInsideRegion(evt.nativeEvent.pageX, evt.nativeEvent.pageY, _ignoreRegion) &&
                (gestureState.dx < 20 && gestureState.dx > -20)) {
                reset.start();
                return false;
            } else {
                return true;
            }
        },
        onPanResponderMove: (evt, gestureState) => {
            translateX.setValue(gestureState.dx);
            translateY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dx > 120) {
                Animated.timing(translateX, {
                    toValue: windowWidth + 50,
                    duration: 100,
                    useNativeDriver: true,
                }).start(() => {
                    setIndex(index + 1);
                    setExpandDesc(false);
                    translateX.setValue(0);
                    translateY.setValue(0);
                })
            }
            else if (gestureState.dx < -120) {
                Animated.timing(translateX, {
                    toValue: -windowWidth - 50,
                    duration: 100,
                    useNativeDriver: true,
                }).start(() => {
                    setIndex(index + 1);
                    setExpandDesc(false);
                    translateX.setValue(0);
                    translateY.setValue(0);
                })
            }
            else {
                reset.start()
            }
        }
    })

    const displayCard = (movie) => {
        return (
            <ScrollView onLayout={_onLayout} showsVerticalScrollIndicator={false}>
                <Card elevation={5} style={styles.innerCard}>
                    <Card.Cover source={{ uri: movie.image_path }} style={styles.poster} />
                    <Card.Content style={styles.cardContent}>
                        <View style={{ flexDirection: 'row', paddingRight: 16, alignItems: 'center' }}>
                            <Header style={{ flexGrow: 1, paddingRight: 16, }} fontSize={24} lineHeight={29}>{movie.title}</Header>
                            <Text style={styles.subtitle}>{movie.rating} ★</Text>
                        </View>
                        <Text style={[styles.subtitle, { marginTop: 4, }]}>{movie.certification !== "" ? movie.certification + "  ·  " : ""}{formatRuntime(movie.runtime)}{movie.date.toDate().getFullYear()}</Text>
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
            </ScrollView>
        );
    }

    const renderMovies = () => {
        return movies.map((movie, i) => {
            if (i < index) {
                return null;
            } else if (i === index) {
                return (
                    <Animated.View key={i} {...SwipePanResponder.panHandlers} style={[styles.card, { transform: [{ translateX }, { rotate }] }]}>
                        {displayCard(movie)}
                    </Animated.View>
                );
            } else {
                return (
                    <Animated.View key={i} style={[styles.card, { opacity: i === index + 1 ? nextOpacity : 0, transform: [{ scale: nextScale }] }]}>
                        {displayCard(movie)}
                    </Animated.View>
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
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    card: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    innerCard: {
        height: "100%",
        marginHorizontal: 8,
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
