var GameEngine = (function(GameEngine) {
  let cw;
  let ch;

  let KEY = GameEngine.KEY;

  let aPool;
  let bPool;

  let puntaje = 0;
  let vidas = 3;
  let estado = 0;
  let cronometro = 80;
  let cronometro2 = 0;
  cronometro3 = 500;
  let activos = 0;
  

  class Game {
    constructor(ctx) {
      cw = ctx.canvas.width;
      ch = ctx.canvas.height;
      this.ctx = ctx;

      this.ship = new GameEngine.Ship(cw/2, ch/2, 40);
      this.corazon = new GameEngine.Vidas(cw - 15, 13, 20);
      this.powerUp = new GameEngine.PowerUp(-10,-10,20);
      this.asteroidPool = new GameEngine.AsteroidPool(cw, ch);
      this.asteroidPool.addAsteroid();
      this.asteroidPool.addAsteroid();
      this.inmune = false;
      
      window.addEventListener("keydown", function(evt) {
        KEY.onKeyDown(evt.keyCode);
      });
      window.addEventListener("keyup", function(evt) {
        KEY.onKeyUp(evt.keyCode);
      });
    }


    processInput() {
      if(estado == 2 && KEY.isPress(KEY.SPACE)){
        document.location.reload();
      }
      if(estado == 1){
        this.ship.processInput();
      }  
      if (KEY.isPress(KEY.SPACE)) {
        estado = 1;
      }
    }

    update(elapsed) {
      cronometro -= 1;
      if(this.inmune == false && this.powerUp.isAlive == false){
        cronometro3 -= 1;
      }
      if(cronometro3 == 0){
        this.powerUp.isAlive = true;
      }
      if(this.inmune == true){
        cronometro2 -=1;
      }
      if(cronometro2 == 0){
        this.inmune = false;
        cronometro2 = 160;
      }
      if(cronometro == 0){
        for(let i = 0; i < this.asteroidPool.asteroids.length; i++){
          if(this.asteroidPool.asteroids[i].isAlive){
            activos += 1;
          }
          
        }
        if(activos < 8){
          this.asteroidPool.addAsteroid();
        }
        activos = 0;
        cronometro = 80;
      }

      if(estado == 1){
        aPool = this.asteroidPool.asteroids;
        bPool = this.ship.weapon.bullets;

        this.ship.update(elapsed);
        this.asteroidPool.update(elapsed);

        this.checkBorders(this.ship);
        this.checkBorders(this.powerUp);
        if(this.checkCircleCollision(this.ship, this.powerUp, "nave-escudo") && this.inmune == false
        && this.powerUp.isAlive){
          this.powerUp.isAlive = false;
          this.inmune = true;
          cronometro2 = 160;
          cronometro3 = 500;
        }

        for (let i=0; i<aPool.length; i++) {
          if (aPool[i].isAlive) {
            this.checkBorders(aPool[i]);
          }
        }

        for (let i=0; i<bPool.length; i++) {
          if (bPool[i].isAlive) {
            this.checkBorders(bPool[i]);
          }
        }

        for (let i=0; i<aPool.length; i++) {
          if(aPool[i].isAlive && this.checkCircleCollision(this.ship, aPool[i], "nave-asteroide")){
            if(this.inmune == false){
              vidas -= 1;
            }
            aPool[i].isAlive = false;
          }

        }

        for (let bullet_i=0; bullet_i<bPool.length; bullet_i++) {
          if (bPool[bullet_i].isAlive) {
            for (let asteroid_i=0; asteroid_i<aPool.length; asteroid_i++) {
              if ( (aPool[asteroid_i].isAlive) && (this.checkCircleCollision(bPool[bullet_i], aPool[asteroid_i], "bala-asteroide")) ) {
                bPool[bullet_i].isAlive = false;
                this.asteroidPool.split(asteroid_i,bPool[bullet_i].x,bPool[bullet_i].y);
                if(aPool[asteroid_i].hp == 2)
                  puntaje += 20;
                if(aPool[asteroid_i].hp == 1)
                  puntaje += 50;
                if(aPool[asteroid_i].hp == 3)
                  puntaje += 100;
              }
            }
          }
        }
        if(this.powerUp.isAlive)
          this.powerUp.update(elapsed);
      }
      if(vidas == 0){
        estado = 2;
        this.ship.x = cw /2; 
        this.ship.y = ch /2;
        for(let asteroid_i = 0; asteroid_i < aPool.length; asteroid_i++) {
          aPool[asteroid_i].isAlive = false;
        }
        for(let bullet_i = 0; bullet_i < bPool.length; bullet_i++){
          bPool[bullet_i].isAlive = false;
        }
        this.powerUp.isAlive = false;
      }
    }

    checkCircleCollision(obj1, obj2, tmpmsg) {
      let dist = Math.sqrt( (obj1.x - obj2.x)*(obj1.x - obj2.x) + (obj1.y - obj2.y)*(obj1.y - obj2.y) );
      if (dist < obj1.radius + obj2.radius) {
        console.log("colision", tmpmsg);
        return true;
      }
      return false;
    }

    checkBorders(gameObject) {
      if (gameObject.x < -gameObject.radius) {
        gameObject.x = cw + gameObject.radius;
      }
      if (gameObject.x > cw+gameObject.radius) {
        gameObject.x = -gameObject.radius;
      }
      if (gameObject.y < -gameObject.radius) {
        gameObject.y = ch + gameObject.radius;
      }
      if (gameObject.y > ch+gameObject.radius) {
        gameObject.y = -gameObject.radius;
      }
    }

    render() {
      this.ctx.fillStyle = "rgba(0,0,0,1)";
      this.ctx.fillRect(0, 0, cw, ch);
      this.ship.render(this.ctx,this.inmune);
      this.powerUp.render(this.ctx);  
      this.corazon.render(this.ctx);
      this.asteroidPool.render(this.ctx);
      //Vidas
      this.ctx.fillStyle = "#ffffff";
      this.ctx.strokeStyle = "#ffffff";
      this.ctx.lineWidth = 2;
      this.ctx.lineJoin = "round";
      this.ctx.font = "bold 23px Monospace";
      this.ctx.fillText(vidas, cw - 40, 20);
      this.ctx.strokeText(vidas,cw - 40,20);
      //Puntaje
      this.ctx.fillStyle = "#ffffff";
      this.ctx.strokeStyle = "#ffffff";
      this.ctx.lineWidth = 2;
      this.ctx.lineJoin = "round";
      this.ctx.font = "bold 23px Monospace";
      this.ctx.fillText(puntaje, 5, 20);
      this.ctx.strokeText(puntaje,5,20);
      if(estado == 0){
        this.ctx.fillStyle = "black";
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.lineJoin = "round";
        this.ctx.font = "bold 20px Monospace";   
        this.ctx.strokeText("Presiona espacio para comenzar", cw/2-150, ch/2 + 150);
        this.ctx.fillText("Presiona espacio para comenzar", cw/2-150, ch/2+150); 
      }

      if(estado ==  2){
        this.ctx.fillStyle = "black";
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.lineJoin = "round";
        this.ctx.font = "bold 20px Monospace";   
        this.ctx.strokeText("Juego terminado", cw/2 - 80, ch/2 + 100);
        this.ctx.fillText("Juego terminado", cw/2 - 80, ch/2+100); 
        this.ctx.strokeText("Pesiona espacio para jugar de nuevo", cw/2 - 180, ch/2 + 150);
        this.ctx.fillText("Pesiona espacio para jugar de nuevo", cw/2 - 180, ch/2+150); 
      } 
      
    }
  }

  GameEngine.Game = Game;
  return GameEngine;
})(GameEngine || {})