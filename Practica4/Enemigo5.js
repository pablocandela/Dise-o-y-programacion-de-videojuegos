var GameEngine = (function(GameEngine) {
    let gravity = 20;
  
    let KEY = GameEngine.KEY;
    
    
  
    class Enemigo5  {
      constructor(x, y, w, h) {
        this.sprite = new GameEngine.Sprite(x,y,16,16,"images/enemy05.png", 10, 16, 16);
        //super(x, y, w, h, "images/player.svg", 14, 16, 16);
  
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.tiene_arma = false;
        this.vidas = 1;
  
        this.frameCounter = 1;
        this.framesPerChange = 16;
        //this.numFrameAnimation = 2;


        this.jumpWait = 0.6;
        this.jumpCounter = this.jumpWait;
  
        this.ladderCounter = 0;
        this.ladderFramesPerChange = 8;
  
        this.w_2 = w/2;
        this.h_2 = h/2+1;
  
        this.speed = 250;
        this.jump_heigth = 240;
        this.inFloor = false;
  
       
        this.vx = -35;
        this.vy = 0;
        this.canJump = true;
        this.active = false;
        this.bandera = false;
        this.radius = this.w;
        //this.dormido = 0;
      }

      lerp(v0, v1, t) {
        return v0 + (v1 - v0)*t;
      }
  
      processInput() {
        
      }
  
      setState() {
        
      }
  
      update(elapsed, level, cw, ch, camera, player) {
        if(this.vidas == 0){
          this.active = false;
        }
        if(this.x < player.x)
            this.sprite.direction = -1;
        if(this.x > player.x)
            this.sprite.direction = 1;
        if (this.active) {
            this.inFloor = false;
            this.vy += gravity;
    
            this.x = this.lerp(this.x, player.x, 0.035);
            
            this.y += this.vy * elapsed;
            this.sprite.x = this.x;
            this.sprite.y = this.y;
    
            //this.frameCounter = (this.frameCounter +1)%(this.framesPerChange*this.numFrameAnimation);
            this.sprite.currentFrame = 1;
    
            this.checkCollisionPlatforms(level);
            this.checkCollisionWalls(cw, ch, camera);
    
            if ((this.inFloor) && (this.jumpCounter > this.jumpWait)) {
             this.sprite.currentFrame = 0  ;
              this.vy = -this.jump_heigth;
              this.jumpCounter = 0; 
            }
            else {
              this.jumpCounter += elapsed;
            }
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
             this.x += overlapX;
           }
           else {
             this.x -= overlapX;
           }
           this.vx *= -1;
         }
         else if (overlapX > overlapY) {
           if (this.y - platform.y > 0) {
             this.y += overlapY;
             if (this.vy < 0) {
               this.vy = 0;
             }
           }
           else {
             this.y -= overlapY;
             if (this.vy > 0) {
               this.inFloor = true;
               this.vy = 0;
             }
           }
         }
       }
     }
     
     checkCollisionWalls(cw, ch, camera) {
       if (this.x < camera.x -cw) {
         this.active = false;
       }
       if (this.x > camera.x +cw) {
         this.active = false;
       }
     }
 
      render(ctx) {
        if (this.active) {
            this.sprite.render(ctx);
            
          }
      }
    }
  
    GameEngine.Enemigo5 = Enemigo5;
    return GameEngine;
  })(GameEngine || {})