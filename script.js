/* =========================================
   A LITTLE BIRTHDAY MAGIC
   Personalized surprise for Meghi
========================================= */

const $ = (selector) => document.querySelector(selector);


// =========================================
// PERSONALIZE THESE SETTINGS
// =========================================

const FRIEND_NAME = "Meghi";
const BIRTHDAY_DATE = "29 OCTOBER 2026";

const FRIENDSHIP_MEMORY =
  "I'll always smile when I think about our random talks, silly jokes, and all those little moments that somehow became beautiful memories.";


// =========================================
// PERSONALIZED BIRTHDAY MESSAGE
// =========================================

function createBirthdayMessage(name) {
  return `Happy Birthday, ${name}! 💗

Oyyeee, to a sweet soul ✨ with the purest heart 🤍.

You are the one friend who never judges me 💫, listens to everything no matter what it is, and shares everything with me. Today is your day, so celebrate it, enjoy every moment, and always stay happy. May success always find its way to you. ✨

Thank you for your kindness, your caring nature, and everything you do. You are one of the bestest friends I got at KLE College. Be with me always, ha? 🤞🏻 Don't forget me, please! And whenever I hurt you or get angry with you, I'm really sorry, ha. Now leave all that behind. 💗

It's a special day because it's YOUR day! To a princess ✨, the prettiest and sweetest girl, and a future doctor! 🤞🏻💗 May your birthday be as sweet and special as you are. Wishing you the happiest birthday, my dearest Meghi! 🎁🎂✨

Enjoy your day, celebrate, and always stay happy, healthy, and successful. I hope you like this surprise! 🤞🏻 Tell me what gift you want—but you have to accept it, ha! 😅 And I want a party too, ha! 🎉

Once again, happiest birthday to my special one on her special day. Keep smiling, keep shining, and let's create many more beautiful memories together. 🫶🏻🧿🫀🎂💖`;
}


// =========================================
// PAGE ELEMENTS
// =========================================

const screens = [
  "introScreen",
  "countdownScreen",
  "chocolateScreen",
  "cakeScreen",
  "finalScreen"
];

const startButton = $("#startButton");
const countdownNumber = $("#countdownNumber");
const countdownMessage = $("#countdownMessage");

const chocolateGift = $("#chocolateGift");
const openChocolateButton = $("#openChocolateButton");
const chocolateReveal = $("#chocolateReveal");
const toCakeButton = $("#toCakeButton");

const blowCandlesButton = $("#blowCandlesButton");
const cutCakeButton = $("#cutCakeButton");
const cakeStatus = $("#cakeStatus");

const birthdayCake = $("#birthdayCake");
const cakeCutLine = $("#cakeCutLine");
const cakeSlice = $("#cakeSlice");
const candles = $("#candles");

const replayButton = $("#replayButton");

const backgroundMusic = $("#backgroundMusic");
const confettiContainer = $("#confettiContainer");
const floatingHearts = $("#floating-hearts");


// =========================================
// EXPERIENCE STATE
// =========================================

let countdownInterval = null;
let toastTimeout = null;
let floatingHeartInterval = null;
let heartbeatInterval = null;

let chocolateOpened = false;
let candlesBlown = false;
let cakeCut = false;

let audioContext = null;


// =========================================
// INITIALIZE HER PERSONAL DETAILS
// =========================================

function initializePersonalization() {
  $("#heartName").textContent = FRIEND_NAME;
  $("#finalName").textContent = FRIEND_NAME;

  $("#finalMessage").textContent =
    createBirthdayMessage(FRIEND_NAME);

  $("#friendshipMemory").textContent =
    FRIENDSHIP_MEMORY;

  $("#introDate").textContent = BIRTHDAY_DATE;
  $("#finalDate").textContent = BIRTHDAY_DATE;

  $("#chocolateMessage").textContent =
    `Life is more fun with a best friend like you, ${FRIEND_NAME}. ` +
    "Here's a tiny reminder that you are appreciated. 💕";
}


// =========================================
// SCREEN NAVIGATION
// =========================================

