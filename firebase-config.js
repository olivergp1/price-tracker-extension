// Import Firebase scripts for use in service workers
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore-compat.js");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqZ52FUkyVPQM331l9MZhtuV_7Y3yNs88",
  authDomain: "car-price-tracker.firebaseapp.com",
  projectId: "car-price-tracker",
  storageBucket: "car-price-tracker.appspot.com",
  messagingSenderId: "476121813597",
  appId: "1:476121813597:web:3ebd9493b1c29ffbb8b3b4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Access Firestore
const db = firebase.firestore();

// Log initialization to verify the service worker works
console.log("Firebase service worker initialized!");
