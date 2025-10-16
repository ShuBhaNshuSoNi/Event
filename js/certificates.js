import html2canvas from "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
import { storage, db } from "./firebase-config.js";
import { ref, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function generateCertificate(userId, eventName) {
  const certDiv = document.getElementById('certificate');
  if(!certDiv) return;
  const canvas = await html2canvas(certDiv);
  const imgData = canvas.toDataURL('image/png');

  const storageRef = ref(storage, `certificates/${userId}_${eventName}.png`);
  await uploadString(storageRef, imgData, 'data_url');
  const url = await getDownloadURL(storageRef);

  await setDoc(doc(db, 'certificates', `${userId}_${eventName}`), {
    userId,
    eventName,
    date: new Date().toISOString(),
    imageUrl: url
  });
  alert("Certificate generated and uploaded!");
}

