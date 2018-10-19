var GameEngine = (function(GameEngine) {
    let gravity = 20;
  
    let KEY = GameEngine.KEY;
    
    
  
    class Enemigo1  {
      constructor(x, y, w, h,sumaX,sumaY) {
        this.sprite = new GameEngine.Sprite(x,y,16,32,"images/enemy01.png", 14, 16, 32);
        //this.item =  new GameEngine.item(10,10,16,16);
  
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sumaX = sumaX;
        this.sumaY = sumaY;
  
        this.frameCounter = 1;
        this.framesPerChange = 16;
        this.numFrameAnimation = 2;


        this.jumpWait = 0.6;
        this.jumpCounter = this.jumpWait;
  
        this.ladderCounter = 0;
        this.ladderFramesPerChange = 8;
  
        this.w_2 = w/2;
        this.h_2 = h/2+1;
  
        this.speed = 100000;
        this.jump_heigth = 240;
        this.inFloor = false;
  
       
        this.vx = -25;
        this.vy = 0;
        this.canJump = true;
        this.active = false;
        this.cambio = 1;
        this.dormido = 0;
        this.derecha =  true;
        this.contador = 0;
        this.bloquea = false;
        this.cronometro = 60;
        this.tiene_arma = false;

        this.bandera = false;
        this.radius = this.w;
        this.c = 0;
        this.vidas = 1;
        this.item_activo = false;

       
      }

      lerp(v0, v1, t) {
        return v0  + (v1 - v0)*t;
      }
  
      processInput() {
        
      }
  
      setState() {
        
      }
  
      update(elapsed, level, cw, ch, camera, player) {
        if(this.vidas == 0){
          this.active = false;
        } 
        if(this.active){
          this.c += 1;
        }
        if(this.dormido != 0 && this.derecha == false && this.bloquea == false){
          this.x = this.x - 3;
          this.y = this.y - 3;
          this.sprite.direction = (this.x > player.x) ? 1 : -1;
          this.sprite.x = this.x;
          this.sprite.y = this.y;
          this.dormido -= 1;
          if(this.cambio == 1){
            this.sprite.currentFrame = 0;
            this.cambio *= -1;
          }else{
            this.sprite.currentFrame = 1;
            this.cambio *= -1;
          }
        }

        if(this.dormido != 0 && this.derecha == true && this.bloquea == false){
          this.x = this.x + 3;
          this.y = this.y - 3;
          this.sprite.direction = (this.x > player.x) ? 1 : -1;
          this.sprite.x = this.x;
          this.sprite.y = this.y;
          this.dormido -= 1;
          if(this.cambio == 1){
            this.sprite.currentFrame = 0;
            this.cambio *= -1;
          }else{
            this.sprite.currentFrame = 1;
            this.cambio *= -1;
          }
        }

       
        if (this.active && this.sprite.x - player.x < 60 && this.dormido == 0 && this.bloquea == false) {
            this.inFloor = false;
            if(this.derecha){
              this.x = this.lerp(this.x- this.sumaX, player.x, 0.40);  
              this.y = this.lerp(this.y+ this.sumaY, player.y, 0.40);
            }else{
              this.x = this.lerp(this.x+ this.sumaX, player.x, 0.40);
              this.y = this.lerp(this.y+this.sumaY, player.y, 0.40);
            }
            
            
    
            this.sprite.direction = (this.x > player.x) ? 1 : -1;
    
            this.sprite.x = this.x;
            this.sprite.y = this.y;

            
    
            //this.frameCounter = (this.frameCounter +1)%(this.framesPerChange*this.numFrameAnimation);
            if(this.cambio == 1){
                this.sprite.currentFrame = 0;
                this.cambio *= -1;
            }else{
                this.sprite.currentFrame = 1;
                this.cambio *= -1;
            }

            if(this.sprite.x - player.x  < 1 && this.derecha){
              this.dormido = 20;
              this.derecha = false;
              this.contador += 1;
            }
            if(this.sprite.x - player.x > 1 && this.derecha == false){
              this.dormido = 20;
              this.derecha = true;
              this.contador += 1;
            }
            
    
            this.checkCollisionWalls(cw, ch, camera);
           
        }

        if (this.active && this.sprite.x - player.x > 60 && this.dormido == 0 && this.bloquea == false) {
          this.inFloor = false;
  
          this.x = this.lerp(this.x, player.x, 0.03);
          //this.y = this.lerp(this.y, player.y, 0.03);
  
          this.sprite.direction = (this.x > player.x) ? 1 : -1;
  
          this.sprite.x = this.x;
          this.sprite.y = this.y;

          
  
          //this.frameCounter = (this.frameCounter +1)%(this.framesPerChange*this.numFrameAnimation);
          if(this.cambio == 1){
              this.sprite.currentFrame = 0;
              this.cambio *= -1;
          }else{
              this.sprite.currentFrame = 1;
              this.cambio *= -1;
          }
          
          this.checkCollisionWalls(cw, ch, camera);  
      }
      if(this.active &&  this.contador == 10 && this.derecha){   
        this.cronometro-=1;
        this.bloquea = true;
        this.x = this.x + 6;
        this.y = this.y - 6;
        this.sprite.direction = (this.x > player.x) ? 1 : -1;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.dormido -= 1;
        if(this.cambio == 1){
          this.sprite.currentFrame = 0;
          this.cambio *= -1;
        }else{
          this.sprite.currentFrame = 1;
          this.cambio *= -1;
        }
        if(this.cronometro == 0){
          this.active = false;
        }
      }

      if(this.active && this.contador == 10 && this.derecha == false){
        this.cronometro-=1;
        this.bloquea = true;
        this.x = this.x - 6;
        this.y = this.y - 6;
        this.sprite.direction = (this.x > player.x) ? 1 : -1;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.dormido -= 1;
        if(this.cambio == 1){
          this.sprite.currentFrame = 0;
          this.cambio *= -1;
        }else{
          this.sprite.currentFrame = 1;
          this.cambio *= -1;
        }
        if(this.cronometro == 0){
          this.active = false;
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
        }else if(!this.active && this.c != 0){
          //this.item = new GameEngine.item(this.sprite.x,this.sprite.y,16,16);
          //this.item.render(ctx);
          //this.item_activo = true;
          //console.log(this.item.x);
      }
    }
  }
  
    GameEngine.Enemigo1 = Enemigo1;
    return GameEngine;
  })(GameEngine || {})