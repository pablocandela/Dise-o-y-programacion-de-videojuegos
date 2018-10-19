var GameEngine = (function(GameEngine) {
    let gravity = 16;
  
    let KEY = GameEngine.KEY;
    let contador = 0;
    
    
  
    class Enemigo4  {
      constructor(x, y, w, h,vx,vy) {
        this.sprite = new GameEngine.Sprite(x,y,16,16,"images/enemy04.png", 5, 16, 16);
        //super(x, y, w, h, "images/player.svg", 14, 16, 16);
  
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
  
        this.frameCounter = 0;
        this.framesPerChange = 8;
        this.numFrameAnimation = 2;
  
        this.ladderCounter = 0;
        this.ladderFramesPerChange = 8;
  
        this.w_2 = w/2-1;
        this.h_2 = h/2;
  
        this.jump_heigth = 235;
        this.inFloor = false;
        this.tiene_arma = false;
  
        this.speed = 95;
        this.vx = vx;
        this.vy = vy;
        this.canJump = true;
        this.active = false;
        this.dormido = 0;
        this.vidas = 5;
        this.espera = 0;
        this.bandera = false;
        this.radius = this.w / 2;
      }
  
      processInput() {
        
      }
  
      setState() {
        
      }
  
      update(elapsed, level, cw, ch, camera, player) {
         if(this.vidas == 0){
           this.active = false;
         }
         this.frameCounter = (this.frameCounter +1)%(this.framesPerChange*this.numFrameAnimation);
            this.sprite.currentFrame = parseInt(this.frameCounter/this.framesPerChange);
          if(this.dormido == 0){
            if(this.active){
              
                this.x += this.vx * elapsed ;
                this.y += this.vy * elapsed;
                this.sprite.x = this.x;
                this.sprite.y = this.y;
              }
            this.checkCollisionPlatforms(level);
            //this.checkCollisionWalls(cw, ch, camera);
          }else{
              this.dormido -= 1;
          }
          if(this.dormido < 1){
              this.dormido = 0;
          }       
      }

      checkCollisionPlatforms(level) {
        let tile_pos = level.getTilePos(this.x, this.y);
  
        //center
        this.reactCollision(level.getPlatform(tile_pos.x,   tile_pos.y));
        // left
        this.reactCollision(level.getPlatform(tile_pos.x-1, tile_pos.y));
        // right
        this.reactCollision(level.getPlatform(tile_pos.x+1, tile_pos.y));
  
        // top
        this.reactCollision(level.getPlatform(tile_pos.x,   tile_pos.y-1));
        // bottom
        this.reactCollision(level.getPlatform(tile_pos.x,   tile_pos.y+1));
  
        // left top
        this.reactCollision(level.getPlatform(tile_pos.x-1, tile_pos.y-1));
        // right top
        this.reactCollision(level.getPlatform(tile_pos.x+1, tile_pos.y-1));
  
        // left bottom
        this.reactCollision(level.getPlatform(tile_pos.x-1, tile_pos.y+1));
        // right bottom
        this.reactCollision(level.getPlatform(tile_pos.x+1, tile_pos.y+1));
      }

      reactCollision(platform) {
        if ( platform &&
             Math.abs(this.x - platform.x) < this.w_2 + platform.w_2 && 
             Math.abs(this.y - platform.y) < this.h_2 + platform.h_2 ) {
  
          let overlapX = (this.w_2 + platform.w_2) - Math.abs(this.x - platform.x);
          let overlapY = (this.h_2 + platform.h_2) - Math.abs(this.y - platform.y);
  
          if (overlapX < overlapY) {
            if (this.x - platform.x > 0) {
              this.x += overlapX ;
            }
            else {
              this.x -= overlapX;
            }
            this.vx *= -1;
            this.dormido = 40;
          }
          else if (overlapX > overlapY) {
            if (this.y - platform.y > 0) {
              this.y += overlapY;
            }
            else{
                this.y -= overlapY
            }
            this.vy *= -1;
            this.dormido = 40;
          }
        }
      }
      
      render(ctx) {
        if(this.active){
          if(this.espera == 0){
            this.frameCounter = (this.frameCounter +1)%(this.framesPerChange*this.numFrameAnimation);
            this.sprite.currentFrame = parseInt(this.frameCounter/this.framesPerChange);
          }else{
            this.espera -= 1;
          }
          if(this.espera == 0){
            this.espera = 100;
          }  
          this.sprite.render(ctx)
        }
      }
    }
  
    GameEngine.Enemigo4 = Enemigo4;
    return GameEngine;
  })(GameEngine || {})