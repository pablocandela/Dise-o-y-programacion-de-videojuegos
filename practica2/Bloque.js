var GameEngine = (function(GameEngine) {

    class Globo {
      constructor(pos_x, pos_y,ancho,alto,color) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.ancho = ancho;
        this.alto = alto;    
        this.color = color;
        this.activo = true;
       

        this.speed = 200;
      }

      processInput() {

      }

      update(elapsed){
        if(this.color == "#FF6347" || this.color == "#FFD700"){
            this.pos_x -= 5;
            if(this.pos_x <= 0){
                this.pos_x = 630 + this.pos_x;
            }
        }
        if(this.color == "#4169E1"){
            this.pos_x += 5;
            if(this.pos_x >= 630){
                this.pos_x = 0 - (630 - this.pos_x);
            }
        }
         
      }

      render(ctx){
      if(this.activo == true){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(this.pos_x,this.pos_y,this.ancho,this.alto)
        ctx.fill();  
      
      }
    }
    }
     
    GameEngine.Globo = Globo;
    return GameEngine;
  })(GameEngine || {})