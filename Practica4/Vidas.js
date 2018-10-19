var GameEngine = (function(GameEngine) {
    const PI2 = 2*Math.PI;
  
    class Vidas {
        constructor(color = 0){
        this.contador = 2;
        }
  
      render(ctx,vidas) {
        ctx.beginPath();
       
        
        for(let j = 0; j < vidas; j++){
            ctx.strokeStyle = "#FDDF00";
            ctx.moveTo(j*3,0);
            ctx.lineTo(j*3,10);
            ctx.stroke();
        }
        
      }
    }
  
    GameEngine.Vidas = Vidas;
    return GameEngine;
  })(GameEngine || {})