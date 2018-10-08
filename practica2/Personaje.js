var GameEngine = (function(GameEngine) {
    
  
    class Personaje extends GameEngine.Sprite2{
      constructor(x, y, size) {
        super(x, y, size, size, "Personaje3.svg");
        this.size = size;        
      }
  
      processInput() {
      super.processInput();
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
  
    GameEngine.Personaje = Personaje;
    return GameEngine;
  })(GameEngine || {})