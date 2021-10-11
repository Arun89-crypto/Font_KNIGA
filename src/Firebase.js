import firebase from "firebase";

const app = firebase.initializeApp({
    apiKey: "AIzaSyBkb8tkrrS-GelNeAq1LQbOIKdPrU97yAE",
    authDomain: "font-kniga-890.firebaseapp.com",
    projectId: "font-kniga-890",
    storageBucket: "font-kniga-890.appspot.com",
    messagingSenderId: "498569939039",
    appId: "1:498569939039:web:0bd17b3f6e11a32402b3ea"
});



const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { auth, provider };