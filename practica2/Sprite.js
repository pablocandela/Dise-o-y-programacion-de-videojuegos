var GameEngine = (function(GameEngine) {
    class Sprite {
      constructor(x, y, w, h, img_path) {
        this.x = x;
        this.y = y;  
        this.w = w;
        this.h = h;
       
        
  
        this.image = new Image();
        this.image.src = img_path;
      }
  
      processInput() { }
  
      update(elapsed) {      
          
      }
      
      render(ctx) {
        ctx.save();
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        ctx.restore();
      }
    }
  
    GameEngine.Sprite = Sprite;
    return GameEngine;
  })(GameEngine || {})