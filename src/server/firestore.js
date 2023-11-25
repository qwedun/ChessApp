import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
    apiKey: "AIzaSyCaBe7k8nmZOKjOv_LMlz9z_Z9HGkqy_L0",
    authDomain: "shiferchess.firebaseapp.com",
    projectId: "shiferchess",
    storageBucket: "shiferchess.appspot.com",
    messagingSenderId: "329711495771",
    appId: "1:329711495771:web:c3a036bc06b238ca0f2d7e"
});

export const db = getFirestore(app)