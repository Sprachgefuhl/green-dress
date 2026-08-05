const ctx = canvas.getContext('2d');
const EMOJIS = [
  {
    name: 'rainbow',
    src: '/images/rainbow.png',
    increment: 500,
    chance: { min: 0, max: 0.3 }
  },
  {
    name: 'flower',
    src: '/images/flower.png',
    increment: 10,
    chance: { min: 0.3, max: 5.3 }
  },
  {
    name: 'dress',
    src: '/images/dress.png',
    increment: 1,
    chance: { min: 5.3, max: 100 }
  },
];
const images = {};
// const currentStreak = Number(canvas.dataset.current) || 0;
let emojiCount = Number(canvas.dataset.dresses) || 0;
// let streakRipple = 0;
let flashGreenUntil = 0;
let lastSpoke = new Date(canvas.dataset.lastspoke).getTime();

function preloadImages() {
  EMOJIS.forEach(emoji => {
    const img = new Image();
    img.src = emoji.src;
    images[emoji.name] = img;
  });
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function startStreakAnimation() {
  function tick() {
    if (streakRipple >= currentStreak) return;

    streakRipple++;

    const t = streakRipple / currentStreak;
    const ease = t * t * t;
    const delay = 10 + (1 - ease) * 50;

    setTimeout(tick, delay);
  }

  tick();
}

window.addEventListener('resize', resize);