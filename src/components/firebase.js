import firebase from "firebase/app";
import "firebase/auth";
export const auth = firebase.initializeApp({
    apiKey: "AIzaSyAewehZWGu-c2UFjvuavlJ6ZX_RlT4nm54",
    authDomain: "chatapp-8b0de.firebaseapp.com",
    projectId: "chatapp-8b0de",
    storageBucket: "chatapp-8b0de.appspot.com",
    messagingSenderId: "435374227768",
    appId: "1:435374227768:web:a7fba0668dc88677dd81cd"
}).auth();