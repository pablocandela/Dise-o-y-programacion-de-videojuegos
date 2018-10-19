var GameEngine = (function(GameEngine) {
    const PI2 = 2*Math.PI;
  
    class Bala2 {
      constructor(speed=400, activeTime=.65) {
        this.isAlive = false;
        this.speed = speed;
        this.activeTime = activeTime;
        this.auxActiveTime = 0;
        this.x = 0;
        this.y = 0;
        this.size = 2;
        this.radius = this.size;
      }
  
      activate(ox, oy, x, y, vx, vy, rotation) {
        this.x = ox + x * Math.cos(rotation) - y * Math.sin(rotation);
        this.y = oy + y * Math.cos(rotation) + x * Math.sin(rotation);
  
        this.vx = vx + this.speed * Math.cos(rotation);
        this.vy = vy + this.speed * Math.sin(rotation);
        this.isAlive = true;
      }
  
      update(elapse) {
        this.x += this.vx * elapse;
        this.y += this.vy * elapse;
  
        this.auxActiveTime += elapse;
        if (this.auxActiveTime > this.activeTime) {
          this.isAlive = false;
          this.auxActiveTime = 0;
        }
      }
  
      render(ctx) {
        ctx.fillStyle = "#F7EC8E";
        //ctx.fillStyle = "#FAF7E3";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + 1, 0, PI2);
        
        ctx.fill();  
      }
    }
  
    GameEngine.Bala2 = Bala2;
    return GameEngine;
  })(GameEngine || {})