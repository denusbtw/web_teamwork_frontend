import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsSQKBeVYXod6IA9LnJESlNDbYiiIT5zY",
    authDomain: "webteamwork.firebaseapp.com",
    projectId: "webteamwork",
    storageBucket: "webteamwork.firebasestorage.app",
    messagingSenderId: "954875073944",
    appId: "1:954875073944:web:d1d907560002d8965187ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);