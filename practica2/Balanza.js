var GameEngine = (function(GameEngine) {
     
    let punto1 = 325;
    let punto2 = 465;
    let punto3 = 310;
    let punto4 = 340;
    let punto5 = 480;

    let Key = GameEngine.KEY;

    class Balanza {
      constructor(pos_x, pos_x2,pos_y,pos_y2) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.pos_x2 = pos_x2;
        this.pos_y2 = pos_y2;  
        
        this.cambio = false;
        this.colision_personaje = 0;
       
      }

      processInput() {
        if(Key.isPress(Key.RIGHT)){
          this.pos_x += 7;
          this.pos_y += 7;  
          punto1 += 7;  
          punto3 += 7; 
          punto4 += 7;
        }

        if(Key.isPress(Key.LEFT)){
          this.pos_x -= 7;
          this.pos_y -=7;
          punto1 -= 7;
          punto3 -= 7;
          punto4 -= 7;
        }  
        
      }
      update(elapsed){
          if(this.pos_x < 35){
              this.pos_x = 35;
              this.pos_y = 175;
              punto1 = 105;
              punto3 = 90;
              punto4 = 120;

          }
          if(this.pos_y > 640 - 35){
              this.pos_x = 640 - 175;
              this.pos_y = 640 - 35;
              punto1 = 535;
              punto3 = 520;
              punto4 = 550;
          }   
          
          //Colision con el prsonaje.
          if(this.colision_personaje == 1){
            this.pos_x2 = 480;
            this.pos_y2 = 480 - 35;
          }
          if(this.colision_personaje == 2){
            this.pos_x2 = 480 - 35;
            this.pos_y2 = 480;
          }
      }

      render(ctx){
        ctx.beginPath();
        ctx.lineWidth = 4.5;
        ctx.fillStyle = "#ffffff"
        ctx.moveTo(this.pos_x,this.pos_x2);
        ctx.lineTo(this.pos_y,this.pos_y2);
        ctx.stroke();
 
        ctx.beginPath();
        ctx.moveTo(punto1, punto2);
        ctx.lineTo(punto3, punto5);
        ctx.lineTo(punto4, punto5);   
        ctx.closePath();
      
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#666666';
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }
    }
     
    GameEngine.Balanza = Balanza;
    return GameEngine;
  })(GameEngine || {})