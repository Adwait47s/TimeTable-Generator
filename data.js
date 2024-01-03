// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCf148QkxNPvYilC_xZKKvgHnwejCmxSaA",
    authDomain: "t-generator-fedcb.firebaseapp.com",
    databaseURL: "https://t-generator-fedcb-default-rtdb.firebaseio.com",
    projectId: "t-generator-fedcb",
    storageBucket: "t-generator-fedcb.appspot.com",
    messagingSenderId: "587493551359",
    appId: "1:587493551359:web:8a06ef0e2ee2e1b7ee70ca",
    measurementId: "G-25DYLEL9H3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);