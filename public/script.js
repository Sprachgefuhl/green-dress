const canvas = document.getElementById('cvs');
const ctx = canvas.getContext('2d');
const EMOJIS = ['👗'];

const current = Number(canvas.dataset.current) || 0;
let dressesCount = Number(canvas.dataset.dresses) || 0;
let streakRipple = 0;
let flashGreenUntil = 0;
let dresses = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawText(text, x, y, size, colour, weight = 'normal') {
  ctx.font = `${weight} ${size}px system-ui`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = colour;
  ctx.fillText(text, x, y);
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const dress of dresses) {
    dress.fall();
    dress.collision();
    dress.draw();
  }

  dresses = dresses.filter(dress => !dress.dead);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  drawText(streakRipple, cx, cy, 70, '#F8F9FA', 'bold');
  drawText('Days', cx, cy + 50, 35, '#F8F9FA');
  if (Date.now() < flashGreenUntil) drawText(`👗 ${dressesCount}`, cx, canvas.height - 20, 20, '#2ecc71');
  else drawText(`👗 ${dressesCount}`, cx, canvas.height - 20, 20, '#F8F9FA');

  requestAnimationFrame(loop);
}

function startStreakAnimation() {
  function tick() {
    if (streakRipple >= current) return;

    streakRipple++;

    const t = streakRipple / current;
    const ease = t * t * t;
    const delay = 10 + (1 - ease) * 50;

    setTimeout(tick, delay);
  }

  tick();
}

canvas.addEventListener('click', (e) => {
  queueIncrement();
  // dressesCount++;
  const randomEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  dresses.push(new Dress(e.clientX, e.clientY, randomEmoji));
});

window.addEventListener('resize', resize);

resize();
startStreakAnimation();
loop();