var GameEngine = (function(GameEngine) {
  let dx, dy;

  class Camera {
    constructor(x, y, cw, ch) {
      this.x = x;
      this.y = y;
      this.stage_w = cw;
      this.stage_h = ch;

      this.left   = 64;
      this.right  = 64;
      this.top    = 64;
      this.bottom = 64;
    }

    applyTransform(ctx) {
      ctx.save();
      ctx.translate(parseInt(this.stage_w/2 -this.x), parseInt(this.stage_h/2 -this.y));
    }
    releaseTransform(ctx) {
      ctx.restore();
    }

    update(player, level) {
      // window left
      if (player.x - player.w_2 < this.x - this.left) {
        this.x = Math.max(this.stage_w/2, parseInt(player.x - player.w_2 + this.left));
      }
      // window right
      else if (this.x + this.right < player.x + player.w_2) {
        this.x = Math.min(level.w -this.stage_w/2, parseInt(player.x + player.w_2 - this.right));
      }

      // window bottom
      if (this.y + this.bottom < player.y + player.h_2) {
        this.y = parseInt(player.y + player.h_2 - this.bottom);
      }
      // window top
      else if (player.y - player.h_2 < this.y - this.top) {
        this.y = parseInt(player.y - player.h_2 + this.top);
      }
    }

    render(ctx) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = "white";

      ctx.beginPath();
      ctx.moveTo(parseInt(this.x - 20), parseInt(this.y));
      ctx.lineTo(parseInt(this.x + 20), parseInt(this.y));
      ctx.moveTo(parseInt(this.x), parseInt(this.y - 20));
      ctx.lineTo(parseInt(this.x), parseInt(this.y + 20));

      ctx.moveTo(this.x - this.left, this.y - this.top);
      ctx.lineTo(this.x - this.left, this.y + this.bottom);
      ctx.lineTo(this.x + this.right, this.y + this.bottom);
      ctx.lineTo(this.x + this.right, this.y - this.top);
      ctx.closePath();

      ctx.stroke();
    }
  }

  GameEngine.Camera = Camera;
  return GameEngine;
})(GameEngine || {})