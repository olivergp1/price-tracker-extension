// Import Firebase modules from the locally installed Firebase package
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

console.log("Content script loaded...");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqZ52FUkyVPQM331l9MZhtuV_7Y3yNs88",
  authDomain: "car-price-tracker.firebaseapp.com",
  projectId: "car-price-tracker",
  storageBucket: "car-price-tracker.appspot.com",
  messagingSenderId: "476121813597",
  appId: "1:476121813597:web:3ebd9493b1c29ffbb8b3b4",
};

try {
  console.log("Initializing Firebase...");
  const app = initializeApp(firebaseConfig); // Initialize Firebase app
  const db = getFirestore(app); // Get Firestore instance
  console.log("Firebase initialized successfully.");

  // Example: Fetching data for an advert ID
  const advertId = "example-advert-id"; // Replace with real advert ID from your logic
  const docRef = doc(db, "adverts", advertId);
  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Advert data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.error("Error fetching document:", error);
    });
} catch (error) {
  console.error("Error initializing Firebase:", error);
}
