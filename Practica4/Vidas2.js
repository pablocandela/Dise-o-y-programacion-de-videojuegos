var GameEngine = (function(GameEngine) {
    const PI2 = 2*Math.PI;
  
    class Vidas2 {
        constructor(color = 0){
        this.contador = 2;
        }
  
      render(ctx,vidas) {
        ctx.beginPath();
       
        
        for(let j = 0; j < vidas; j++){
            ctx.strokeStyle = "#D30000";
            ctx.moveTo(j*3 + 200,0);
            ctx.lineTo(j*3 + 200,10);
            ctx.stroke();
        }
        
      }
    }
  
    GameEngine.Vidas2 = Vidas2;
    return GameEngine;
  })(GameEngine || {})