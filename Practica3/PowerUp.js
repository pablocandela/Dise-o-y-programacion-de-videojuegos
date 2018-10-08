var GameEngine = (function(GameEngine) {
    const PI2 = 2*Math.PI;
  
    class PowerUp extends GameEngine.Sprite{
      constructor(x, y, size) {
        super(x, y, size, size, "escudo.png");
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
        this.isAlive = false;
      }
  
      update(elapsed) {
        this.x += this.vx *elapsed;
        this.y += this.vy *elapsed;
      }
  
      render(ctx) {
        if(this.isAlive){
            super.render(ctx);     
        }   
      }
    }
  
    GameEngine.PowerUp = PowerUp;
    return GameEngine;
  })(GameEngine || {})