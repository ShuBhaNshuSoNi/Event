import { db, auth } from './firebase-config.js';
import { collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function loadEvents() {
  const container = document.getElementById('eventContainer');
  if(!container) return;
  
  container.innerHTML = '';

  const snapshot = await getDocs(collection(db, 'events'));
  if(snapshot.empty) {
    container.innerHTML = '<p>No events available.</p>';
    return;
  }

  snapshot.forEach(eventDoc => {
    const data = eventDoc.data();
    const card = document.createElement('div');
    card.classList.add('event-card');
    card.innerHTML = `
      <h3>${data.name}</h3>
      <p>Date: ${data.date}</p>
      <p>Venue: ${data.venue}</p>
      <button>Register</button>
    `;
    
    card.querySelector('button').addEventListener('click', async () => {
      const user = auth.currentUser;
      if(!user) {
        alert('Please login to register.');
        window.location.href = 'login.html';
        return;
      }

      const registrationRef = doc(db, 'registrations', `${user.uid}_${eventDoc.id}`);
      await setDoc(registrationRef, { userId: user.uid, eventId: eventDoc.id, registeredAt: new Date() });
      alert('Successfully registered for the event!');
    });

    container.appendChild(card);
  });
}

window.addEventListener('load', loadEvents);
