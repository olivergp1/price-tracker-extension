(() => {
  // content.js
  console.log("Content script loaded...");
  var firebaseAppScript = "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  var firebaseFirestoreScript = "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.type = "text/javascript";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  async function initializeFirebase() {
    console.log("Loading Firebase SDK...");
    await loadScript(firebaseAppScript);
    await loadScript(firebaseFirestoreScript);
    console.log("Initializing Firebase...");
    const firebaseConfig = {
      apiKey: "AIzaSyAqZ52FUkyVPQM331l9MZhtuV_7Y3yNs88",
      authDomain: "car-price-tracker.firebaseapp.com",
      projectId: "car-price-tracker",
      storageBucket: "car-price-tracker.appspot.com",
      messagingSenderId: "476121813597",
      appId: "1:476121813597:web:3ebd9493b1c29ffbb8b3b4"
    };
    const app = firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore(app);
    console.log("Firebase initialized successfully.");
    async function fetchAdvertData(advertId) {
      const docRef = db.collection("adverts").doc(advertId);
      const docSnap = await docRef.get();
      if (docSnap.exists) {
        console.log(`Advert ${advertId} data:`, docSnap.data());
      } else {
        console.log(`No data found for advert ID: ${advertId}`);
      }
    }
    const advertContainers = document.querySelectorAll("[data-advert-id]");
    advertContainers.forEach((container) => {
      const advertId = container.getAttribute("data-advert-id");
      console.log(`Fetching data for advert ID: ${advertId}`);
      fetchAdvertData(advertId).catch(
        (error) => console.error(`Error fetching data for advert ID: ${advertId}`, error)
      );
    });
  }
  initializeFirebase().catch((error) => {
    console.error("Error initializing Firebase or interacting with Firestore:", error);
  });
})();
