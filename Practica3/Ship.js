var GameEngine = (function(GameEngine) {
  const PI_180 = Math.PI/180;

  let KEY = GameEngine.KEY;

  class Ship extends GameEngine.Sprite {
    constructor(x, y, size) {
      super(x, y, size, size, "space_ship.svg");
      
      this.size = size;
      this.radius = size/2;
      this.trust = 0;
      this.friction = 0.98;

      this.shooting = false;

      this.weapon = new GameEngine.Weapon(1000, 0.22);
    }

    processInput() {
      this.vr = 0;
      this.trust = 0;
      this.showFlame = false;
      this.shooting = false;

      if (KEY.isPress(KEY.LEFT)) {
        this.vr = -2;
      }
      if (KEY.isPress(KEY.RIGHT)) {
        this.vr = 2;
      }
      if (KEY.isPress(KEY.UP)) {
        this.showFlame = true;
        this.trust = 10;
      }
      if (KEY.isPress(KEY.DOWN)) {
        this.trust = -2;
      }
      if (KEY.isPress(KEY.Z)) {
        this.shooting = true;
      }
    }

    update(elapsed) {
      this.rotation += this.vr * PI_180;
      this.ax = Math.cos(this.rotation) * this.trust;
      this.ay = Math.sin(this.rotation) * this.trust;

      super.update(elapsed);

      this.weapon.auxDelayTime += elapsed;
      if (this.shooting) {
        if (this.weapon.delayActivation < this.weapon.auxDelayTime) {
          this.weapon.shot(this.x, this.y, 5, -22, this.vx, this.vy, this.rotation);
          this.weapon.shot(this.x, this.y, 5,  22, this.vx, this.vy, this.rotation);
          this.weapon.auxDelayTime = 0;
        }
      }

      this.weapon.update(elapsed);
    }

    render(ctx,escudo) {
      if(escudo){
        ctx.beginPath();
        ctx.strokeStyle = "#33FFFC";
        ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
      }
      super.render(ctx);

      if (this.showFlame) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
      
        ctx.lineWidth = this.size/20;
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(-this.size/2.2, 0);
        ctx.lineTo(-2*this.size/3, 0);

        ctx.moveTo(-this.size/2, -this.size/5.4);
        ctx.lineTo(-2*this.size/3, -this.size/5.4);

        ctx.moveTo(-this.size/2, this.size/5.4);
        ctx.lineTo(-2*this.size/3, this.size/5.4);

        ctx.stroke();
        ctx.restore();
      }

      this.weapon.render(ctx);
    }
  }

  GameEngine.Ship = Ship;
  return GameEngine;
})(GameEngine || {})