import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
    apiKey: "AIzaSyB8xzUW6myu7aZxXaq2hLNqDYI7Pc_7yCo",
    authDomain: "shifer-f23c3.firebaseapp.com",
    projectId: "shifer-f23c3",
    storageBucket: "shifer-f23c3.appspot.com",
    messagingSenderId: "565807965636",
    appId: "1:565807965636:web:f3af08ac6d176a9018f091"
});

export const db = getFirestore(app)