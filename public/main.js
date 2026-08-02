let emojis = [];

function drawText(text, x, y, size, colour, weight = 'normal') {
  ctx.font = `${weight} ${size}px monospace`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillStyle = colour;
  ctx.fillText(text, x, y);
}

function getEmojiByChance() {
  const randomChance = Math.random() * 100;
  return EMOJIS.find(emoji => randomChance >= emoji.chance.min && randomChance < emoji.chance.max);
}

function d(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

let lastSecond = -1;
let secs, mins, hrs, days = 0;

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let now = Math.floor(Date.now() / 1000);
  if (now > lastSecond) {
    lastSecond = now;
    const diff = Date.now() - lastSpoke;
    secs = Math.floor((diff / 1000) % 60);
    mins = Math.floor((diff / (1000 * 60)) % 60);
    hrs = Math.floor(diff / (1000 * 60 * 60) % 24);
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  if (Date.now() < flashGreenUntil) {
    drawText(emojiCount, cx, 30, 30, '#2ecc71');
  }

  const dayText = days == 1 ? `${days} Day` : `${days} Days`;
  drawText(dayText, cx, cy - 30, 30, '#F8F9FA');

  const time = `${d(hrs)}:${d(mins)}:${d(secs)}`;
  drawText(time, cx, cy + 30, 50, '#F8F9FA');

  for (const emoji of emojis) {
    emoji.fall();
    emoji.collision();
    emoji.kill();
    emoji.draw();
  }

  requestAnimationFrame(loop);
}

canvas.addEventListener('click', (e) => {
  const emoji = getEmojiByChance();
  queueIncrement(emoji.increment);
  emojis.push(new Emoji(e.clientX, e.clientY, emoji.increment, images[emoji.name], emojis));
});

preloadImages();
resize();
// startStreakAnimation();
loop();