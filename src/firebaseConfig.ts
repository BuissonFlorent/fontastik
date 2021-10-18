
// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
//import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAsafTlTVd7ydHXiy1gM-BWI7XPYAgcTm8",
    authDomain: "fontastik-9342d.firebaseapp.com",
    projectId: "fontastik-9342d",
    storageBucket: "fontastik-9342d.appspot.com",
    messagingSenderId: "282256343895",
    appId: "1:282256343895:web:6acafcee3279eb3be37412",
    measurementId: "G-7LQ5030JVS"
});

const firestoreDB = getFirestore(firebaseApp);
const cardsCollection = collection(firestoreDB, 'cards');
const usersCollection = collection(firestoreDB, 'users');
const reviewsCollection = collection(firestoreDB, 'reviews');

export { firestoreDB, cardsCollection, usersCollection, reviewsCollection }