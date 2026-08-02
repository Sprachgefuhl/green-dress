let emojis = [];

function drawText(text, x, y, size, colour, align, weight = 'normal') {
  ctx.font = `${weight} ${size}px system-ui`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = align;
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

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let lastSecond = -1;
  let secs;
  let mins;
  let hrs;
  let days;

  let now = Math.floor(Date.now() / 1000);

  if (now > lastSecond) {
    lastSecond = now;
    const diff = Date.now() - lastSpoke;

    secs = Math.floor((diff / 1000) % 60);
    mins = Math.floor((diff / (1000 * 60)) % 60);
    hrs = Math.floor(diff / (1000 * 60 * 60));
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  // delete off screen emojis
  for (let i = emojis.length - 1; i >= 0; i--) {
    if (emojis[i].dead) {
      emojis.splice(i, 1);
    }
  }

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  drawText(emojiCount, cx, 30, 30, '#F8F9FA', 'center');
  if (Date.now() < flashGreenUntil) {
    drawText(emojiCount, cx, 30, 30, '#2ecc71', 'center');
  }

  drawText(`${days} Days`, cx, cy - 30, 30, '#F8F9FA', 'center', 'bold');

  const time = `${d(hrs)}:${d(mins)}:${d(secs)}`;
  drawText(time, cx - 100, cy + 30, 50, '#F8F9FA', 'left');

  for (const emoji of emojis) {
    emoji.fall();
    emoji.collision();
    emoji.draw();
  }

  requestAnimationFrame(loop);
}

canvas.addEventListener('click', (e) => {
  const emoji = getEmojiByChance();
  queueIncrement(emoji.increment);
  emojis.push(new Emoji(e.clientX, e.clientY, emoji.increment, images[emoji.name]));
});

preloadImages();
resize();
// startStreakAnimation();
loop();