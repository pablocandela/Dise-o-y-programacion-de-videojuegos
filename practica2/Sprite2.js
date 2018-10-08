var GameEngine = (function(GameEngine) {
  

  let Key = GameEngine.KEY;
  

    class Sprite2 {
      constructor(x, y, w, h,img_path) {
        this.x = x;
        this.y = y;  
        this.w = w;
        this.h = h;
        this.bounce = -0.9;
        this.gravity = 10;
        this.muerto = false;

        this.lado_izquierdo = false;
        this.muerto = 0;
        this.en_balanza = false;
        this.bote_inicial = true;
        this.pos_x_balanza = 0;
        this.colision_balanza = 0;
        this.tranquilo = 1;
        this.te_toca = 0;
        this.bandera = false;
        
      
        this.image = new Image();
        this.image.src = img_path;

        this.speed = 585;
        
        this.angle = (360 * Math.random()) ;
        this.vx = -(Math.cos(293* Math.PI/180) * this.speed);
        this.vy = (Math.sin(293* Math.PI/180) * this.speed);
        
        
      }
  
      processInput() { 
        

        if(Key.isPress(Key.RIGHT) && this.en_balanza == true && this.x < 640 - 190
          && this.lado_izquierdo == true ){
         this.x += 7;     
        }
        if(Key.isPress(Key.LEFT) && this.en_balanza == true && this.x > 32.5
          && this.lado_izquierdo == true){
          this.x -=7;      
        }
        if(Key.isPress(Key.RIGHT) && this.en_balanza == true && this.x < 640 - 74 
          && this.lado_izquierdo == false ){
         this.x += 7;     
        }
        if(Key.isPress(Key.LEFT) && this.en_balanza == true && this.x > 150
          && this.lado_izquierdo == false){
          this.x -=7;      
        }
      }

      
  
      update(elapsed) {
        if(this.vy == 0 && this.bote_inicial == true && this.vx == 0 && this.lado_izquierdo ==  true){
          this.vy = -750;
          this.vx = 190;
          this.gravity = 10;
          
        }else if(this.vy == 0 && this.bote_inicial == true && this.vx == 0 && this.lado_izquierdo ==  false){
          this.vy = -750;
          this.vx =- 190;
          this.gravity = 10;
        }
      
          
          this.vy += this.gravity;
          this.x += this.vx * elapsed;
          this.y += this.vy * elapsed;
        
        
         //Cuando el personaje muere.
         if(this.y > 480){
          this.muerto = true;
        }

        //Rebote con los trampolines.
        if(this.y >= 480 - 77 && this.x < 20 && this.muerto == false){
          this.vy *= -1;
          this.y = 480 -77; 
        }

        if(this.y >= 480 - 77 && this.x > 640 - 55 && this.muerto == false){
          this.vy *= -1;
          this.y = 480 -77; 
        }
  
        //Colision con las paredes
        if (this.x  > 640-this.size) {
          this.vx *= -1;
          //this.gravity = 7;
          this.x = 640-this.size;
        }
        if (this.x < -5) {
          this.vx *= -1;
          //this.gravity = 7;
          this.x = -5;
        }

       
       //Colision con la balanza por la izquierda.
       if(this.y >  434 && this.x > this.pos_x_balanza - 20 && this.x < this.pos_x_balanza + 55
        && this.muerto == false && (this.colision_balanza == 0 || this.colision_balanza == 2)){
        this.vy = 0;
        this.vx = 0;
        this.y = 435;
        this.x = this.pos_x_balanza - 15;
        this.gravity = 0;
        this.colision_balanza = 1;
        this.en_balanza = true;
        this.bote_inicial = false;
        this.lado_izquierdo = true;
        this.bandera = true;
      }     
        //Colision con la balanza por la derecha.
        if(this.y >  434 && this.x > this.pos_x_balanza + 40 && this.x < this.pos_x_balanza + 105
          && this.muerto == false && this.colision_balanza == 1 ){
          this.vx = 0;
          this.vy = 0;
          this.y = 435;
          this.x = this.pos_x_balanza + 110;
          this.gravity = 0;
          this.colision_balanza = 2;
          this.en_balanza = true;
          this.bote_inicial = false;
          this.lado_izquierdo = false;
          this.bandera = true;
         
        }

      }  
      
      render(ctx) {
        ctx.save();
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        ctx.restore();
      }
      
    }
  
    GameEngine.Sprite2 = Sprite2;
    return GameEngine;
  })(GameEngine || {})