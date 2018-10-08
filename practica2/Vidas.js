var GameEngine = (function(GameEngine) {

    class Vidas {
      constructor(pos_x,pos_y) {
          this.pos_x = pos_x;
          this.pos_y = pos_y;

          this.vidas = 3;

      }

      processInput() {

    }

      update(elapsed){
         
      }

      render(ctx){
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.font = "bold 30px Monospace";
        ctx.fillText(this.vidas, this.pos_x, this.pos_y);
        ctx.strokeText(this.vidas,this.pos_x,this.pos_y);
            
      
      }
    }
     
    GameEngine.Vidas = Vidas;
    return GameEngine;
  })(GameEngine || {})