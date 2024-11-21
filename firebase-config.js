// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqZ52FUkyVPQM331l9MZhtuV_7Y3yNs88",
  authDomain: "car-price-tracker.firebaseapp.com",
  projectId: "car-price-tracker",
  storageBucket: "car-price-tracker.firebasestorage.app",
  messagingSenderId: "476121813597",
  appId: "1:476121813597:web:3ebd9493b1c29ffbb8b3b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firestore
export { db };
