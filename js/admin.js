import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function countCollectionDocs(collectionName) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.size;
}

async function updateDashboardStats() {
  try {
    const userCount = await countCollectionDocs('users');
    const eventCount = await countCollectionDocs('events');
    const registrationCount = await countCollectionDocs('registrations');
    const certificateCount = await countCollectionDocs('certificates');

    document.getElementById('userCount').innerText = userCount;
    document.getElementById('eventCount').innerText = eventCount;
    document.getElementById('registrationCount').innerText = registrationCount;
    document.getElementById('certificateCount').innerText = certificateCount;
  } catch (err) {
    console.error("Error loading dashboard stats: ", err);
    alert("Failed to load dashboard data!");
  }
}

window.addEventListener('load', () => {
  updateDashboardStats();
});

