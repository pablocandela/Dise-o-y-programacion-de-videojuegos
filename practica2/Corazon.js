var GameEngine = (function(GameEngine) {
    
  
    class Corazon extends GameEngine.Sprite{
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
  
    GameEngine.Corazon = Corazon;
    return GameEngine;
  })(GameEngine || {})