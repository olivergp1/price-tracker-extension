import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Function to fetch price tracker data from Firebase
async function fetchPriceData(advertId) {
  try {
    const docRef = doc(db, "adverts", advertId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log(`No data found for advert: ${advertId}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    return null;
  }
}

// Function to inject price tracker info into advert containers
async function injectPriceTracker() {
  const advertContainers = document.querySelectorAll("article.relative.flex");

  for (const container of advertContainers) {
    // Get the advert link (unique identifier)
    const linkTag = container.querySelector("a[href*='/car/']");
    if (!linkTag) continue;

    const advertId = linkTag.href.replaceAll("/", "_"); // Sanitize link for Firestore ID
    const priceData = await fetchPriceData(advertId);

    if (priceData) {
      const priceHistory = priceData.price_history
        .map(
          (entry) =>
            `<div>${entry.date}: <strong>${entry.price}</strong></div>`
        )
        .join("");

      // Inject the price history into the container
      const trackerDiv = document.createElement("div");
      trackerDiv.innerHTML = `
        <div style="border: 1px solid #ccc; padding: 8px; margin-top: 8px; font-size: 12px;">
          <strong>Price History:</strong>
          ${priceHistory}
        </div>
      `;

      container.appendChild(trackerDiv);
    }
  }
}

// Run the script when the page loads
window.addEventListener("load", injectPriceTracker);
