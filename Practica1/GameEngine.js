var GameEngine = (function(GameEngine) {
  let cw;
  let ch;
  let rect_x;
  let rect_y;
  let rect_w;
  let rect_h;
  let rect_x2;
  let rect_y2;
  let rect_w2;
  let rect_h2;
  let cont = 0;
  let cont2 = 0;
  let state = 0;

  let Key = {
    _pressed : {},
    UP: 38,
    DOWN: 40,
    W:87,
    S:83,
    space:32,

    isPress: function(keyCode) {
      return this._pressed[keyCode];
    },
    onKeyDown: function(keyCode) {
      this._pressed[keyCode] = true;
    },
    onKeyUp: function(keyCode) {
      delete this._pressed[keyCode];
    }
  }

  class Game {
    constructor(ctx) {
      cw = ctx.canvas.width;
      ch = ctx.canvas.height;
      this.ctx = ctx;

      let radius = 10;
      this.ball = new GameEngine.Ball(cw/2, ch/2, radius);
      
      rect_w = 15;
      rect_x = 0 + rect_w/2;
      rect_y = ch/2;
      rect_h = 90;

      rect_w2 = 15;
      rect_x2 = cw - rect_w2/2;
      rect_y2 = ch/2;
      rect_h2 = 90;
      
      window.addEventListener("keydown", function(evt) {
        Key.onKeyDown(evt.keyCode);
        text_keycode = "keyCode = " + evt.keyCode;
      });
      window.addEventListener("keyup", function(evt) {
        Key.onKeyUp(evt.keyCode);
      });
    }    
    processInput() {
      if(state == 3 || state == 2){
        if(Key.isPress(Key.space)){
          document.location.reload();
        }  
      }
      if(Key.isPress(Key.space)){     
        state = 1;
      }
      if(state == 1){
        if (Key.isPress(Key.UP)) {
          rect_y2 -= 7;
        }
        if (Key.isPress(Key.DOWN)) {
          rect_y2 += 7;
        }
        if (Key.isPress(Key.W)) {
          rect_y -= 7;
        }
        if (Key.isPress(Key.S)) {
          rect_y += 7;
        }
      }
    }

    update(elapsed) {
      if(state == 2 || state == 3){
        rect_w = 15;
        rect_x = 0 + rect_w/2;
        rect_y = ch/2;
        rect_h = 80;
        rect_w2 = 15;
        rect_x2 = cw - rect_w2/2;
        rect_y2 = ch/2;
        rect_h2 = 90;
      }
      if (rect_y - rect_h/2 <= 0) 
        rect_y = rect_h/2;
      
      if (rect_y + rect_h/2 >= ch) 
        rect_y = ch - rect_h/2;
      
      if (rect_y2 - rect_h/2 <= 0) 
        rect_y2 = rect_h/2;
      
      if (rect_y2 + rect_h/2 >= ch) 
        rect_y2 = ch - rect_h/2;
      
      if (this.ball.x < this.ball.size) {
        this.ball.x =  0 + cw/2;
        this.ball.y = ch/2;
        this.ball.vx = 200;       
        cont++;      
     }
      if (this.ball.x > cw-this.ball.size) {
        this.ball.x =  0 + cw/2;
        this.ball.y = ch/2;
        this.ball.vx = -200;       
        cont2++;      
      }
      if(cont == 5){
        cont = 0;
        cont2 = 0;
        state = 2;
      }
      if(cont2 == 5){
        cont = 0;
        cont2 = 0;
        state = 3;
      }
     if (this.ball.x  < rect_w * 2 && this.ball.y < rect_y + rect_h/2 + 1 
        && this.ball.y > rect_y-rect_h/2 ) {
        this.ball.vx *= -1.1;
        this.ball.x = rect_w * 2;      
      }
      if (this.ball.x > cw - rect_w * 2 && this.ball.y < rect_y2 + rect_h2/2 + 1
         && this.ball.y > rect_y2-rect_h2/2 ) {
        this.ball.vx *= -1.1;
        this.ball.x = cw - rect_w * 2;
      }
      if (this.ball.y < this.ball.size) {
        this.ball.vy *= -1;
        this.ball.y = this.ball.size;
      }
      if (this.ball.y > ch-this.ball.size) {
        this.ball.vy *= -1;
        this.ball.y = ch-this.ball.size;
      }     
      if(state == 1)
        this.ball.update(elapsed);
    }

    render() {
      this.ctx.clearRect(0, 0, cw, ch);

      this.ctx.fillStyle = "white";
      this.ctx.beginPath();
      this.ctx.fillRect(rect_x - rect_w/2, rect_y-rect_h/2, rect_w, rect_h);

      this.ctx.fillStyle = "white";
      this.ctx.beginPath();
      this.ctx.fillRect(rect_x2 - rect_w/2, rect_y2-rect_h/2, rect_w, rect_h);

      this.ctx.fillStyle = "black";
      this.ctx.strokeStyle = "white";
      this.ctx.lineWidth = 5;
      this.ctx.lineJoin = "round";
      this.ctx.font = "bold 50px Monospace";
      
      this.ctx.strokeText(cont, 240, 45);
      this.ctx.fillText(cont, 240, 45);
      this.ctx.strokeText(cont2, 370, 45);
      this.ctx.fillText(cont2, 370, 45);

      if(state == 0){
        this.ctx.fillStyle = "black";
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.lineJoin = "round";
        this.ctx.font = "bold 20px Monospace";
        this.ctx.strokeText("Preciona espacio para comenzar", cw/2-150, ch/2 + 150);
        this.ctx.fillText("Preciona espacio para comenzar", cw/2-150, ch/2+150);
            
      }
      if(state == 2){
        this.ctx.fillStyle = "black";
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.lineJoin = "round";
        this.ctx.font = "bold 20px Monospace";
        this.ctx.strokeText("Gana el jugador 1", cw/2-90, ch/2 + 50);
        this.ctx.fillText("Gana el jugador 1" , cw/2-90, ch/2+50);
        this.ctx.strokeText("Presiona espacio para comenzar", cw/2-150, ch/2 + 150);
        this.ctx.fillText("Presiona espacio para comenzar", cw/2-150, ch/2+150);  
      }

      if(state == 3){
        this.ctx.fillStyle = "black";
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.lineJoin = "round";
        this.ctx.font = "bold 20px Monospace";
        this.ctx.strokeText("Gana el jugador 2", cw/2-90, ch/2 + 50);
        this.ctx.fillText("Gana el jugador 2" , cw/2-90, ch/2+50);
        this.ctx.strokeText("Presiona espacio para comenzar", cw/2-150, ch/2 + 150);
        this.ctx.fillText("Presiona espacio para comenzar", cw/2-150, ch/2+150);        
      }
      this.ctx.beginPath();
      this.ctx.fillStyle = "white"
      this.ctx.moveTo(cw/2,0);
      this.ctx.lineTo(cw/2,ch);
      this.ctx.stroke();
       
      this.ball.render(this.ctx);
    }
  }

  GameEngine.Game = Game;
  return GameEngine;
})(GameEngine || {})
