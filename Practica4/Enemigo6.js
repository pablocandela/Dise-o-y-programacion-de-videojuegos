var GameEngine = (function(GameEngine) {
    let gravity = 16;
  
    let KEY = GameEngine.KEY;
    let contador = 0;
    
    
  
    class Enemigo6  {
      constructor(x, y, w, h,vx,vy,desincroniza,di) {
        this.sprite = new GameEngine.Sprite(x,y,18,32,"images/enemy06.png", 5, 18, 32);
        //super(x, y, w, h, "images/player.svg", 14, 16, 16);
  
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
  
        this.frameCounter = 0;
        this.framesPerChange = 22;
        this.numFrameAnimation = 2;
        this.tiene_arma = true;


        this.jumpWait = 0.4;
        this.jumpCounter = this.jumpWait;
  
        this.vidas = 1;
        this.ladderCounter = 0;
        this.ladderFramesPerChange = 8;
  
        this.w_2 = w/2;
        this.h_2 = h/2+15;
  
        this.speed = 120;
        this.jump_heigth = 240;
        this.inFloor = false;
  
       
        this.vx = -25;
        this.vy = 0;
        this.canJump = true;
        this.active = false;
        this.shooting = true;
        //this.dormido = 0;
        this.bandera = false;
        this.radius = this.w;
        
        this.arma = new GameEngine.Arma(100, 1.1);
      }

      lerp(v0, v1, t) {
        return v0 + (v1 - v0)*t;
      }
  
      processInput() {
        
      }
  
      setState() {
        
      }
  
      update(elapsed, level, cw, ch, camera, player) {
        if(this.vidas){
          this.active = false;
        }
        if (this.active) {
            this.x = this.x - 2;
            this.sprite.x = this.x;
            this.frameCounter = (this.frameCounter +1)%(this.framesPerChange*this.numFrameAnimation);
            this.sprite.currentFrame = parseInt(this.frameCounter/this.framesPerChange);
            if (this.x < camera.x - 125) {
                this.x += 280; 
            }
            this.arma.auxDelayTime += elapsed;
            if (this.shooting) {    
                if (this.arma.delayActivation < this.arma.auxDelayTime) {
                    this.arma.shot(this.x, this.y, 1, 2, 1, 1, 3.13);
                    this.arma.shot(this.x, this.y, 1,  2, 1,1, 6.1);
                    this.arma.shot(this.x, this.y, 1,  2, 1,1, 4.1);
                    this.arma.shot(this.x, this.y, 1,  2, 1,1, 7.1);
                    this.arma.shot(this.x, this.y, 1,  2, 1,1, 4.8);
                    this.arma.shot(this.x, this.y, 1,  2, 1,1, 7.8);
                    this.arma.shot(this.x, this.y, 1,  2, 1,1, 2);
                    this.arma.auxDelayTime = 0;
                 }
            }
            this.arma.update(elapsed);
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
            this.arma.render(ctx);
          }
      }
    
}
  
    GameEngine.Enemigo6 = Enemigo6;
    return GameEngine;
  })(GameEngine || {})