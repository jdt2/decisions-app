import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
//import {...} from "firebase/database";
import { getFirestore, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { discoverMovies, getGenres } from './api';
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB4NQG2KTbDsNC53Tp4Mkr_y2gEroFMYDc",
    authDomain: "decisions-app-7c365.firebaseapp.com",
    projectId: "decisions-app-7c365",
    storageBucket: "decisions-app-7c365.appspot.com",
    messagingSenderId: "452006317082",
    appId: "1:452006317082:web:82cec71842f8a92da095a3",
    measurementId: "G-DDW9XKMDXP"
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();

export const invalidEmail = ["auth/internal-error", "auth/invalid-credential", "auth/invalid-email"]
export const invalidPassword = ["auth/internal-error", "auth/invalid-credential", "auth/invalid-password", "auth/wrong-password"]

export const isLoggedIn = () => {
    console.log(auth);
    const user = auth.currentUser;
    if (user) {
        return true;
    }
    return false;
}

export const signInWithEmail = async (email, password) => {
    try {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        const user = credential.user;
        await setDoc(doc(firestore, "players", user.uid), {
            name: user.displayName,
            moviesWatched: [],
        })
        return null;
    } catch (e) {
        console.error(e);
        return e;
    }
}

export const signUpWithEmail = async (email, password) => {
    try {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        const user = credential.user;
        await setDoc(doc(firestore, "players", user.uid), {
            name: user.displayName,
            moviesWatched: [],
        })
        return null;
    } catch (e) {
        console.error(e);
        return e;
    }
}

const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const createRoom = async () => {
    if (!isLoggedIn()) return;
    try {
        let roomExists = true;
        let roomCode = generateCode();
        while (roomExists) {
            const roomSnap = await getDoc(doc(firestore, "games", roomCode));
            if (!roomSnap.exists()) {
                roomExists = false;
            } else {
                roomCode = generateCode();
            }
        }
        console.log(roomCode);
        await setDoc(doc(firestore, "games", roomCode), {
            finalDecision: "",
            state: "Creating",
            movies: [],
            players: [],
            hostID: auth.currentUser.uid,
        })
        await AsyncStorage.setItem("roomCode", roomCode);
    } catch (e) {
        console.error(e);
    }
}

const parseMovies = async (data) => {
    let results = await Promise.all(data.results.map(async (e, i) => ({
        id: e.id,
        title: e.title,
        summary: e.overview,
        rating: e.vote_average,
        adult: e.adult,
        date: new Date(e.release_date),
        image_path: e.poster_path && `https://image.tmdb.org/t/p/original${e.poster_path}`,
        genres: await getGenres(e.genre_ids),
    })));
    return results;
}

// TODO: add preferences
export const addMoviesToRoom = async () => {
    if (!isLoggedIn()) return;
    const roomCode = await AsyncStorage.getItem("roomCode");
    if (!roomCode) return;
    try {
        const movies = await parseMovies(await discoverMovies());
        updateDoc(doc(firestore, "games", roomCode), {
            state: "Ready",
            movies,
        })
    } catch (e) {
        console.error(e);
    }
}

export const getMovies = async () => {
    if (!isLoggedIn()) return;
    const roomCode = await AsyncStorage.getItem("roomCode");
    if (!roomCode) return;
    try {
        return (await getDoc(doc(firestore, "games", roomCode))).data().movies;
    } catch (e) {
        console.error(e);
    }
}