var GameEngine = (function(GameEngine) {
  let gravity = 30;

  let KEY = GameEngine.KEY;
  let contador = 0;

  class Player  {
    constructor(x, y, w, h) {
      this.sprite = new GameEngine.Sprite(x,y,32,32,"images/player.svg", 5, 32, 32);
      //super(x, y, w, h, "images/player.svg", 14, 32, 32);

      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;

      this.radius = this.w / 4;

      this.frameCounter = 0;
      this.framesPerChange = 8;

      this.ladderCounter = 0;
      this.ladderFramesPerChange = 6;

      this.w_2 = w/2-1;
      this.h_2 = h/2;

      this.jump_heigth = 315;
      this.inFloor = false;

      this.shooting = false;

      this.speed = 110;
      this.vx = 0;
      this.vy = 0;
      this.canJump = true;
      this.tam = this.w;
      this.vidas = 20;

      this.disp = 0 ;
      this.cronometro = 2;
      this.danado = false;
      this.contador_dano = 0;
      this.tiempo_dano = 40; 
      this.bloqueo = false;
      
      this.arma = new GameEngine.Arma2(1000, 0.12);

     
    }

    processInput() {
      this.vx = 0;
      this.ladderVy = 0;
      this.tryGrabLadder = false;
      this.shooting = false;

      if (KEY.isReleased(KEY.X_KEY) && this.bloqueo == false) {
        this.canJump = true;
        this.shooting = false;
        this.w =  32;
        this.w_2 = 16;
      }else{
        this.w_2 = 7;
      }
      if ((KEY.isPress(KEY.X_KEY)) && (this.canJump) && (this.inFloor) && this.bloqueo == false) {
        this.vy = -this.jump_heigth;
        this.canJump = false;
        this.shooting = false;
        
      }

      if ((KEY.isPress(KEY.X_KEY)) && (this.inLadder) && this.bloqueo == false) {
        this.inLadder = false;
        //this.sprite.w = 16;
        this.w =  32;
        this.w_2 = 16;
      }

      if (KEY.isPress(KEY.LEFT) && this.bloqueo == false) {
        this.vx = -this.speed;
        //this.x = this.x-6;
        
        this.sprite.direction = -1;
        
      }
      if (KEY.isPress(KEY.RIGHT) && this.bloqueo == false) {
        this.vx = this.speed;
        //this.x = this.x+6;
        this.sprite.direction = 1;
      }

      if (KEY.isPress(KEY.Z_KEY) && this.state != "jumping" && this.bloqueo == false) {
        this.shooting = true;
        
        
      }

      if (KEY.isPress(KEY.UP) && this.bloqueo == false) {
        this.tryGrabLadder = true;
        this.ladderVy = -this.speed/2;
        if (this.inLadder) {
          
          if (((this.ladderCounter++)%this.ladderFramesPerChange) === 0) {
            this.sprite.direction *= -1;
            
          }
        }
      }
      if (KEY.isPress(KEY.DOWN)) {
        this.tryGrabLadder = true;
        this.ladderVy = this.speed/2;
        if (this.inLadder) {
          if (((this.ladderCounter++)%this.ladderFramesPerChange) === 0) {
            this.sprite.direction *= -1;
          }
        }
      }
    }

    setState() {
      if (!this.inLadder) {
        if(this.shooting ){
           this.state = "disparando"; 

        }else if (this.vx !== 0) {
          this.state = "walking";
        }
        else if (this.inFloor) {
          this.state = "still";
        }
        if (!this.inFloor) {
          this.state = "jumping";
        }     
      }
      else {
        this.state = "ladder";
      }
      if(this.state == "jumping" && KEY.isPress(KEY.Z_KEY)){
        this.state = "saltodisparo"
      }
      if(this.state == "ladder" && KEY.isPress(KEY.Z_KEY)){
        this.state = "escaleradisparo"
      }
    }

    update(elapsed) {
      this.inFloor = false;

      
      if (!this.inLadder) {
        this.vy += gravity;
        this.x += this.vx * elapsed;
        this.y += this.vy * elapsed;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        
       this.sprite.update(elapsed);
      }
      else {
        this.vx = 0;
        this.vy = this.ladderVy;
        this.y += this.vy * elapsed;
        this.sprite.y = this.y;  
        this.sprite.x = this.x+3;
        this.sprite.update(elapsed);
        
      }

      this.arma.auxDelayTime += elapsed;
      if (this.shooting) {
        if(this.sprite.direction == -1){
          if (this.arma.delayActivation < this.arma.auxDelayTime) {
            this.arma.shot(this.x, this.y+5, 1, 2, 1, 1, 3.16);
            //this.arma.shot(this.x, this.y, 5,  22, this.vx, this.vy, 6.2);
            this.arma.auxDelayTime = 0;
          }
        }else{
          if (this.arma.delayActivation < this.arma.auxDelayTime) {
            this.arma.shot(this.x, this.y+5, 1, 0, 1, 1, 6.26);
            //this.arma.shot(this.x, this.y, 5,  22, this.vx, this.vy, 6.2);
            this.arma.auxDelayTime = 0;
          }
        }
        
      }
     
      this.arma.update(elapsed);
      
    }
    
    render(ctx) {
      
      if(this.vidas > 1){
      if(this.sprite.direction == -1){
        this.sprite.x = this.sprite.x -8;
      }
      if (this.state === "walking" && this.bloqueo == false ) {
        this.frameCounter = (this.frameCounter +1)%(this.framesPerChange*4);
        let theFrame = parseInt(this.frameCounter/this.framesPerChange);
        if (theFrame === 3) {
          theFrame = 1;
        }
        this.sprite.currentFrame = 1 + theFrame;
      }
      else if (this.state === "still" && this.bloqueo == false) {
        this.sprite.currentFrame = 0;
      }else if(this.state === "escaleradisparo" && this.bloqueo == false){
        this.sprite.currentFrame = 12;
      }
      else if (this.state === "saltodisparo" && this.bloqueo == false){
        this.sprite.currentFrame = 11;
      }
      else if (this.state === "disparando" && this.bloqueo == false) {
        this.sprite.currentFrame = 7;
        if (KEY.isPress(KEY.RIGHT)) {
          this.frameCounter = (this.frameCounter +2)%(this.framesPerChange*4);
          let theFrame = parseInt(this.frameCounter/this.framesPerChange);
          if (theFrame === 0) {
            theFrame = 9;
          }
          if (theFrame === 1) {
            theFrame = 8;
          }
          if (theFrame === 2) {
            theFrame = 7;
          }
          if (theFrame === 3) {
            theFrame = 8;
          }
          this.sprite.currentFrame = 1 + theFrame;
        }
        if (KEY.isPress(KEY.LEFT)){
          this.sprite.direction = -1;
          this.frameCounter = (this.frameCounter +2)%(this.framesPerChange*4);
          let theFrame = parseInt(this.frameCounter/this.framesPerChange);
          if (theFrame === 0) {
            theFrame = 9;
          }
          if (theFrame === 1) {
            theFrame = 8;
          }
          if (theFrame === 2) {
            theFrame = 7;
          }
          if (theFrame === 3) {
            theFrame = 8;
          }
          this.sprite.currentFrame = 1 + theFrame;
        }
          
      }
      else if (this.state === "jumping" && this.bloqueo == false) {
        this.sprite.currentFrame = 4;
        
      }
      else if (this.state === "ladder" && this.bloqueo == false) {
        this.sprite.currentFrame = 5;
      }

      if(this.danado && this.tiempo_dano > 30){
        this.bloqueo = true;
        this.sprite.currentFrame = 13;
      }else{
        this.bloqueo = false;
      }
      if(this.danado){
        if(this.contador_dano % 2 == 0){
          this.sprite.render(ctx)
          this.arma.render(ctx);
          this.contador_dano += 1;
        }else{
          this.arma.render(ctx);
          this.contador_dano += 1;
        }
        this.tiempo_dano -= 1;    
      }else{
        this.sprite.render(ctx)
        this.arma.render(ctx);
      }
      if(this.tiempo_dano == 0){
        this.danado = false;
        this.tiempo_dano = 40;
      }
    }
      
    }
  }

  GameEngine.Player = Player;
  return GameEngine;
})(GameEngine || {})