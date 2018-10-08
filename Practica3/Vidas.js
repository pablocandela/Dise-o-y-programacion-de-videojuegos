var GameEngine = (function(GameEngine) {
    
  
    class Vidas extends GameEngine.Sprite{
      constructor(x, y, size) {
        super(x, y, size, size, "Corazón.svg");
        
        this.size = size;        
      }
  
      processInput() {
       
      }
  
      update(elapsed) {
        super.update(elapsed);
      }
  
      render(ctx) {
        super.render(ctx);
  
        if (this.showFlame) {
          ctx.save();
         
  
          ctx.stroke();
    
          ctx.restore();
        }
      }
    }
  
    GameEngine.Vidas = Vidas;
    return GameEngine;
  })(GameEngine || {})