function showScreen(screenId) {
  screens.forEach((id) => {
    const screen = document.getElementById(id);

    screen.classList.remove("active");
    screen.setAttribute("aria-hidden", "true");
  });

  const nextScreen = document.getElementById(screenId);

  if (!nextScreen) {
    return;
  }

  nextScreen.classList.add("active");
  nextScreen.setAttribute("aria-hidden", "false");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// =========================================
// BACKGROUND STARS
// =========================================

function createStars() {
  const starsContainer = $("#stars");

  starsContainer.innerHTML = "";

  for (let i = 0; i < 65; i++) {
    const star = document.createElement("span");

    star.className = "star";
    star.textContent = Math.random() > 0.7 ? "✦" : "·";

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    star.style.fontSize =
      `${Math.random() * 12 + 5}px`;

    star.style.animationDelay =
      `${Math.random() * 4}s`;

    star.style.animationDuration =
      `${Math.random() * 3 + 2}s`;

    starsContainer.appendChild(star);
  }
}


// =========================================
// FLOATING HEARTS
// =========================================

function createFloatingHeart() {
  const heart = document.createElement("span");

  heart.className = "floating-heart";

  const symbols = ["💗", "💖", "💕", "♡", "✨", "💜"];

  heart.textContent =
    symbols[Math.floor(Math.random() * symbols.length)];

  heart.style.left = `${Math.random() * 100}%`;

  heart.style.fontSize =
    `${Math.random() * 18 + 12}px`;

  heart.style.animationDuration =
    `${Math.random() * 5 + 7}s`;

  floatingHearts.appendChild(heart);

  setTimeout(() => heart.remove(), 13000);
}

function startFloatingHearts() {
  stopFloatingHearts();

  createFloatingHeart();

  floatingHeartInterval =
    setInterval(createFloatingHeart, 650);
}

function stopFloatingHearts() {
  if (floatingHeartInterval !== null) {
    clearInterval(floatingHeartInterval);
    floatingHeartInterval = null;
  }
}


// =========================================
// BACKGROUND MUSIC
// =========================================

function startMusic() {
  backgroundMusic.volume = 0.35;

  backgroundMusic.play().catch(() => {
    showToast(
      "Add a music file named music.mp3 for background music."
    );
  });
}

function stopMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}


// =========================================
// SYNTHESIZED HEARTBEAT SOUND
// No separate heartbeat file required
// =========================================

