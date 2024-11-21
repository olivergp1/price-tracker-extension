console.log("Content script loaded...");

try {
  // Log and load Firebase libraries from the local `firebase` folder
  console.log("Testing chrome.runtime.getURL in content.js context...");
  console.log("App script URL:", chrome.runtime.getURL("firebase/firebase-app-compat.js"));
  console.log("Firestore script URL:", chrome.runtime.getURL("firebase/firebase-firestore-compat.js"));

  // Inject Firebase libraries into the page's global context
  const scriptApp = document.createElement("script");
  scriptApp.src = chrome.runtime.getURL("firebase/firebase-app-compat.js");
  document.head.appendChild(scriptApp);
  console.log("App script injected successfully:", scriptApp.src);

  const scriptFirestore = document.createElement("script");
  scriptFirestore.src = chrome.runtime.getURL("firebase/firebase-firestore-compat.js");
  document.head.appendChild(scriptFirestore);
  console.log("Firestore script injected successfully:", scriptFirestore.src);

  // Inject Firebase initialization script after the libraries are loaded
  scriptFirestore.onload = function () {
    console.log("Firebase libraries loaded...");

    const initScript = document.createElement("script");
    initScript.src = chrome.runtime.getURL("firebase-init.js");
    document.head.appendChild(initScript);
    console.log("Firebase initialization script injected successfully:", initScript.src);
  };

  // Wait for Firebase to be ready before interacting with it
  window.addEventListener("firebaseReady", async () => {
    console.log("Firebase is ready for use in content.js...");

    const db = firebase.firestore();

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
        const docRef = db.collection("adverts").doc(id);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
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
  });
} catch (error) {
  console.error("Error loading Firebase scripts or initializing Firebase:", error);
}

// Helper function to hash string
function hashCode(str) {
  return str.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
}
