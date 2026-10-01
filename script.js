/* =========================================================
   OMikuji frame sequence
========================================================= */

/*
  EXACT sequence requested:

  1. No stick
  2. Stick 1
  3. Stick 2
  4. Stick 3

  These are image swaps. There is NO CSS-generated stick.
  Therefore the stick position/direction comes directly from
  your supplied PNG frames.
*/

const boxFrames = [
  "assets/Omikuji-box-no-stick.png",
  "assets/Omikuji-box-stick-1.png",
  "assets/Omikuji-box-stick-2.png",
  "assets/Omikuji-box-stick-3.png"
];


/* =========================================================
   Fortune images
========================================================= */

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


/* =========================================================
   Elements
========================================================= */

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


/* =========================================================
   State
========================================================= */

let isDrawing = false;
let usedFortunes = [];


/* =========================================================
   Helpers
========================================================= */

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
  if (!boxFrames[index]) return;

  boxImage.src = boxFrames[index];
}


/* =========================================================
   Fortune pool
   No repeat until all 9 have been used.
========================================================= */

function getNextFortune() {

  if (usedFortunes.length >= fortunes.length) {
    usedFortunes = [];
  }

  const available = fortunes.filter(
    file => !usedFortunes.includes(file)
  );

  const selected =
    available[Math.floor(Math.random() * available.length)];

  usedFortunes.push(selected);

  return selected;
}


/* =========================================================
   Box animation

   NO STICK
      ↓
   STICK 1
      ↓
   STICK 2
      ↓
   STICK 3
========================================================= */

async function playBoxAnimation() {

  // Always begin from the clean box.
  showBoxFrame(0);

  // Start shake.
  boxStage.classList.remove("shaking");

  // Force reflow so the animation restarts every draw.
  void boxStage.offsetWidth;

  boxStage.classList.add("shaking");

  /*
    Keep the box shaking before anything appears.
  */
  await wait(1500);


  /*
    STICK 1
  */
  drawMessage.textContent = "Something is coming out...";
  showBoxFrame(1);

  await wait(550);


  /*
    STICK 2
  */
  showBoxFrame(2);

  await wait(550);


  /*
    STICK 3
  */
  showBoxFrame(3);

  await wait(650);


  /*
    Finish.
  */
  boxStage.classList.remove("shaking");

}


/* =========================================================
   Draw fortune
========================================================= */

async function drawFortune() {

  if (isDrawing) return;

  isDrawing = true;
  drawButton.disabled = true;

  drawMessage.textContent = "Shaking the fortune box...";

  shareStatus.textContent = "";

  await playBoxAnimation();

  drawMessage.textContent = "Your fortune has been chosen.";

  await wait(400);

  const selectedFortune = getNextFortune();

  fortuneImage.src = selectedFortune;

  /*
    Re-trigger the fortune reveal animation.
  */
  fortuneImage.style.animation = "none";
  void fortuneImage.offsetWidth;
  fortuneImage.style.animation = "";

  drawScreen.classList.remove("active");
  fortuneScreen.classList.add("active");

  isDrawing = false;
  drawButton.disabled = false;
}


/* =========================================================
   Draw again
========================================================= */

function drawAgain() {

  if (isDrawing) return;

  fortuneScreen.classList.remove("active");
  drawScreen.classList.add("active");

  showBoxFrame(0);

  boxStage.classList.remove("shaking");

  drawMessage.textContent = "Your fortune is waiting.";

  shareStatus.textContent = "";
}


/* =========================================================
   Share
========================================================= */

async function shareFortune() {

  const shareData = {
    title: "My Omikuji Fortune",
    text: "I just drew my Omikuji fortune! 🎋✨",
    url: window.location.href
  };

  try {

    if (navigator.share) {

      await navigator.share(shareData);

      shareStatus.textContent =
        "Thanks for sharing your fortune! ✨";

      return;
    }

    if (navigator.clipboard) {

      await navigator.clipboard.writeText(
        window.location.href
      );

      shareStatus.textContent =
        "Link copied! Share it with your friends ✨";

      return;
    }

    throw new Error("Clipboard unavailable");

  } catch (error) {

    if (error && error.name === "AbortError") {
      return;
    }

    /*
      Older browser fallback.
    */
    const temp = document.createElement("textarea");

    temp.value = window.location.href;

    document.body.appendChild(temp);

    temp.select();

    document.execCommand("copy");

    temp.remove();

    shareStatus.textContent =
      "Link copied! Share it with your friends ✨";
  }
}


/* =========================================================
   Events
========================================================= */

drawButton.addEventListener(
  "click",
  drawFortune
);

againButton.addEventListener(
  "click",
  drawAgain
);

shareButton.addEventListener(
  "click",
  shareFortune
);


/* =========================================================
   Initial setup
========================================================= */

preloadImages(boxFrames);
preloadImages(fortunes);

showBoxFrame(0);
