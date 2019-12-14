import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBEzCxrL4C-vNvweWrwRC7_wy8DUyZEVlU",
   authDomain: "hola-bella-adbaa.firebaseapp.com",
   databaseURL: "https://hola-bella-adbaa.firebaseio.com",
   projectId: "hola-bella-adbaa",
   storageBucket: "hola-bella-adbaa.appspot.com",
   messagingSenderId: "261092169074",
   appId: "1:261092169074:web:a0c72ab0794fbe039bb9eb",
   measurementId: "G-Y03YJTMHJK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.functions();

export default firebase;
