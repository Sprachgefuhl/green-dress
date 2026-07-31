let emojis = [];

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // delete off screen emojis
  for (let i = emojis.length - 1; i >= 0; i--) {
    if (emojis[i].dead) {
      emojis.splice(i, 1);
    }
  } 

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  drawText(emojiCount, cx, 30, 30, '#F8F9FA');
  if (Date.now() < flashGreenUntil) {
    drawText(emojiCount, cx, 30, 30, '#2ecc71');
  }

  drawText(streakRipple, cx, cy, 70, '#F8F9FA', 'bold');
  drawText('Days', cx, cy + 50, 35, '#F8F9FA');

  for (const emoji of emojis) {
    emoji.fall();
    emoji.collision();
    emoji.draw();
  }
  
  requestAnimationFrame(loop);
}

function drawText(text, x, y, size, colour, weight = 'normal') {
  ctx.font = `${weight} ${size}px system-ui`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = colour;
  ctx.fillText(text, x, y);
}

function getEmojiByChance() {
  const randomChance = Math.random() * 100;
  return EMOJIS.find(emoji => randomChance >= emoji.chance.min && randomChance < emoji.chance.max);
}

canvas.addEventListener('click', (e) => {
  const emoji = getEmojiByChance();
  queueIncrement(emoji.increment);
  emojis.push(new Emoji(e.clientX, e.clientY, emoji.increment, images[emoji.name]));
});

preloadImages();
resize();
startStreakAnimation();
loop();