function makeHeartbeatBeat() {
  try {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    if (!audioContext) {
      audioContext = new AudioContextClass();
    }

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const startTime = audioContext.currentTime;

    function pulse(time, frequency, volume, duration) {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";

      oscillator.frequency.setValueAtTime(
        frequency,
        time
      );

      gain.gain.setValueAtTime(0.0001, time);

      gain.gain.exponentialRampToValueAtTime(
        volume,
        time + 0.025
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        time + duration
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start(time);
      oscillator.stop(time + duration + 0.02);
    }

    pulse(startTime, 75, 0.09, 0.12);
    pulse(startTime + 0.19, 60, 0.07, 0.15);

  } catch (error) {
    console.warn("Heartbeat audio is unavailable.", error);
  }
}

function startHeartbeat() {
  stopHeartbeat();

  makeHeartbeatBeat();

  heartbeatInterval =
    setInterval(makeHeartbeatBeat, 1100);
}

function stopHeartbeat() {
  if (heartbeatInterval !== null) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
}


// =========================================
// TOAST NOTIFICATIONS
// =========================================

function showToast(message) {
  const toast = $("#toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


// =========================================
// SPARKLE BURST
// =========================================

function burstSparkles(x, y, amount = 25) {
  const symbols = ["✦", "✧", "✨", "·", "♡"];

  for (let i = 0; i < amount; i++) {
    const sparkle = document.createElement("span");

    sparkle.className = "sparkle-particle";

    sparkle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    sparkle.style.setProperty(
      "--sparkle-x",
      `${(Math.random() - 0.5) * 240}px`
    );

    sparkle.style.setProperty(
      "--sparkle-y",
      `${(Math.random() - 0.5) * 220}px`
    );

    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1100);
  }
}

function burstFromElement(element, amount = 28) {
  if (!element) {
    return;
  }

  const rect = element.getBoundingClientRect();

  burstSparkles(
    rect.left + rect.width / 2,
    rect.top + rect.height / 2,
    amount
  );
}


// =========================================
// COLORFUL CONFETTI
// =========================================

function launchConfetti(amount = 100) {
  const colors = [
    "#ff70b7",
    "#ffdb8b",
    "#b99aff",
    "#ffffff",
    "#ffb8df",
    "#a4ffe1",
    "#ff9c65"
  ];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti-piece";

    piece.style.left = `${Math.random() * 100}%`;

    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.animationDuration =
      `${Math.random() * 2.5 + 2.5}s`;

    piece.style.animationDelay =
      `${Math.random() * 0.8}s`;

    piece.style.width =
      `${Math.random() * 7 + 5}px`;

    piece.style.height =
      `${Math.random() * 12 + 7}px`;

    confettiContainer.appendChild(piece);

    setTimeout(() => piece.remove(), 6500);
  }
}


// =========================================
// STEP 1: OPEN THE SURPRISE
// =========================================

startButton.addEventListener("click", () => {
  startMusic();
  startHeartbeat();

  burstFromElement(startButton, 40);

  // Her name is already set. No name input screen is needed.
  showScreen("countdownScreen");

  startCountdown();
});


// =========================================
// STEP 2: FIFTEEN-SECOND COUNTDOWN
// =========================================

function startCountdown() {
  clearInterval(countdownInterval);
  countdownInterval = null;

  let seconds = 15;

  countdownNumber.textContent = String(seconds);

  const messages = [
    "Getting your surprise ready...",
    "A little happiness is on its way...",
    "Get ready for something sweet...",
    "Your special moment is coming...",
    "A little surprise, made just for you...",
    "Almost there, birthday girl..."
  ];

  let messageIndex = 0;

  countdownMessage.textContent = messages[0];

  countdownInterval = setInterval(() => {
    seconds -= 1;

    countdownNumber.textContent = String(seconds);

    burstFromElement(countdownNumber, 7);

    if (seconds > 0 && seconds % 2 === 0) {
      messageIndex =
        (messageIndex + 1) % messages.length;

      countdownMessage.textContent =
        messages[messageIndex];
    }

    if (seconds <= 0) {
      clearInterval(countdownInterval);
      countdownInterval = null;

      countdownNumber.textContent = "💗";

      countdownMessage.textContent =
        "Your sweetness is here!";

      launchConfetti(50);

      setTimeout(() => {
        stopHeartbeat();

        showScreen("chocolateScreen");

        burstFromElement(chocolateGift, 55);

        startFloatingHearts();
      }, 800);
    }
  }, 1000);
}


// =========================================
// STEP 3: OPEN THE CHOCOLATE GIFT
// =========================================

openChocolateButton.addEventListener("click", () => {
  if (chocolateOpened) {
    return;
  }

  chocolateOpened = true;

  chocolateGift.style.animation = "none";

  chocolateGift.style.transform =
    "translateY(-13px) rotateX(20deg) scale(1.08)";

  burstFromElement(chocolateGift, 65);

  launchConfetti(55);

  openChocolateButton.classList.add("hidden");

  chocolateReveal.classList.remove("hidden");

  showToast("A little chocolate-sized happiness! 🍫");
});


// =========================================
// STEP 4: REVEAL THE BIRTHDAY CAKE
// =========================================

toCakeButton.addEventListener("click", () => {
  showScreen("cakeScreen");

  burstFromElement(birthdayCake, 35);

  startFloatingHearts();
});


// =========================================
// STEP 5: BLOW OUT THE CANDLES
// =========================================

blowCandlesButton.addEventListener("click", () => {
  if (candlesBlown) {
    return;
  }

  candlesBlown = true;

  candles.classList.add("blown");

  cakeStatus.textContent =
    "Your wish is on its way to the universe. ✨";

  blowCandlesButton.classList.add("hidden");

  cutCakeButton.classList.remove("hidden");

  burstFromElement(candles, 45);

  launchConfetti(35);

  showToast("Wish made! Now let's cut the cake. 🎂");
});


// =========================================
// STEP 6: CUT THE CAKE
// =========================================

cutCakeButton.addEventListener("click", () => {
  if (cakeCut || !candlesBlown) {
    return;
  }

  cakeCut = true;

  cutCakeButton.disabled = true;

  cakeCutLine.classList.add("show");

  birthdayCake.classList.add("cut");

  cakeSlice.classList.remove("hidden");

  cakeStatus.textContent =
    "A little cake, a lot of wishes, and a memory to keep. 💗";

  burstFromElement(birthdayCake, 60);

  launchConfetti(100);

  setTimeout(() => {
    showScreen("finalScreen");

    stopHeartbeat();

    startFloatingHearts();

    launchConfetti(170);

    burstFromElement($("#finalMessage"), 65);
  }, 1800);
});


// =========================================
// STEP 7: REPLAY THE EXPERIENCE
// =========================================

replayButton.addEventListener("click", () => {
  clearInterval(countdownInterval);
  countdownInterval = null;

  chocolateOpened = false;
  candlesBlown = false;
  cakeCut = false;

  openChocolateButton.classList.remove("hidden");

  chocolateReveal.classList.add("hidden");

  chocolateGift.style.animation = "";
  chocolateGift.style.transform = "";

  blowCandlesButton.classList.remove("hidden");

  cutCakeButton.classList.add("hidden");
  cutCakeButton.disabled = false;

  candles.classList.remove("blown");

  birthdayCake.classList.remove("cut");
  cakeCutLine.classList.remove("show");

  cakeSlice.classList.add("hidden");

  cakeStatus.textContent =
    "Three little flames. Three wishes. Infinite happiness.";

  countdownNumber.textContent = "15";

  countdownMessage.textContent =
    "Getting your surprise ready...";

  confettiContainer.innerHTML = "";

  // Restore Meghi's name and all her personal details.
  initializePersonalization();

  stopHeartbeat();
  stopMusic();

  showScreen("introScreen");
});


// =========================================
// EXTRA: CLICK FOR SPARKLES
// =========================================

document.addEventListener("click", (event) => {
  if (event.target.closest("button")) {
    return;
  }

  burstSparkles(
    event.clientX,
    event.clientY,
    8
  );
});


// =========================================
// INITIALIZE THE WEBSITE
// =========================================

createStars();

startFloatingHearts();

initializePersonalization();

screens.forEach((id) => {
  const screen = document.getElementById(id);

  screen.setAttribute(
    "aria-hidden",
    screen.classList.contains("active") ? "false" : "true"
  );
});