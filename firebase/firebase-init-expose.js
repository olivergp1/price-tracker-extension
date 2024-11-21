try {
    // Expose Firebase to the global window
    window.firebase = firebase;
  
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyAqZ52FUkyVPQM331l9MZhtuV_7Y3yNs88",
      authDomain: "car-price-tracker.firebaseapp.com",
      projectId: "car-price-tracker",
      storageBucket: "car-price-tracker.appspot.com",
      messagingSenderId: "476121813597",
      appId: "1:476121813597:web:3ebd9493b1c29ffbb8b3b4",
    };
    firebase.initializeApp(firebaseConfig);
  
    console.log("Firebase initialized and exposed globally.");
  } catch (error) {
    console.error("Error exposing and initializing Firebase:", error);
  }
  