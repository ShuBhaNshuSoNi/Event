import QRCode from "https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.esm.js";
import jsQR from "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js";

export async function generateQRCode(eventName, userId, canvasId){
  const data = `${eventName}::${userId}`;
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  await QRCode.toCanvas(canvas, data, { width: 200 });
}

export async function startScan(videoId){
  const video = document.getElementById(videoId);
  if(!video) return;

  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
  video.srcObject = stream;
  video.setAttribute("playsinline", true);
  video.play();

  const canvasElem = document.createElement('canvas');
  const ctx = canvasElem.getContext('2d');

  function scan(){
    if(video.readyState === video.HAVE_ENOUGH_DATA){
      canvasElem.height = video.videoHeight;
      canvasElem.width = video.videoWidth;
      ctx.drawImage(video, 0, 0, canvasElem.width, canvasElem.height);
      const imageData = ctx.getImageData(0, 0, canvasElem.width, canvasElem.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });
      if(code) {
        alert(`QR Code Data: ${code.data}`);
        video.srcObject.getTracks().forEach(track => track.stop());
        return;
      }
    }
    requestAnimationFrame(scan);
  }
  requestAnimationFrame(scan);
}
