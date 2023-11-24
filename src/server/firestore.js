import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
    apiKey: "AIzaSyCmn5OJEqEDkgVKg7V-wsMhqxqiZnm77i4",
    authDomain: "chess-c3ba4.firebaseapp.com",
    projectId: "chess-c3ba4",
    storageBucket: "chess-c3ba4.appspot.com",
    messagingSenderId: "836287158839",
    appId: "1:836287158839:web:b4689115bddb613fedbdb2",
    measurementId: "G-B8PWZTBWZW"
});

export const db = getFirestore(app)