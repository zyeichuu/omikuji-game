/* =========================================================
   OMikuji box frame sequence
   The supplied PNGs contain the correct physical stick position.
========================================================= */

const boxFrames = [
  "assets/Omikuji-box-no-stick.png",
  "assets/Omikuji-box-stick-1.png",
  "assets/Omikuji-box-stick-2.png",
  "assets/Omikuji-box-stick-3.png"
];

const fortunes = [
  "assets/Excellent Fortune 1.png",
  "assets/Excellent Fortune 2.png",
  "assets/Fortune 1.png",
  "assets/Fortune 2.png",
  "assets/Future Fortune 1.png",
  "assets/Future Fortune 2.png",
  "assets/Good Fortune 1.png",
  "assets/Good Fortune 2.png",
  "assets/Small Fortune 1.png"
];

const boxStage = document.getElementById("boxStage");
const boxImage = document.getElementById("boxImage");
const drawButton = document.getElementById("drawButton");
const drawMessage = document.getElementById("drawMessage");
const drawScreen = document.getElementById("drawScreen");
const fortuneScreen = document.getElementById("fortuneScreen");
const fortuneImage = document.getElementById("fortuneImage");
const shareButton = document.getElementById("shareButton");
const againButton = document.getElementById("againButton");
const shareStatus = document.getElementById("shareStatus");

const shareModal = document.getElementById("shareModal");
const closeShareModal = document.getElementById("closeShareModal");
const shareFortuneText = document.getElementById("shareFortuneText");
const nativeShareButton = document.getElementById("nativeShareButton");
const whatsappShare = document.getElementById("whatsappShare");
const facebookShare = document.getElementById("facebookShare");
const xShare = document.getElementById("xShare");
const telegramShare = document.getElementById("telegramShare");
const copyShare = document.getElementById("copyShare");

let isDrawing = false;
let usedFortunes = [];
let currentFortune = "";

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function preloadImages(list) {
  list.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

function showBoxFrame(index) {
  if (boxFrames[index]) boxImage.src = boxFrames[index];
}

function getNextFortune() {
  if (usedFortunes.length >= fortunes.length) usedFortunes = [];

  const available = fortunes.filter(file => !usedFortunes.includes(file));
  const selected = available[Math.floor(Math.random() * available.length)];
  usedFortunes.push(selected);
  return selected;
}

function getFortuneName(file) {
  const name = file.split("/").pop().replace(/\.png$/i, "");

  if (name.startsWith("Excellent Fortune")) return "Excellent Fortune";
  if (name.startsWith("Future Fortune")) return "Future Fortune";
  if (name.startsWith("Good Fortune")) return "Good Fortune";
  if (name.startsWith("Small Fortune")) return "Small Fortune";
  if (name.startsWith("Fortune")) return "Good Fortune";

  return "My Omikuji Fortune";
}

function getShareMessage() {
  return `I just drew my fortune from the HOKTO Mushroom New Year Omikuji! 🍄✨ Try yours too!`;
}

function getShareUrl() {
  return window.location.href;
}

async function playBoxAnimation() {
  showBoxFrame(0);
  boxStage.classList.remove("shaking");
  void boxStage.offsetWidth;
  boxStage.classList.add("shaking");

  await wait(1500);

  drawMessage.textContent = "Something is coming out...";
  showBoxFrame(1);
  await wait(550);

  showBoxFrame(2);
  await wait(550);

  showBoxFrame(3);
  await wait(650);

  boxStage.classList.remove("shaking");
}

async function drawFortune() {
  if (isDrawing) return;

  isDrawing = true;
  drawButton.disabled = true;
  drawMessage.textContent = "Shaking the fortune box...";
  shareStatus.textContent = "";

  await playBoxAnimation();

  drawMessage.textContent = "Your fortune has been chosen.";
  await wait(400);

  currentFortune = getNextFortune();
  fortuneImage.src = currentFortune;

  fortuneImage.style.animation = "none";
  void fortuneImage.offsetWidth;
  fortuneImage.style.animation = "";

  drawScreen.classList.remove("active");
  fortuneScreen.classList.add("active");

  isDrawing = false;
  drawButton.disabled = false;
}

function drawAgain() {
  if (isDrawing) return;

  closeShare();
  fortuneScreen.classList.remove("active");
  drawScreen.classList.add("active");
  showBoxFrame(0);
  boxStage.classList.remove("shaking");
  drawMessage.textContent = "Your fortune is waiting.";
  shareStatus.textContent = "";
}

function openShare() {
  shareFortuneText.textContent = getShareMessage();
  shareModal.classList.add("active");
  shareModal.setAttribute("aria-hidden", "false");
}

function closeShare() {
  shareModal.classList.remove("active");
  shareModal.setAttribute("aria-hidden", "true");
}

function shareToWhatsApp() {
  const text = `${getShareMessage()}\n\n${getShareUrl()}`;
  const url = "https://wa.me/?text=" + encodeURIComponent(text);
  window.open(url, "_blank", "noopener,noreferrer");
}

function shareToFacebook() {
  const url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(getShareUrl());
  window.open(url, "_blank", "width=600,height=500,noopener,noreferrer");
}

function shareToX() {
  const url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(getShareMessage()) + "&url=" + encodeURIComponent(getShareUrl());
  window.open(url, "_blank", "width=600,height=500,noopener,noreferrer");
}

function shareToTelegram() {
  const url = "https://t.me/share/url?url=" + encodeURIComponent(getShareUrl()) + "&text=" + encodeURIComponent(getShareMessage());
  window.open(url, "_blank", "noopener,noreferrer");
}

async function copyShareLink() {
  const text = `${getShareMessage()}\n\n${getShareUrl()}`;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const temp = document.createElement("textarea");
      temp.value = text;
      temp.style.position = "fixed";
      temp.style.opacity = "0";
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      temp.remove();
    }

    shareStatus.textContent = "Copied! You can now paste your fortune anywhere ✨";
    closeShare();
  } catch (error) {
    shareStatus.textContent = "Please copy the link from your browser to share it.";
  }
}

async function nativeShare() {
  const message = getShareMessage();

  try {
    if (navigator.share) {
      await navigator.share({
        title: "My Omikuji Fortune",
        text: message,
        url: getShareUrl()
      });
      shareStatus.textContent = "Thanks for sharing your fortune! ✨";
      closeShare();
      return;
    }

    shareStatus.textContent = "Choose a social platform below ✨";
  } catch (error) {
    if (error && error.name === "AbortError") return;
    shareStatus.textContent = "Choose a social platform below ✨";
  }
}

shareButton.addEventListener("click", openShare);
closeShareModal.addEventListener("click", closeShare);
whatsappShare.addEventListener("click", shareToWhatsApp);
facebookShare.addEventListener("click", shareToFacebook);
xShare.addEventListener("click", shareToX);
telegramShare.addEventListener("click", shareToTelegram);
copyShare.addEventListener("click", copyShareLink);
nativeShareButton.addEventListener("click", nativeShare);

shareModal.addEventListener("click", event => {
  if (event.target === shareModal) closeShare();
});

drawButton.addEventListener("click", drawFortune);
againButton.addEventListener("click", drawAgain);

preloadImages(boxFrames);
preloadImages(fortunes);
showBoxFrame(0);
