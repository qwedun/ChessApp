import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
    apiKey: "AIzaSyBg3j4RS9_XLYCcXBt0nHp80BetlJqPX6c",
    authDomain: "shiferchess-9a110.firebaseapp.com",
    projectId: "shiferchess-9a110",
    storageBucket: "shiferchess-9a110.appspot.com",
    messagingSenderId: "87779793548",
    appId: "1:87779793548:web:1d3763d98ae49e9e4539a9",
    measurementId: "G-RXTDHDYG5P",
});

export const db = getFirestore(app)