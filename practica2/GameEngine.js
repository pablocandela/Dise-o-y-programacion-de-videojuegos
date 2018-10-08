var GameEngine = (function(GameEngine) {
  let cw;
  let ch;

  let Key = GameEngine.KEY;
  
  
  class Game {
    constructor(ctx) {
      cw = ctx.canvas.width;
      ch = ctx.canvas.height;
      this.ctx = ctx;

      let ancho = 15;
      let alto = 15;
      let rojo = "#FF6347";
      let amarillo = "#FFD700";
      let azul = "#4169E1";
      let gris = "#BEBEBE";
      let num_globos = 20;
      let separacion = 31.5;
      let pos_corazon_x = cw - 45;
      let pos_corazon_y = 5;
      let pos_personaje_x = -5;
      let pos_personaje_y = ch - 78;
      
      this.estado = 0;
     
      this.contador_puntaje = 0;
      this.inactivos_amarillos = 0;
      this.inactivos_azules = 0;
      this.inactivos_rojos = 0;
    

      this.bandera1 = false;  
      this.bandera2 = false;
      this.tranquilo = 1;

      this.globos_azules = [];
      this.globos_rojos = [];
      this.globos_amarillos = [];

      this.trampolin = new GameEngine.Trampolin(0,ch - alto * 2.5,ancho*2.5,alto*2.5,gris);
      this.trampolin2 = new GameEngine.Trampolin(cw - ancho * 2.5,ch - alto * 2.5,ancho*2.5,alto*2.5,gris)

      this.marcador = new GameEngine.Marcador(0,25);
      this.vidas = new GameEngine.Vidas(cw - 18,25);
      this.corazon= new GameEngine.Corazon(pos_corazon_x, pos_corazon_y, 22,0);
      this.balanza = new GameEngine.Balanza(cw/2 - 70,ch-35,cw/2 + 70,ch);
      this.personaje = new GameEngine.Personaje(pos_personaje_x, pos_personaje_y, 50);
      this.personaje2 = new GameEngine.Personaje(cw/2 - 70 + 105,435,50);
      this.personaje2.en_balanza = true;
      this.personaje2.bote_inicial = false;
    

  
      for (let i=0; i<num_globos; i++) {  
        this.globos_rojos.push(new GameEngine.Globo(10 + (separacion * i),40,ancho,alto,rojo));
      }
      
      for (let i=0; i<num_globos; i++) {  
        this.globos_azules.push(new GameEngine.Globo(10 + (separacion * i),80,ancho,alto,azul));
      }

      for (let i=0; i<num_globos; i++) {  
        this.globos_amarillos.push(new GameEngine.Globo(10 + (separacion * i),120,ancho,alto,amarillo));
      }

      window.addEventListener("keydown", function(evt) {
        Key.onKeyDown(evt.keyCode);
        text_keycode = "keyCode = " + evt.keyCode;
      });
      window.addEventListener("keyup", function(evt) {
        Key.onKeyUp(evt.keyCode);
      });
         
    }
    processInput() {
     if(this.estado != 0){
      this.balanza.processInput();
      this.personaje.processInput();
      this.personaje2.processInput();   
     }       
      if(Key.isPress(Key.space)){     
        this.estado = 1;
      }   
    }

    update(elapsed) {
      if(this.estado != 0){
      this.marcador.puntaje = this.contador_puntaje;
      this.balanza.colision_personaje = this.personaje.colision_balanza;
      if(this.inactivos_amarillos == 20){
        this.inactivos_amarillos = 0;
        for (let i=0; i<this.globos_amarillos.length; i++) {
          this.globos_amarillos[i].activo = true;
        }
      }
      if(this.inactivos_azules == 20){
        this.inactivos_azules = 0;
        for (let i=0; i<this.globos_azules.length; i++) {
          this.globos_azules[i].activo = true;
        }
      }
      if(this.inactivos_rojos == 20){
        this.inactivos_rojos = 0;
        for (let i=0; i<this.globos_rojos.length; i++) {
          this.globos_rojos[i].activo = true;
        }
      }

      for (let i=0; i<this.globos_azules.length; i++) {
        this.globos_azules[i].update(elapsed);
      }

      for (let i=0; i<this.globos_rojos.length; i++) {
        this.globos_rojos[i].update(elapsed);
      }

      for (let i=0; i<this.globos_amarillos.length; i++) {
        this.globos_amarillos[i].update(elapsed);
      }

      if(this.personaje.bote_inicial ==  false && this.personaje2.bandera == false){
        this.personaje2.bote_inicial = true;
        this.personaje2.en_balanza = false;
        
      }
      if(this.personaje2.bote_inicial ==  false){
        this.personaje.bote_inicial = true;
        this.personaje.en_balanza = false;
        this.personaje2.bandera = false;
      }
      this.marcador.update(elapsed);
      this.vidas.update(elapsed);
      
      
      this.personaje.pos_x_balanza = this.balanza.pos_x;
      this.personaje2.pos_x_balanza = this.balanza.pos_x;

      if(this.personaje2.bote_inicial == true){     
        this.personaje2.update(elapsed,this.globos_amarillos);
        this.personaje.colision_balanza = this.personaje2.colision_balanza;
        }
        if(this.personaje.bote_inicial == true){       
        this.personaje.update(elapsed,this.globos_amarillos);
        this.personaje2.colision_balanza = this.personaje.colision_balanza;
        }

        
        //Colision globos amarillos.
        for (let i=0; i<this.globos_amarillos.length; i++) {
         if(this.globos_amarillos[i].pos_y + 15 > this.personaje.y 
          //&& this.personaje.y > 134
          //&& this.personaje.x < 
          && this.personaje.x < this.globos_amarillos[i].pos_x + 14
          && this.personaje.x > this.globos_amarillos[i].pos_x
           //&& this.personaje.x < this.globos_amarillos[i].pos_x + 20
           && this.globos_amarillos[i].activo == true){
           this.personaje.y = this.globos_amarillos[i].pos_y;
           this.globos_amarillos[i].activo = false;
           this.personaje.vy *= -1;
           this.personaje.gravity = 2;   
           this.contador_puntaje += 2;       
           this.inactivos_amarillos += 1;
         }
         for (let i=0; i<this.globos_amarillos.length; i++) {
          if(this.globos_amarillos[i].pos_y + 15 > this.personaje2.y
            //&& this.personaje2.y > 134
            && this.personaje2.x > this.globos_amarillos[i].pos_x
            && this.personaje2.x < this.globos_amarillos[i].pos_x + 14
            && this.globos_amarillos[i].activo == true){
            this.personaje2.y = this.globos_amarillos[i].pos_y;
            this.globos_amarillos[i].activo = false;
            this.personaje2.vy *= -1;
            this.personaje2.gravity = 2;
            this.contador_puntaje += 2;
            this.inactivos_amarillos += 1;
          }
        }
      }

        //Colision globos azules.
        for (let i=0; i<this.globos_azules.length; i++) {
          if(this.globos_azules[i].pos_y > this.personaje.y
            && this.personaje.y < 81
            && this.personaje.x > this.globos_azules[i].pos_x
            && this.personaje.x < this.globos_azules[i].pos_x + 14
            && this.globos_azules[i].activo == true){
            this.personaje.y = this.globos_azules[i].pos_y;
            this.globos_azules[i].activo = false;
            this.personaje.vy *= -1;
            this.personaje.gravity = 2;
            this.contador_puntaje += 5;
            this.inactivos_azules += 1;
           
           }
                  
          }
          for (let i=0; i<this.globos_azules.length; i++) {
           if(this.globos_azules[i].pos_y > this.personaje2.y
            && this.personaje2.y < 81
             && this.personaje2.x > this.globos_azules[i].pos_x
             && this.personaje2.x < this.globos_azules[i].pos_x + 14  
             && this.globos_azules[i].activo == true){
             this.personaje2.y = this.globos_azules[i].pos_y;
             this.globos_azules[i].activo = false;
             this.personaje2.vy *= -1;
             this.personaje2.gravity = 2;
             this.contador_puntaje += 5;
             this.inactivos_azules += 1;
             
           }
         }
      
        //Colision globos azules.
        for (let i=0; i<this.globos_rojos.length; i++) {
          if(this.globos_rojos[i].pos_y > this.personaje.y
            && this.personaje.y < 81
            && this.personaje.x > this.globos_rojos[i].pos_x
            && this.personaje.x < this.globos_rojos[i].pos_x + 14
            && this.globos_rojos[i].activo == true){
            this.personaje.y = this.globos_rojos[i].pos_y;
            this.globos_rojos[i].activo = false;
            this.personaje.vy *= -1;
            this.personaje.gravity = 2;
            this.contador_puntaje += 5;
            this.inactivos_rojos += 1;        
          }
        }
          for (let i=0; i<this.globos_rojos.length; i++) {
           if(this.globos_rojos[i].pos_y > this.personaje2.y
            && this.personaje2.y < 81
             && this.personaje2.x > this.globos_rojos[i].pos_x
             && this.personaje2.x < this.globos_rojos[i].pos_x + 14  
             && this.globos_rojos[i].activo == true){
             this.personaje2.y = this.globos_rojos[i].pos_y;
             this.globos_rojos[i].activo = false;
             this.personaje2.vy *= -1;
             this.personaje2.gravity = 2;
             this.contador_puntaje += 5;
             this.inactivos_rojos += 1;         
           }
          }
         }   
      this.corazon.update(elapsed);
      this.balanza.update(elapsed)
      
       
    }

    render() {
      this.ctx.clearRect(0, 0, cw, ch); 

      for (let i=0; i<this.globos_azules.length; i++) {
        this.globos_azules[i].render(this.ctx);
      }

      for (let i=0; i<this.globos_rojos.length; i++) {
        this.globos_rojos[i].render(this.ctx);
      }

      for (let i=0; i<this.globos_amarillos.length; i++) {
        this.globos_amarillos[i].render(this.ctx);
      }
      this.trampolin.render(this.ctx);
      this.trampolin2.render(this.ctx);
      this.marcador.render(this.ctx);
      this.vidas.render(this.ctx);
      this.personaje.render(this.ctx);
      this.personaje2.render(this.ctx);
      this.corazon.render(this.ctx);
      this.balanza.render(this.ctx);
      if(this.estado == 0){
        this.ctx.fillStyle = "black";
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.lineJoin = "round";
        this.ctx.font = "bold 20px Monospace";   
        this.ctx.strokeText("Presiona espacio para comenzar", cw/2-150, ch/2 + 150);
        this.ctx.fillText("Presiona espacio para comenzar", cw/2-150, ch/2+150); 
      } 
      
    }
  }

  GameEngine.Game = Game;
  return GameEngine;
})(GameEngine || {})