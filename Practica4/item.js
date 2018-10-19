var GameEngine = (function(GameEngine) {
    let gravity = 16;
  
    let KEY = GameEngine.KEY;
    let contador = 0;
    
    
  
    class item  {
      constructor(x, y, w, h) {
        this.sprite = new GameEngine.Sprite(x,y,16,16,"images/items.png", 5, 16, 16);
        //super(x, y, w, h, "images/player.svg", 14, 16, 16);
  
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        
        this.active = false;
        
        this.radius = this.w;

        this.vx = -25;
        this.vy = 0;


      }
      update(elapsed) {
        this.sprite.update(elapsed);
      }

          
      render(ctx,x1,y1) {
        this.sprite.currentFrame = 1;
        this.sprite.render(ctx,this.x,this.y);
        }
    }
  
    GameEngine.item = item;
    return GameEngine;
  })(GameEngine || {})