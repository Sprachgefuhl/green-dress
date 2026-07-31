class Dress {
  constructor(x, y, emoji) {
    this.x = x;
    this.y = y;
    this.emoji = emoji;
    this.vel = {
      y: -8,
      x: Math.random() * (-1 - 1) + 1,
    };
    this.gravity = 0.35;
    this.bounce = 0.5;
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
    if (this.x > canvas.width - 25) {
      this.x = canvas.width - 25;
      this.vel.x = -this.vel.x;
    }

    if (this.x < 25) {
      this.x = 25;
      this.vel.x = -this.vel.x;
    }

    if (this.y < 25) {
      this.y = 25;
      this.vel.y = -this.vel.y;
    }

    if (this.y > canvas.height) {
      dressesCount++;
      this.dead = true;
      flashGreenUntil = Date.now() + 500;

      // this.y = canvas.height;
      // this.vel.y = -this.vel.y * this.bounce;

      // if (Math.abs(this.vel.y) < 0.7) {
      //   this.vel.y = 0;
      //   this.spin = 0;
      // }
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.emoji, 0, 0);
    ctx.restore();
  }
}