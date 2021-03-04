var GameEngine = (function(GameEngine) {
  let cw;
  let ch;

  let KEY = GameEngine.KEY;
  let bPool;
  let bbPool = [];

  class Game {
    constructor(ctx) {
      cw = ctx.canvas.width;
      ch = ctx.canvas.height;
      this.ctx = ctx;


      this.enemigos = [];
      this.final = false;

      this.background_audio = new Audio("images/cutman.mp3");
      this.background_audio.loop = true;
      this.background_audio.volume = 0.5;
      this.background_audio.addEventListener("canplay", function() {
        this.play();
      });

      this.camera = new GameEngine.Camera(cw/2, ch/2, cw, ch + 18);

      this.image = new Image();
      this.image.src = "images/p04_001.png";

      this.player = new GameEngine.Player(100, 2080, 30, 30);
      this.vidas = new GameEngine.Vidas();
      this.vidas2 = new GameEngine.Vidas2();
      this.enemigos.push (new GameEngine.jefe(3300,870, 16, 16)); 
      //this.enemigos.push (new GameEngine.Enemigo3(68, 2000, 16, 16)); 
      this.enemigos.push (new GameEngine.Enemigo4(1452, ch + 882, 16, 16,0,120)); 
      this.enemigos.push (new GameEngine.Enemigo4(1383, ch + 820, 16, 16,0,120));
      this.enemigos.push (new GameEngine.Enemigo4(1460, ch + 855, 16, 16,120,0));
      this.enemigos.push (new GameEngine.Enemigo4(1369, ch + 616, 16, 16,0,120));
      this.enemigos.push (new GameEngine.Enemigo4(1490, ch + 616, 16, 16,120,0));
      this.enemigos.push (new GameEngine.Enemigo4(1390, ch + 584, 16, 16,120,0));
      this.enemigos.push (new GameEngine.Enemigo4(1360, ch + 551, 16, 16,-120,0));
      this.enemigos.push (new GameEngine.Enemigo4(1385, ch + 408, 16, 16,-120,0));
      this.enemigos.push (new GameEngine.Enemigo4(1415, ch + 425, 16, 16,0,-120));
      this.enemigos.push (new GameEngine.Enemigo4(1415, ch + 340, 16, 16,-120,0));
      this.enemigos.push (new GameEngine.Enemigo4(1445, ch + 310, 16, 16,-120,0));
      this.enemigos.push (new GameEngine.Enemigo4(1340, ch + 168, 16, 16,120,0));
      this.enemigos.push (new GameEngine.Enemigo4(1337, ch + 120, 16, 16,0,-120));
      this.enemigos.push (new GameEngine.Enemigo4(1320, ch + 73, 16, 16,120,0));
      this.enemigos.push (new GameEngine.Enemigo4(1425, ch + 135, 16, 16,-120,0));
      this.enemigos.push (new GameEngine.Enemigo4(1480, ch + 40, 16, 16,0,-120));

      this.enemigos.push (new GameEngine.Enemigo7(1992, 900, 32, 64));

      this.enemigos.push (new GameEngine.Enemigo5(1140, ch + 850, 16, 16));
      this.enemigos.push (new GameEngine.Enemigo5(1080, ch + 900, 16, 16));
      this.enemigos.push (new GameEngine.Enemigo5(1160, ch + 800, 16, 16));

      this.enemigos.push (new GameEngine.Enemigo1(390, ch + 1760, 16, 32,10,20));
      this.enemigos.push (new GameEngine.Enemigo1(440, ch + 1820, 16, 32,12,21));
      this.enemigos.push (new GameEngine.Enemigo1(290, ch + 1740, 16, 32,13,22));
      this.enemigos.push (new GameEngine.Enemigo1(1980, 80, 16, 32,10,20));
      this.enemigos.push (new GameEngine.Enemigo1(2030, 140, 16, 32,12,21));
      this.enemigos.push (new GameEngine.Enemigo1(1800, 80, 16, 32,13,22));

      //this.enemigos.push (new GameEngine.Enemigo3(1440, 10, 8, 8));

      this.enemigos.push (new GameEngine.Enemigo2(825, 1993, 16, 16,0,120,0,-1));
      this.enemigos.push (new GameEngine.Enemigo2(953, 2050, 16, 16,0,120,20,-1));
      this.enemigos.push (new GameEngine.Enemigo2(985, 1830, 16, 16,0,120,10,-1));
      this.enemigos.push (new GameEngine.Enemigo2(890, 1768, 16, 16,0,120,15,-1));
      this.enemigos.push (new GameEngine.Enemigo2(920, 1736, 16, 16,0,120,21,-1));
      this.enemigos.push (new GameEngine.Enemigo2(840, 1625, 16, 16,0,120,5,1));
      this.enemigos.push (new GameEngine.Enemigo2(890, 1560 , 16, 16,0,120,17,-1));
      this.enemigos.push (new GameEngine.Enemigo2(953, 1497 , 16, 16,0,120,12,-1));
      this.enemigos.push (new GameEngine.Enemigo2(887, 1417 , 16, 16,0,120,22,1));
      this.enemigos.push (new GameEngine.Enemigo2(953, 1290 , 16, 16,0,120,13,-1));
      this.enemigos.push (new GameEngine.Enemigo2(920, 1240 , 16, 16,0,120,3,-1));

      this.enemigos.push (new GameEngine.Enemigo6(2020, 350 , 18, 32,0,120,3,-1));
      this.enemigos.push (new GameEngine.Enemigo6(2020, 600 , 18, 32,0,120,3,-1));

      this.pantalla_inicio = true;
      

      this.level = new GameEngine.Level();

      window.addEventListener("keydown", function(evt) {
        KEY.onKeyDown(evt.keyCode);
      });
      window.addEventListener("keyup", function(evt) {
        KEY.onKeyUp(evt.keyCode);
      });
    }

    processInput() {
      if(this.pantalla_inicio == false){
        this.player.processInput();
      }
      if(KEY.isPress(KEY.ENTER)){
        this.pantalla_inicio = false;
      }
      
    }

    update(elapsed) {
      
      if(this.pantalla_inicio == false){
        bPool = this.player.arma.bullets;  
        for (let i=0; i < this.enemigos.length; i ++){
          if(this.enemigos[i].tiene_arma && this.enemigos[i].active){
            bbPool.push(this.enemigos[i].arma.bullets);
          }
        }   
        if ((this.player.tryGrabLadder) && (!this.player.inLadder)) {
          this.checkCollisionLadders(this.player, this.level);
        }
        this.player.update(elapsed);
        for (let bullet_i=0; bullet_i<bPool.length; bullet_i++) {
          if (bPool[bullet_i].isAlive) {
            for (let asteroid_i=0; asteroid_i<this.enemigos.length; asteroid_i++) {
              if ( this.enemigos[asteroid_i].jump_heigth != 600 && (this.enemigos[asteroid_i].active) && (this.checkCircleCollision(bPool[bullet_i], this.enemigos[asteroid_i], "bala-enemigo")) ) {
                bPool[bullet_i].isAlive = false;
                this.enemigos[asteroid_i].bandera = true;
                this.enemigos[asteroid_i].vidas -=1;
                //console.log(this.enemigos[asteroid_i].active);
              }
            }
          }
        }

        for (let bullet_i=0; bullet_i<bPool.length; bullet_i++) {
          if (bPool[bullet_i].isAlive) {
            for (let asteroid_i=0; asteroid_i<this.enemigos.length; asteroid_i++) {
              if ( (this.enemigos[asteroid_i].active && this.enemigos[asteroid_i].jump_heigth == 600 
                    ) && (this.checkCircleCollision(bPool[bullet_i], this.enemigos[asteroid_i], "bala-enemigo")) ) {
                bPool[bullet_i].isAlive = false;
                this.enemigos[asteroid_i].bandera = true;
                this.enemigos[asteroid_i].vidas -=1;
                this.enemigos[asteroid_i].danado = true;
                //console.log(this.enemigos[asteroid_i].active);
              }
            }
          }
        }
        

        for(let i=0; i < bbPool.length; i++){
          for(let j = 0; j < bbPool[i].length; j++){
            if(bbPool[i][j].isAlive){
              if(this.checkCircleCollision(bbPool[i][j], this.player, "bala-megaman")){
                bbPool[i][j].isAlive = false;
                this.player.danado = true;
                if(this.player.tiempo_dano == 40){
                  this.player.vidas -= 1;
                }
                
              }
            }
          }
        }
        
        for (let asteroid_i=0; asteroid_i<this.enemigos.length; asteroid_i++) {
          if ( (this.enemigos[asteroid_i].active) && (this.checkCircleCollision(this.player, this.enemigos[asteroid_i], "megaman-enemigo")) ) {
            this.player.danado = true;
            if(this.player.tiempo_dano == 40){
              this.player.vidas -= 1;
            }
           
          }
        }
        if (this.player.inLadder) {
          this.checkInLadders(this.player, this.level);
        }
        this.checkCollisionPlatforms(this.player, this.level);
        if (this.player.inFloor) {
          this.player.inLadder = false;
        }
        this.player.setState();
        this.camera.update(this.player, this.level);
        this.checkCollisionWalls();
        for (let i=0, l=this.enemigos.length; i<l; i++) {
          if (Math.abs(this.camera.x - this.enemigos[i].x) < cw/2 && this.enemigos[i].bandera == false) {
            this.enemigos[i].active = true;
          }
          this.enemigos[i].update(elapsed, this.level, cw, ch, this.camera, this.player);
        }
      }
      
      if(this.player.vidas < 0 && this.player.x < 1200 ){
        this.player.vidas = 28;
        this.player.x = 50;
        this.player.y =  2000;
        this.player.danado = false;
      }else if(this.player.x > 1200 && this.player.x < 1800 && this.player.vidas < 0){
        this.player.vidas = 28;
        this.player.x = 980;
        this.player.y =  1700;
        this.player.danado = false;
      }else if(this.player.x > 1800 && this.player.x < 2200 && this.player.vidas < 0){
        this.player.vidas = 28;
        this.player.x = 1500;
        this.player.y =  1000;
        this.player.danado = false;
      }else if(this.player.x > 2350 && this.player.x < 3700 && this.player.vidas < 0){
        this.player.vidas = 28;
        this.player.x = 2190;
        this.player.y =  850;
        this.player.danado = false;
        this.final = false;
      }

      if(this.player.x >= 2250 && this.final == false){
        this.player.x = 2350;
        this.final = true;

      }
    }


    checkCircleCollision(obj1, obj2, tmpmsg) {
      let dist = Math.sqrt( (obj1.x - obj2.x)*(obj1.x - obj2.x) + (obj1.y - obj2.y)*(obj1.y - obj2.y) );
      if (dist < obj1.radius + obj2.radius) {
        return true;
      }
      return false;
    }



    checkCollisionLadders(player, level) {
      let player_tile_pos = level.getTilePos(player.x, player.y);
      
      let ladder;

      // top
      ladder = level.getPlatform(player_tile_pos.x, player_tile_pos.y-1);
      if (ladder && (ladder.type === "Ladder") && (player.ladderVy < 0)) {
        this.player.x = ladder.x;
        this.player.inLadder = true;
        return;
      }

      //center
      ladder = level.getPlatform(player_tile_pos.x, player_tile_pos.y);
      if (ladder && (ladder.type === "Ladder")) {
        this.player.x = ladder.x -3;
        this.player.inLadder = true;
        return;
      }

      // bottom
      ladder = level.getPlatform(player_tile_pos.x, player_tile_pos.y+1);
      if (ladder && (ladder.type === "Ladder") && (player.ladderVy > 0)) {
        this.player.x = ladder.x;
        this.player.inLadder = true;
        return;
      }
    }

    checkInLadders(player, level) {
      let player_tile_pos = level.getTilePos(player.x, player.y + player.h_2);
      let ladder;
      //center
      ladder = level.getPlatform(player_tile_pos.x, player_tile_pos.y);
      if (ladder && (ladder.type === "Ladder")) {
        this.player.inLadder = true;
        this.player.w = 16;
        this.player.w_2 = 8;
      }
      else {
        this.player.inLadder = false;
        this.player.w = 32;
        this.player.w_2 = 16;
      }
    }

    checkCollisionWalls() {
      //if (this.player.x < this.camera.x -cw/2 +this.player.w_2) {
        //this.player.x = this.camera.x -cw/2 +this.player.w_2;
      //}
      //if (this.player.x > this.camera.x +cw/2 -this.player.w_2) {
        //this.player.x = this.camera.x +cw/2 -this.player.w_2;
      //}

      //if (this.player.y > ch-this.player.h_2) {
        //this.player.y = 0;
        //this.player.vy = 0;
      //}
    }

    checkCollisionPlatforms(player, level) {
      let player_tile_pos = level.getTilePos(player.x, player.y);

      //center
      this.reactCollision(player, level.getPlatform(player_tile_pos.x,   player_tile_pos.y));
      // left
      this.reactCollision(player, level.getPlatform(player_tile_pos.x-1, player_tile_pos.y));
      // right
      this.reactCollision(player, level.getPlatform(player_tile_pos.x+1, player_tile_pos.y));

      // top
      this.reactCollision(player, level.getPlatform(player_tile_pos.x,   player_tile_pos.y-1));
      // bottom
      this.reactCollision(player, level.getPlatform(player_tile_pos.x,   player_tile_pos.y+1));

      // left top
      this.reactCollision(player, level.getPlatform(player_tile_pos.x-1, player_tile_pos.y-1));
      // right top
      this.reactCollision(player, level.getPlatform(player_tile_pos.x+1, player_tile_pos.y-1));

      // left bottom
      this.reactCollision(player, level.getPlatform(player_tile_pos.x-1, player_tile_pos.y+1));
      // right bottom
      this.reactCollision(player, level.getPlatform(player_tile_pos.x+1, player_tile_pos.y+1));
    }

    reactCollision(player, platform, type) {
      if ( platform &&
           platform.type === "Platform" &&
           Math.abs(player.x - platform.x) + 6 < player.w_2 + platform.w_2 && 
           Math.abs(player.y - platform.y) < player.h_2   + platform.h_2  ) {
        

        let overlapX = (player.w_2 + platform.w_2) - Math.abs(player.x - platform.x);
        let overlapY = (player.h_2    + platform.h_2   ) - Math.abs(player.y - platform.y);

        if (overlapX < overlapY) {
          if (player.x - platform.x > 0) {
            player.x += overlapX - 6;
          }
          else {
            player.x -= overlapX-6;
          }
        }
        else if (overlapX > overlapY) {
          if (player.y - platform.y > 0) {
            player.y += overlapY;
            if (player.vy < 0) {
              player.vy = 0;
            }
          }
          else {
            player.y -= overlapY;
            if (player.vy > 0) {
              player.inFloor = true;
              player.vy = 0;
            }
          }
        }
      }
    }

    render() {
      if(this.pantalla_inicio == false){
        
        this.ctx.fillStyle = "#5ad0e1";
        this.ctx.fillRect(0, 0, cw, ch);
  
        this.camera.applyTransform(this.ctx);
  
        this.level.render(this.ctx);
        this.player.render(this.ctx);
        
        for (let i=0, l=this.enemigos.length; i<l; i++) {
          if (Math.abs(this.camera.x - this.enemigos[i].x) < cw/2 && this.enemigos[i].bandera == false && Math.abs(this.camera.y - this.enemigos[i].y)) {
            this.enemigos[i].active = true;
          }
          this.enemigos[i].render(this.ctx);
        }
  
        this.camera.releaseTransform(this.ctx);  
      }else{
        if (this.image) {
          this.ctx.drawImage(this.image, 0, 0);
        }
        else {
          this.ctx.fillStyle = "#664411";
          this.ctx.fillRect(0, 0, this.cw, this.ch);
        }
        
      }
      this.vidas.render(this.ctx,this.player.vidas);
      if(this.final){
        this.vidas2.render(this.ctx,this.enemigos[0].vidas);
      }
    }
  }

  GameEngine.Game = Game;
  return GameEngine;
})(GameEngine || {})