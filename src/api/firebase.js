import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
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