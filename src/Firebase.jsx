// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore,collection} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS-X-qwfNkQhwS1cq_bC1Qm5xREcgdUwU",
  authDomain: "notes-app-8fad7.firebaseapp.com",
  projectId: "notes-app-8fad7",
  storageBucket: "notes-app-8fad7.appspot.com",
  messagingSenderId: "152245500762",
  appId: "1:152245500762:web:a814ee968f6f3b68009163",
  measurementId: "G-FFQL0BPCRY"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// The getAnalytics() method in Firebase Analytics is used to get a reference to the Firebase Analytics object. This object can then be used to log events, set user properties, and track user engagement.
const analytics = getAnalytics(app);
export const db = getFirestore(app); 
export const notescollection = collection(db,"notes"); //get a collection refference (documents) that refers to the collection at specified path.