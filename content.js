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
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  console.log("Firebase initialized successfully.");

  // Inject price tracker data into advert containers
  document.querySelectorAll("article.relative.flex").forEach(async (container) => {
    const linkElement = container.querySelector("a[href]");
    if (!linkElement) {
      console.log("No link element found in advert container...");
      return;
    }

    const link = linkElement.href;
    const id = link.replace(/\//g, "_") + "_" + String(hashCode(link));

    console.log(`Fetching data for advert ID: ${id}`);

    try {
      const docRef = doc(db, "adverts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(`Found data for advert ID: ${id}`, data);

        const trackerInfo = document.createElement("div");
        trackerInfo.innerHTML = `
          <p><strong>Advertised:</strong> ${data.advertised_date}</p>
          ${data.price_history
            .map((history) => `<p>${history.date}: ${history.price}</p>`)
            .join("")}
        `;
        trackerInfo.style.marginTop = "10px";
        trackerInfo.style.color = "black";
        container.appendChild(trackerInfo);
      } else {
        console.log(`No data found for advert ID: ${id}`);
      }
    } catch (error) {
      console.error(`Error fetching data for advert ID: ${id}`, error);
    }
  });
} catch (error) {
  console.error("Error initializing Firebase or interacting with Firestore:", error);
}

// Helper function to hash string
function hashCode(str) {
  return str.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
}
