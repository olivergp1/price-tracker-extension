import { initializeApp } from "./firebase/firebase-app.js";
import { getFirestore, doc, getDoc } from "./firebase/firebase-firestore.js";

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
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  console.log("Firebase initialized successfully.");

  // Example function to fetch Firestore data
  async function fetchAdvertData(advertId) {
    const docRef = doc(db, "adverts", advertId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(`Advert ${advertId} data:`, docSnap.data());
    } else {
      console.log(`No data found for advert ID: ${advertId}`);
    }
  }

  // Automatically detect advert IDs and fetch their data
  const advertContainers = document.querySelectorAll("[data-advert-id]");

  advertContainers.forEach((container) => {
    const advertId = container.getAttribute("data-advert-id");
    console.log(`Fetching data for advert ID: ${advertId}`);
    fetchAdvertData(advertId)
      .then((data) => console.log(`Data fetched successfully for ${advertId}`))
      .catch((error) =>
        console.error(`Error fetching data for advert ID: ${advertId}`, error)
      );
  });
} catch (error) {
  console.error("Error initializing Firebase or interacting with Firestore:", error);
}
