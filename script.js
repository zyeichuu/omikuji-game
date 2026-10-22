(() => {
  const ASSET = 'assets/';
  const boxStage = document.getElementById('boxStage');
  const boxImage = document.getElementById('boxImage');
  const drawButton = document.getElementById('drawButton');
  const statusText = document.getElementById('statusText');
  const drawScreen = document.getElementById('drawScreen');
  const resultScreen = document.getElementById('resultScreen');
  const fortuneImage = document.getElementById('fortuneImage');
  const drawAgainButton = document.getElementById('drawAgainButton');
  const openShareButton = document.getElementById('openShareButton');
  const shareModal = document.getElementById('shareModal');
  const closeShareButton = document.getElementById('closeShareButton');
  const shareFeedback = document.getElementById('shareFeedback');
  const resultStatus = document.getElementById('resultStatus');

  // Keep these names matched to the PNG filenames in your existing assets folder.
  const boxFrames = [
    'Omikuji-box-no-stick.png',
    'Omikuji-box-stick-1.png',
    'Omikuji-box-stick-2.png',
    'Omikuji-box-stick-3.png'
  ];
  const fortunes = [
    'Excellent Fortune 1.png', 'Excellent Fortune 2.png',
    'Good Fortune 1.png', 'Good Fortune 2.png',
    'Small Fortune 1.png', 'Fortune 1.png', 'Fortune 2.png',
    'Future Fortune 1.png', 'Future Fortune 2.png'
  ];
  let availableFortunes = [];
  let currentFortune = '';
  let isDrawing = false;

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  function nextFortune() {
    if (!availableFortunes.length) availableFortunes = shuffle(fortunes);
    return availableFortunes.pop();
  }
  function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
  function setBoxFrame(filename) {
    return new Promise(resolve => {
      boxImage.onload = () => resolve();
      boxImage.onerror = () => resolve();
      boxImage.src = ASSET + filename;
      if (boxImage.complete) resolve();
    });
  }

  async function drawFortune() {
    if (isDrawing) return;
    isDrawing = true;
    drawButton.disabled = true;
    boxStage.classList.remove('reveal');
    boxStage.classList.add('shaking');
    statusText.textContent = 'The box is shaking...';
    drawScreen.hidden = false;
    resultScreen.hidden = true;
    shareModal.hidden = true;
    await setBoxFrame(boxFrames[0]);
    await wait(650);
    // Show the combined box-and-stick frames in sequence so the stick appears to emerge from the hole.
    for (let i = 1; i < boxFrames.length; i++) {
      await setBoxFrame(boxFrames[i]);
      await wait(360);
    }
    boxStage.classList.remove('shaking');
    boxStage.classList.add('reveal');
    statusText.textContent = 'Your fortune has been chosen!';
    await wait(500);
    currentFortune = nextFortune();
    fortuneImage.alt = 'Your Omikuji fortune';
    fortuneImage.src = ASSET + currentFortune;
    fortuneImage.onerror = () => {
      resultStatus.textContent = 'Could not find ' + currentFortune + '. Check that the filename in the assets folder matches exactly.';
    };
    resultStatus.textContent = '';
    drawScreen.hidden = true;
    resultScreen.hidden = false;
    isDrawing = false;
    drawButton.disabled = false;
  }

  function getShareMessage() {
    // Deliberately generic: no fortune or asset filename is included.
    return 'I just drew my fortune from the HOKTO Mushroom New Year Omikuji! 🍄✨ Try yours too!';
  }
  function getPageUrl() { return window.location.href.split('#')[0]; }
  function openShareWindow(url) { window.open(url, '_blank', 'noopener,noreferrer'); }

  async function shareInstagram() {
    const message = getShareMessage();
    // Native share sheet on supported mobile browsers; Instagram does not provide a universal web share URL.
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Omikuji Fortune', text: message, url: getPageUrl() });
      } catch (err) {
        if (err && err.name !== 'AbortError') shareFeedback.textContent = 'Take a screenshot of your fortune and share it on Instagram Stories or your feed.';
      }
    } else {
      shareFeedback.textContent = 'Take a screenshot of your fortune and upload it to Instagram Stories or your feed.';
    }
  }
  function shareWhatsApp() {
    openShareWindow('https://wa.me/?text=' + encodeURIComponent(getShareMessage() + '\n' + getPageUrl()));
  }
  function shareFacebook() {
    openShareWindow('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(getPageUrl()));
  }
  function shareX() {
    openShareWindow('https://twitter.com/intent/tweet?text=' + encodeURIComponent(getShareMessage()) + '&url=' + encodeURIComponent(getPageUrl()));
  }
  function shareTelegram() {
    openShareWindow('https://t.me/share/url?url=' + encodeURIComponent(getPageUrl()) + '&text=' + encodeURIComponent(getShareMessage()));
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getPageUrl());
      shareFeedback.textContent = 'Link copied! Share it with your friends ✨';
    } catch (_) {
      window.prompt('Copy your Omikuji game link:', getPageUrl());
    }
  }
  function openShare() {
    shareFeedback.textContent = '';
    shareModal.hidden = false;
    closeShareButton.focus();
  }
  function closeShare() { shareModal.hidden = true; openShareButton.focus(); }

  drawButton.addEventListener('click', drawFortune);
  drawAgainButton.addEventListener('click', () => {
    resultScreen.hidden = true;
    drawScreen.hidden = false;
    boxStage.classList.remove('shaking', 'reveal');
    statusText.textContent = 'Your fortune is waiting.';
    setBoxFrame(boxFrames[0]);
  });
  openShareButton.addEventListener('click', openShare);
  closeShareButton.addEventListener('click', closeShare);
  shareModal.addEventListener('click', event => { if (event.target === shareModal) closeShare(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !shareModal.hidden) closeShare(); });
  document.getElementById('instagramShare').addEventListener('click', shareInstagram);
  document.getElementById('whatsappShare').addEventListener('click', shareWhatsApp);
  document.getElementById('facebookShare').addEventListener('click', shareFacebook);
  document.getElementById('xShare').addEventListener('click', shareX);
  document.getElementById('telegramShare').addEventListener('click', shareTelegram);
  document.getElementById('copyLinkShare').addEventListener('click', copyLink);

  // Preload the box frames to make the reveal smoother.
  [...boxFrames, ...fortunes].forEach(name => { const img = new Image(); img.src = ASSET + name; });
})();
