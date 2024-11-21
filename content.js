// Firebase configuration (make sure firebase-config.js is correctly set up and loaded)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Firebase initialization
const firebaseConfig = {
  apiKey: "AIzaSyAqZ52FUkyVPQM331l9MZhtuV_7Y3yNs88",
  authDomain: "car-price-tracker.firebaseapp.com",
  projectId: "car-price-tracker",
  storageBucket: "car-price-tracker.appspot.com",
  messagingSenderId: "476121813597",
  appId: "1:476121813597:web:3ebd9493b1c29ffbb8b3b4"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Inject price tracker data into advert containers
document.querySelectorAll("article.relative.flex").forEach(async (container) => {
  const link = container.querySelector("a[href]").href;
  const id = link.replace(/\//g, "_") + "_" + String(hashCode(link));

  const docRef = doc(db, "adverts", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const trackerInfo = document.createElement("div");
    trackerInfo.innerHTML = `
      <p><strong>Advertised:</strong> ${data.advertised_date}</p>
      ${data.price_history.map(
        (history) =>
          `<p>${history.date}: £${history.price}</p>`
      ).join("")}
    `;
    container.appendChild(trackerInfo);
  }
});

function hashCode(str) {
  return str.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
}
