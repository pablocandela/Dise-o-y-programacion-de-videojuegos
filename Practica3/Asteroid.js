var GameEngine = (function(GameEngine) {
  const PI2 = 2*Math.PI;

  class Asteroid extends GameEngine.Sprite{
    constructor(x, y, size) {
      super(x, y, size, size, "asteroide.svg");
      this.isAlive = false;
      this.x = x;
      this.y = y;
      this.speed = 100;
      
      let angle = (360 * Math.random()) * Math.PI/180;
      this.vx = Math.cos(angle) * this.speed;
      this.vy = Math.sin(angle) * this.speed;
      this.size = this.radius = size;
      this.hp = 3;
    }

    hit() {
      this.hp--;

      if (this.hp > 0) {
        this.radius = this.size = this.size/2 + this.size / 5;
      }
      else {
        this.isAlive = false;
        this.hp = 3;
        this.size = 50;
        this.radius = 50;
      }
    }

    activate(x, y) {
      this.x = x;
      this.y = y;
      this.isAlive = true;
    }

    update(elapsed) {
      this.x += this.vx *elapsed;
      this.y += this.vy *elapsed;
    }

    render(ctx) {
      super.w = this.radius;
      super.h = this.radius;
      super.render(ctx);
      //ctx.strokeStyle = "#ff0000";
      //ctx.beginPath();
      //ctx.arc(this.x, this.y, this.size, 0, PI2);
      //ctx.stroke(); 
    }
  }

  GameEngine.Asteroid = Asteroid;
  return GameEngine;
})(GameEngine || {})