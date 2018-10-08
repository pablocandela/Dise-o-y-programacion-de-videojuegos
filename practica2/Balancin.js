var GameEngine = (function(GameEngine) {
    
  
    class Balancin extends GameEngine.SpriteBalancin{
      constructor(x, y, size,sprite) {
        super(x, y, size, size, sprite);
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
  
    GameEngine.Balancin = Balancin;
    return GameEngine;
  })(GameEngine || {})