import { db, auth } from './firebase-config.js';
import { collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function loadEvents() {
  const container = document.getElementById('eventContainer');
  if(!container) return;
  container.innerHTML = '';

  const snapshot = await getDocs(collection(db, 'events'));
  if(snapshot.empty){
    container.innerHTML = '<p>No events found.</p>';
    return;
  }
  snapshot.forEach(eventDoc => {
    const data = eventDoc.data();
    const card = document.createElement('div');
    card.classList.add('event-card');
    card.innerHTML = `
      <h3>${data.name}</h3>
      <p><strong>Date:</strong> ${data.date}</p>
      <p><strong>Venue:</strong> ${data.venue}</p>
      <button>Register</button>
    `;
    const btn = card.querySelector('button');
    btn.addEventListener('click', async () => {
      const user = auth.currentUser;
      if(!user) {
        alert("Please login first!");
        window.location.href = 'login.html';
        return;
      }
      // Save registration in Firestore under user-events collection or registrations
      const regRef = doc(db, 'registrations', `${user.uid}_${eventDoc.id}`);
      await setDoc(regRef, {
        userId: user.uid,
        eventId: eventDoc.id,
        registeredAt: new Date()
      });
      alert('Registered successfully!');
    });
    container.appendChild(card);
  });
}

window.addEventListener('load', loadEvents);

