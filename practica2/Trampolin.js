var GameEngine = (function(GameEngine) {

    class Trampolin {
      constructor(pos_x, pos_y,ancho,alto,color) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.ancho = ancho;
        this.alto = alto;    
        this.color = color;

      }

      processInput() {

      }

      update(elapsed){
              
      }

      render(ctx){
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.fillRect(this.pos_x,this.pos_y,this.ancho,this.alto)
      ctx.fill();  
      }
    }
     
    GameEngine.Trampolin = Trampolin;
    return GameEngine;
  })(GameEngine || {})