var GameEngine = (function(GameEngine) {
  let PI2 = 2*Math.PI;

  class Ball {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;

      this.speed = 200;
      this.angle = (360 * Math.random());
      if(this.angle == 0 || this.angle == 180)
        this.angle += 10;
      else if(this.angle > 55 && this.angle < 145 || this.angle > 235 && this.angle < 325)
        this.angle += 90;
      this.vx = Math.cos(this.angle*Math.PI/180) * this.speed;
      this.vy = Math.sin(this.angle*Math.PI/180) * this.speed;
    }

    update(elapsed) {
      this.x += this.vx * elapsed;
      this.y += this.vy * elapsed;   
    }

    render(ctx) {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, PI2);
      ctx.fill();
    }
  }

  GameEngine.Ball = Ball;
  return GameEngine;
})(GameEngine || {})
