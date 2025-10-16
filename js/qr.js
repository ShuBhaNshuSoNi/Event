import QRCode from "https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.esm.js";
import jsQR from "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js";

export async function generateQRCode(eventId, userId){
  const canvas = document.getElementById('qrCanvas');
  if(!canvas) return;
  await QRCode.toCanvas(canvas, `${eventId}:${userId}`, { width: 200 });
}

export async function startScan(videoId){
  const video = document.getElementById(videoId);
  if(!video) return;
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
  video.srcObject = stream;
  video.setAttribute("playsinline", true);
  video.play();

  const canvasElement = document.createElement('canvas');
  const canvas = canvasElement.getContext('2d');

  function scan() {
    if(video.readyState === video.HAVE_ENOUGH_DATA){
      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });
      if(code){
        alert(`QR Code Data: ${code.data}`);
        video.srcObject.getTracks().forEach(track => track.stop());
        return;
      }
    }
    requestAnimationFrame(scan);
  }
  requestAnimationFrame(scan);
}

