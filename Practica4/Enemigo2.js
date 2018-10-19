var GameEngine = (function(GameEngine) {
    let gravity = 16;
  
    let KEY = GameEngine.KEY;
    let contador = 0;
    
    
  
    class Enemigo2  {
      constructor(x, y, w, h,vx,vy,desincroniza,di) {
        this.sprite = new GameEngine.Sprite(x,y,16,16,"images/enemy02.png", 5, 16, 16);
        //super(x, y, w, h, "images/player.svg", 14, 16, 16);
  
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.di = di;
        this.tiene_arma = true;
        this.vidas = 1;
  
        this.frameCounter = 0;
        this.framesPerChange = 8;
  
        this.ladderCounter = 0;
        this.ladderFramesPerChange = 8;
  
        this.w_2 = w/2-1;
        this.h_2 = h/2;
  
        this.jump_heigth = 235;
        this.inFloor = false;

        this.shooting = false;
  
        this.speed = 95;
        this.vx = vx;
        this.vy = vy;
        this.canJump = true;
        this.active = false;
        this.dormido = 0;
        this.espera = 0;
        this.dir = 0;
        this.desincroniza = desincroniza;
        this.radius = this.w /2;
        this.bandera = false;


        this.arma = new GameEngine.Arma(100, 0.30);

      }
  
      processInput() {
        
      }
  
      setState() {
        
      }
  
      update(elapsed, level, cw, ch, camera, player) {
        if(this.vidas == 0){
            this.active = false;
        }
        this.sprite.direction = this.di;  
          
        if(this.desincroniza == 0){
            this.arma.auxDelayTime += elapsed;
            if (this.shooting) {
            if(this.sprite.direction == -1){
                if (this.arma.delayActivation < this.arma.auxDelayTime && this.active) {
                    if(this.dir == 0){
                        this.arma.shot(this.x, this.y, 1, 2, 1, 1, 3.6);
                        //this.arma.shot(this.x, this.y, 5,  22, this.vx, this.vy, 6.2);
                        this.arma.auxDelayTime = 0;
                        this.dir += 1;
                    }else if(this.dir == 1){
                        this.arma.shot(this.x, this.y, 1, 2, 1, 1, 3.13);
                        //this.arma.shot(this.x, this.y, 5,  22, this.vx, this.vy, 6.2);
                        this.arma.auxDelayTime = 0;
                        this.dir += 1;
                    }else if(this.dir == 2){
                        this.arma.shot(this.x, this.y, 1, 2, 1, 1, 2.8);
                        //this.arma.shot(this.x, this.y, 5,  22, this.vx, this.vy, 6.2);
                        this.arma.auxDelayTime = 0;
                        this.dir += 1;
                    }else if(this.dir == 3){
                        this.arma.shot(this.x, this.y, 1, 2, 1, 1, 2.3);
                        //this.arma.shot(this.x, this.y, 5,  22, this.vx, this.vy, 6.2);
                        this.arma.auxDelayTime = 0;
                        this.dir += 1;
                        }
                    }
                }else{
                    if (this.arma.delayActivation < this.arma.auxDelayTime && this.active) {
                        if(this.dir == 0){
                            this.arma.shot(this.x, this.y, 1, 2, 1, 1, 93);
                            //this.arma.shot(this.x, this.y, 5,  22, this.vx, this.vy, 6.2);
                            this.arma.auxDelayTime = 0;
                            this.dir += 1;
                        }else if(this.dir == 1){
                            this.arma.shot(this.x, this.y, 1, 2, 1, 1, 100);
                            //this.arma.shot(this.x, this.y, 5,  22, this.vx, this.vy, 6.2);
                            this.arma.auxDelayTime = 0;
                            this.dir += 1;
                        }else if(this.dir == 2){
                            this.arma.shot(this.x, this.y, 1, 2, 1, 1, 101);
                            //this.arma.shot(this.x, this.y, 5,  22, this.vx, this.vy, 6.2);
                            this.arma.auxDelayTime = 0;
                            this.dir += 1;
                        }else if(this.dir == 3){
                            this.arma.shot(this.x, this.y, 1, 2, 1, 1, 70);
                            //this.arma.shot(this.x, this.y, 5,  22, this.vx, this.vy, 6.2);
                            this.arma.auxDelayTime = 0;
                            this.dir += 1;
                            }
                        }
                }
            }
            if(this.dir == 4){
                this.dir = 0;
            }
            this.arma.update(elapsed);  
        }else{
            this.desincroniza -= 1;
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
        if(this.desincroniza == 0){
            if(this.espera == 0){
                this.sprite.direction = this.di;
                this.frameCounter = (this.frameCounter +1)%(this.framesPerChange*4);
                let theFrame = parseInt(this.frameCounter/this.framesPerChange);
                if (theFrame === 0) {
                    theFrame = -1;
                    this.shooting = false;
                }
                if (theFrame === 2) {
                    theFrame = 0;
                    this.shooting= false;
                }
                if (theFrame === 1) {
                    theFrame = 1;
                    this.shooting = false;
                }
                if (theFrame === 3) {
                    theFrame = 2;
                    this.espera = 5;
                    this.shooting = true;
                }
                this.sprite.currentFrame = theFrame + 1;
            }else{
                 this.espera -= 1;
            }        
            
            this.arma.render(ctx);
        }
        if(this.active){
            this.sprite.direction = this.di;
            this.sprite.render(ctx);
        }
        
    }
}
  
    GameEngine.Enemigo2 = Enemigo2;
    return GameEngine;
  })(GameEngine || {})