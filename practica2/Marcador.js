var GameEngine = (function(GameEngine) {

    class Marcador {
      constructor(pos_x,pos_y) {
          this.pos_x = pos_x;
          this.pos_y = pos_y;

          this.puntaje = 0;

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
        ctx.fillText(this.puntaje, this.pos_x, this.pos_y);
        ctx.strokeText(this.puntaje,this.pos_x,this.pos_y);
            
      
      }
    }
     
    GameEngine.Marcador = Marcador;
    return GameEngine;
  })(GameEngine || {})