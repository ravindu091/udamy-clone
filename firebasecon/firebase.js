import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC8BfPe60uBDHllxnMnKjKcFtUvyqsqvE",
  authDomain: "rd-learn-01.firebaseapp.com",
  databaseURL: "https://rd-learn-01-default-rtdb.firebaseio.com",
  projectId: "rd-learn-01",
  storageBucket: "rd-learn-01.appspot.com",
  messagingSenderId: "836629640713",
  appId: "1:836629640713:web:c40acbe2bf8812f775ead8",
  measurementId: "G-M1SSVYZBZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

