class Emoji {
  constructor(x, y, increment, img, list) {
    this.x = x;
    this.y = y;
    this.increment = increment;
    this.img = img;
    this.list = list;

    this.w = 50;
    this.h = 50;
    this.vel = {
        y: -8,
        x: Math.random() * (-1 - 1) + 1,
    };
    this.gravity = 0.35;
    this.angle = 0;
    this.spinSpeed = Math.random() * (0.09 - 0.03) + 0.03;
    this.spin = Math.random() < 0.5 ? this.spinSpeed : -this.spinSpeed;
    this.dead = false;
  }

  fall() {
    this.vel.y += this.gravity;
    this.y += this.vel.y;
    this.x += this.vel.x;
    this.angle += this.spin;
  }

  collision() {
    // right
    if (this.x > canvas.width - 25) {
      this.x = canvas.width - 25;
      this.vel.x = -this.vel.x;
    }

    // left
    if (this.x < 25) {
      this.x = 25;
      this.vel.x = -this.vel.x;
    }

    // top
    if (this.y < 25) {
      this.y = 25;
      this.vel.y = -this.vel.y;
    }

    // bottom
    if (this.y > canvas.height) {
      emojiCount += this.increment;
      this.dead = true;
      flashGreenUntil = Date.now() + 500;
      this.y = canvas.height;
    }
  }

  kill() {
    for (let i = this.list.length - 1; i >= 0; i--) {
      if (this.list[i].dead) {
        this.list.splice(i, 1);
      }
    }
  }
  
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
  }
}