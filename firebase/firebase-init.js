try {
    const firebaseConfig = {
      apiKey: "AIzaSyAqZ52FUkyVPQM331l9MZhtuV_7Y3yNs88",
      authDomain: "car-price-tracker.firebaseapp.com",
      projectId: "car-price-tracker",
      storageBucket: "car-price-tracker.appspot.com",
      messagingSenderId: "476121813597",
      appId: "1:476121813597:web:3ebd9493b1c29ffbb8b3b4",
    };
  
    firebase.initializeApp(firebaseConfig);
    window.firebase = firebase; // Expose Firebase globally for content.js
    console.log("Firebase initialized in the global context.");
  } catch (error) {
    console.error("Error initializing Firebase in the global context:", error);
  }
  