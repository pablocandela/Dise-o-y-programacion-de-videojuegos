var GameEngine = (function(GameEngine) {
  let keys = {};

  class Level1State {
    constructor(engine) {
      this.ready = false;

      this.engine = engine;
      this.scene = new BABYLON.Scene(engine);

      this.scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
      this.scene.collisionsEnabled = true;
      this.scene.clearColor = new BABYLON.Color3(0.46484375, 0.6171875, 0.79296875);
      this.bandera = false;


    var mat = new BABYLON.StandardMaterial("mat", this.scene);
    var texture = new BABYLON.Texture("Pared2.jpg", this.scene);
    mat.diffuseTexture = texture;

    var mat2 = new BABYLON.StandardMaterial("mat2", this.scene);
    var texture2 = new BABYLON.Texture("Puerta.jpg", this.scene);
    mat2.diffuseTexture = texture2;

    this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("GUI");

    var columns = 1;  // 6 columns
    var rows = 1;  // 4 rows

    var faceUV = new Array(6);

    for (var i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }

    var options = {
        width: 2.10,
        height: 6.00,
        depth: .50,
        faceUV: faceUV
    };

    var options2 = {
      width: .50,
      height: 6.00,
      depth: 2.10,
      faceUV: faceUV
  };



    this.inicialFrontal = -10.5;
    this.distaciaFrontal = 2.1;
    for(var i = 0; i < 9; i++){
      this.box = BABYLON.MeshBuilder.CreateBox('pared', options, this.scene);
      this.box.material = mat;
      if(this.inicialFrontal + this.distaciaFrontal == -8.881784197001252e-16){
        this.box.material = mat2;
        this.box.position.x = this.inicialFrontal + this.distaciaFrontal;
        this.box.position.y = 1;
        this.box.position.z = -6.5;
        //this.box.checkCollisions = true;
        this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
      }else{
        this.box.position.x = this.inicialFrontal + this.distaciaFrontal;
        this.box.position.y = 1;
        this.box.position.z = -6.5;
        this.box.checkCollisions = true;
        this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
      }
    }



    this.inicialFrontal = -7.20;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
      this.box2 = BABYLON.MeshBuilder.CreateBox('pared2', options2, this.scene);
      this.box2.material = mat;
      this.box2.position.x = 9.00;
      this.box2.position.y = 1.00;
      this.box2.position.z = this.inicialFrontal + this.distaciaFrontal;
      this.box2.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
    }

    this.inicialFrontal = 10.30;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 9; i++){
      this.box3 = BABYLON.MeshBuilder.CreateBox('pared3', options, this.scene);
      this.box3.material = mat;
      this.box3.position.x = this.inicialFrontal - this.distaciaFrontal;
      this.box3.position.y = 1.00;
      this.box3.position.z = 6.70;
      this.box3.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
    }

    this.inicialFrontal = -7.20;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
      this.box4 = BABYLON.MeshBuilder.CreateBox('pared4', options2, this.scene);
      this.box4.material = mat;
      this.box4.position.x = -9.10;
      this.box4.position.y = 1.00;
      this.box4.position.z = this.inicialFrontal + this.distaciaFrontal;
      this.box4.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
    }

    this.inicialFrontal = -5.40;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
      //console.log(this.inicialFrontal + this.distaciaFrontal);
      this.box5 = BABYLON.MeshBuilder.CreateBox('pared5', options2, this.scene);
      if(this.inicialFrontal + this.distaciaFrontal == -7.7){
        this.box5.material = mat2;
        this.box5.position.x = 9.00;
        this.box5.position.y = 1.00;
        this.box5.position.z = this.inicialFrontal - this.distaciaFrontal;
        this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
      }else{
        this.box5.material = mat;
        this.box5.position.x = 9.00;
        this.box5.position.y = 1.00;
        this.box5.position.z = this.inicialFrontal - this.distaciaFrontal;
        this.box5.checkCollisions = true;
        this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
      }
    }

    this.inicialFrontal = 10.10;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 18; i++){
      this.box6 = BABYLON.MeshBuilder.CreateBox('pared6', options, this.scene);
      this.box6.material = mat;
      this.box6.position.x = this.inicialFrontal - this.distaciaFrontal;
      this.box6.position.y = 1.00;
      this.box6.position.z = -19.00;
      this.box6.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
    }

    this.inicialFrontal = -20.10;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
      //console.log(this.inicialFrontal + this.distaciaFrontal);
      this.box7 = BABYLON.MeshBuilder.CreateBox('pared7', options2, this.scene);
      if(this.inicialFrontal + this.distaciaFrontal == -11.700000000000001){
        this.box7.material = mat2;
        this.box7.position.x = -9.70;
        this.box7.position.y = 1.00;
        this.box7.position.z = this.inicialFrontal + this.distaciaFrontal;
        this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
      }else{
        this.box7.material = mat;
        this.box7.position.x = -9.70
        this.box7.position.y = 1.00;
        this.box7.position.z = this.inicialFrontal + this.distaciaFrontal;
        this.box7.checkCollisions = true;
        this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
      }
    }

    this.inicialFrontal = -9.70;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 9; i++){
      this.box8 = BABYLON.MeshBuilder.CreateBox('pared8', options, this.scene);
	//console.log(this.inicialFrontal + this.distaciaFrontal);
      if (this.inicialFrontal + this.distaciaFrontal == -13.899999999999999){
        this.box8.material = mat2;
        this.box8.position.x = this.inicialFrontal - this.distaciaFrontal;
        this.box8.position.y = 1.00;
        this.box8.position.z = -6.50;
        this.box8.checkCollisions = false;
        this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
      }else {
        this.box8.material = mat;
        this.box8.position.x = this.inicialFrontal - this.distaciaFrontal;
        this.box8.position.y = 1.00;
        this.box8.position.z = -6.50;
        this.box8.checkCollisions = true;
        this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
      }

    }


    this.inicialFrontal = -20.10;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
      this.box9 = BABYLON.MeshBuilder.CreateBox('pared9', options2, this.scene);
      this.box9.material = mat;
      this.box9.position.x = -28.50;
      this.box9.position.y = 1.00;
      this.box9.position.z = this.inicialFrontal + this.distaciaFrontal;
      this.box9.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
    }


    this.inicialFrontal = -7.10;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
      this.box10 = BABYLON.MeshBuilder.CreateBox('pared10', options2, this.scene);
      this.box10.material = mat;
      this.box10.position.x = -28.50;
      this.box10.position.y = 1.00;
      this.box10.position.z = this.inicialFrontal + this.distaciaFrontal;
      this.box10.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
    }

    this.inicialFrontal = -8.50;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 9; i++){
      //console.log(this.inicialFrontal + this.distaciaFrontal);
      if (this.inicialFrontal + this.distaciaFrontal == -14.799999999999999){
        this.box8.material = mat2;
        this.box8.position.x = this.inicialFrontal - this.distaciaFrontal;
        this.box8.position.y = 1.00;
        this.box8.position.z = 6.80;
        this.box8.checkCollisions = false;
        this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
      }else {
        this.box11 = BABYLON.MeshBuilder.CreateBox('pared11', options, this.scene);
        this.box11.material = mat;
        this.box11.position.x = this.inicialFrontal - this.distaciaFrontal;
        this.box11.position.y = 1.00;
        this.box11.position.z = 6.80;
        this.box11.checkCollisions = true;
        this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
     }
   }

    this.inicialFrontal = 5.40;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
	this.box12 = BABYLON.MeshBuilder.CreateBox('pared7', options2, this.scene);
      if (this.inicialFrontal + this.distaciaFrontal == 13.799999999999999){
        this.box12.material = mat2;
        this.box12.position.x = -9.10;
        this.box12.position.y = 1.00;
        this.box12.position.z = this.inicialFrontal + this.distaciaFrontal;
        this.box12.checkCollisions = false;
        this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
      }else {
      	//this.box12 = BABYLON.MeshBuilder.CreateBox('pared12', options, this.scene);
      	this.box12.material = mat;
      	this.box12.position.x = -9.10;
      	this.box12.position.y = 1.00;
      	this.box12.position.z = this.inicialFrontal + this.distaciaFrontal;
      	this.box12.checkCollisions = true;
      	this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
     }
   }

    this.inicialFrontal = 5.90;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
      this.box13 = BABYLON.MeshBuilder.CreateBox('pared13', options2, this.scene);
      this.box13.material = mat;
      this.box13.position.x = -28.50;
      this.box13.position.y = 1.00;
      this.box13.position.z = this.inicialFrontal + this.distaciaFrontal;
      this.box13.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
    }

    this.inicialFrontal = -8.50;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 9; i++){
      this.box14 = BABYLON.MeshBuilder.CreateBox('pared14', options, this.scene);
      this.box14.material = mat;
      this.box14.position.x = this.inicialFrontal - this.distaciaFrontal;
      this.box14.position.y = 1.00;
      this.box14.position.z = 19.00;
      this.box14.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
    }

    this.inicialFrontal = 10.30;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 9; i++){
      this.box15 = BABYLON.MeshBuilder.CreateBox('pared15', options, this.scene);
      this.box15.material = mat;
      this.box15.position.x = this.inicialFrontal - this.distaciaFrontal;
      this.box15.position.y = 1.00;
      this.box15.position.z = 19.00;
      this.box15.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
    }

    this.inicialFrontal = 5.20;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
      //console.log(this.inicialFrontal + this.distaciaFrontal);
      this.box16 = BABYLON.MeshBuilder.CreateBox('pared16', options2, this.scene);
      if (this.inicialFrontal + this.distaciaFrontal == 13.6){
        this.box16.material = mat2;
        this.box16.position.x = 9.00;
        this.box16.position.y = 1.00;
        this.box16.position.z = this.inicialFrontal + this.distaciaFrontal;
        this.box16.checkCollisions = false;
        this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
      }else {
        //this.box16 = BABYLON.MeshBuilder.CreateBox('pared16', options2, this.scene);
        this.box16.material = mat;
        this.box16.position.x = 9.00;
        this.box16.position.y = 1.00;
        this.box16.position.z = this.inicialFrontal + this.distaciaFrontal;
        this.box16.checkCollisions = true;
        this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
     }
  }


    this.inicialFrontal = 5.20;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
      //console.log(this.inicialFrontal + this.distaciaFrontal);
      this.box17 = BABYLON.MeshBuilder.CreateBox('pared17', options2, this.scene);
      if (this.inicialFrontal + this.distaciaFrontal == 13.6){
        this.box17.material = mat2;
        this.box17.position.x = 27.00;
        this.box17.position.y = 1.00;
        this.box17.position.z = this.inicialFrontal + this.distaciaFrontal;
        this.box17.checkCollisions = false;
        this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
      }else {
        this.box17.material = mat;
        this.box17.position.x = 27.00;
        this.box17.position.y = 1.00;
        this.box17.position.z = this.inicialFrontal + this.distaciaFrontal;
        this.box17.checkCollisions = true;
        this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
      }
    }

    this.inicialFrontal = 28.30;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 9; i++){
      //console.log(this.inicialFrontal + this.distaciaFrontal);
      this.box18 = BABYLON.MeshBuilder.CreateBox('pared18', options, this.scene);
      if (this.inicialFrontal + this.distaciaFrontal == 26.2){
        this.box18.material = mat2;
        this.box18.position.x = this.inicialFrontal - this.distaciaFrontal;
        this.box18.position.y = 1.00;
        this.box18.position.z = 19.00;
        this.box18.checkCollisions = false;
        this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
      }else{
        //this.box18 = BABYLON.MeshBuilder.CreateBox('pared18', options, this.scene);
        this.box18.material = mat;
        this.box18.position.x = this.inicialFrontal - this.distaciaFrontal;
        this.box18.position.y = 1.00;
        this.box18.position.z = 19.00;
        this.box18.checkCollisions = true;
        this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
    }
  }

    this.inicialFrontal = 28.30;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 9; i++){
      //console.log(this.inicialFrontal + this.distaciaFrontal);
      this.box19 = BABYLON.MeshBuilder.CreateBox('pared19', options, this.scene);
      if (this.inicialFrontal + this.distaciaFrontal == 17.799999999999994){
        this.box19.material = mat2;
        this.box19.position.x = this.inicialFrontal - this.distaciaFrontal;
        this.box19.position.y = 1.00;
        this.box19.position.z = 6.20;
        this.box19.checkCollisions = false;
        this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
      }else
        if (this.inicialFrontal + this.distaciaFrontal == 26.2){
          this.box19.material = mat2;
          this.box19.position.x = this.inicialFrontal - this.distaciaFrontal;
          this.box19.position.y = 1.00;
          this.box19.position.z = 6.20;
          this.box19.checkCollisions = false;
          this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
      }else {
      //this.box19 = BABYLON.MeshBuilder.CreateBox('pared19', options, this.scene);
        this.box19.material = mat;
        this.box19.position.x = this.inicialFrontal - this.distaciaFrontal;
        this.box19.position.y = 1.00;
        this.box19.position.z = 6.20;
        this.box19.checkCollisions = true;
        this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
      }
    }


    this.inicialFrontal = 5.20;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
      this.box20 = BABYLON.MeshBuilder.CreateBox('pared20', options2, this.scene);
      this.box20.material = mat;
      this.box20.position.x = 18.00;
      this.box20.position.y = 1.00;
      this.box20.position.z = this.inicialFrontal + this.distaciaFrontal;
      this.box20.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
    }

    this.inicialFrontal = -7.20;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
      this.box21 = BABYLON.MeshBuilder.CreateBox('pared21', options2, this.scene);
      this.box21.material = mat;
      this.box21.position.x = 27.00;
      this.box21.position.y = 1.00;
      this.box21.position.z = this.inicialFrontal + this.distaciaFrontal;
      this.box21.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
    }

    this.inicialFrontal = 28.30;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 9; i++){
       //console.log(this.inicialFrontal + this.distaciaFrontal);
       this.box22 = BABYLON.MeshBuilder.CreateBox('pared22', options, this.scene);
       if (this.inicialFrontal + this.distaciaFrontal == 19.899999999999995){
         this.box22.material = mat2;
         this.box22.position.x = this.inicialFrontal - this.distaciaFrontal;
         this.box22.position.y = 1.00;
         this.box22.position.z = -6.50;
         this.box22.checkCollisions = false;
         this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
       }else{
        this.box22.material = mat;
        this.box22.position.x = this.inicialFrontal - this.distaciaFrontal;
        this.box22.position.y = 1.00;
        this.box22.position.z = -6.50;
        this.box22.checkCollisions = true;
        this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
      }
    }

    this.inicialFrontal = -5.40;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
      this.box23 = BABYLON.MeshBuilder.CreateBox('pared23', options2, this.scene);
      this.box23.material = mat;
      this.box23.position.x = 27.00;
      this.box23.position.y = 1.00;
      this.box23.position.z = this.inicialFrontal - this.distaciaFrontal;
      this.box23.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
    }

    this.inicialFrontal = 28.30;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 9; i++){
      this.box24 = BABYLON.MeshBuilder.CreateBox('pared24', options, this.scene);
      this.box24.material = mat;
      this.box24.position.x = this.inicialFrontal - this.distaciaFrontal;
      this.box24.position.y = 1.00;
      this.box24.position.z = -19.00;
      this.box24.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
    }

    this.inicialFrontal = 18.20;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
      this.box25 = BABYLON.MeshBuilder.CreateBox('pared25', options2, this.scene);
      this.box25.material = mat;
      this.box25.position.x = 9.00;
      this.box25.position.y = 1.00;
      this.box25.position.z = this.inicialFrontal + this.distaciaFrontal;
      this.box25.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
    }

    this.inicialFrontal = 29.00;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 9; i++){
      this.box26 = BABYLON.MeshBuilder.CreateBox('pared26', options, this.scene);
      this.box26.material = mat;
      this.box26.position.x = this.inicialFrontal - this.distaciaFrontal;
      this.box26.position.y = 1.00;
      this.box26.position.z = 32.00;
      this.box26.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
    }

    this.inicialFrontal = 18.20;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
      //console.log(this.inicialFrontal + this.distaciaFrontal);
      this.box27 = BABYLON.MeshBuilder.CreateBox('pared27', options2, this.scene);
      if (this.inicialFrontal + this.distaciaFrontal == 25){
        this.box27.material = mat2;
        this.box27.position.x = 27.00;
        this.box27.position.y = 1.00;
        this.box27.position.z = this.inicialFrontal + this.distaciaFrontal;
        this.box27.checkCollisions = false;
        this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
      }else{
        this.box27.material = mat;
        this.box27.position.x = 27.00;
        this.box27.position.y = 1.00;
        this.box27.position.z = this.inicialFrontal + this.distaciaFrontal;
        this.box27.checkCollisions = true;
        this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
      }
    }

    

    
    this.inicialFrontal = 47.00;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 9; i++){
      this.box30 = BABYLON.MeshBuilder.CreateBox('pared30', options, this.scene);
      this.box30.material = mat;
      this.box30.position.x = this.inicialFrontal - this.distaciaFrontal;
      this.box30.position.y = 1.00;
      this.box30.position.z = 19.00;
      this.box30.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
    }

    this.inicialFrontal = 47.00;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 9; i++){
      //console.log(this.inicialFrontal + this.distaciaFrontal);
      this.box31 = BABYLON.MeshBuilder.CreateBox('pared31', options, this.scene);
      if (this.inicialFrontal + this.distaciaFrontal == 42.8){
        this.box31.material = mat2;
        this.box31.position.x = this.inicialFrontal - this.distaciaFrontal;
        this.box31.position.y = 1.00;
        this.box31.position.z = 6.20;
        this.box31.checkCollisions = false;
        this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
      }else{
        this.box31.material = mat;
        this.box31.position.x = this.inicialFrontal - this.distaciaFrontal;
        this.box31.position.y = 1.00;
        this.box31.position.z = 6.20;
        this.box31.checkCollisions = true;
        this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
      }
    }

    this.inicialFrontal = 5.20;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
      this.box32 = BABYLON.MeshBuilder.CreateBox('pared32', options2, this.scene);
      this.box32.material = mat;
      this.box32.position.x = 45.00;
      this.box32.position.y = 1.00;
      this.box32.position.z = this.inicialFrontal + this.distaciaFrontal;
      this.box32.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
    }


    this.inicialFrontal = 47.00;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 9; i++){
      this.box33 = BABYLON.MeshBuilder.CreateBox('pared33', options, this.scene);
      this.box33.material = mat;
      this.box33.position.x = this.inicialFrontal - this.distaciaFrontal;
      this.box33.position.y = 1.00;
      this.box33.position.z = -6.50;
      this.box33.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
    }

    this.inicialFrontal = -7.20;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
      //console.log(this.inicialFrontal + this.distaciaFrontal);
      this.box34 = BABYLON.MeshBuilder.CreateBox('pared34', options2, this.scene);
      if (this.inicialFrontal + this.distaciaFrontal == 1.2000000000000006){
        this.box34.material = mat2;
        this.box34.position.x = 45.00;
        this.box34.position.y = 1.00;
        this.box34.position.z = this.inicialFrontal + this.distaciaFrontal;
        this.box34.checkCollisions = false;
        this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
      }else{
        this.box34.material = mat;
        this.box34.position.x = 45.00;
        this.box34.position.y = 1.00;
        this.box34.position.z = this.inicialFrontal + this.distaciaFrontal;
        this.box34.checkCollisions = true;
        this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
      }
    }

    this.inicialFrontal = 65.70;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 9; i++){
      this.box35 = BABYLON.MeshBuilder.CreateBox('pared35', options, this.scene);
      this.box35.material = mat;
      this.box35.position.x = this.inicialFrontal - this.distaciaFrontal;
      this.box35.position.y = 1.00;
      this.box35.position.z = -6.50;
      this.box35.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
    }

    this.inicialFrontal = 65.70;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 9; i++){
      this.box36 = BABYLON.MeshBuilder.CreateBox('pared36', options, this.scene);
      this.box36.material = mat;
      this.box36.position.x = this.inicialFrontal - this.distaciaFrontal;
      this.box36.position.y = 1.00;
      this.box36.position.z = 6.20;
      this.box36.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
    }

    this.inicialFrontal = -7.20;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 6; i++){
      this.box37 = BABYLON.MeshBuilder.CreateBox('pared37', options2, this.scene);
      this.box37.material = mat;
      this.box37.position.x = 65.00;
      this.box37.position.y = 1.00;
      this.box37.position.z = this.inicialFrontal + this.distaciaFrontal;
      this.box37.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal + this.distaciaFrontal;
    }




      /*this.box5 = BABYLON.MeshBuilder.CreateBox('pared5', options2, this.scene);
      this.box5.material = mat2;
      this.box5.position.x = -2850;
      this.box5.position.y = 100;
      this.box5.position.z = -1750;
      this.box5.checkCollisions = true;*/

      this.assetsManager = new BABYLON.AssetsManager(this.scene);
      this.assetsManager.addMeshTask("mesh_task", "", "Level2Models/", "monito.babylon");
      this.assetsManager.addMeshTask("enemy_task", "", "Level2Models/", "enemy.babylon");




      let self = this;
      this.assetsManager.onFinish = function () {
        document.getElementById("theCanvas").focus();
        self.init();
      }
      this.assetsManager.load();
    }

    init() {
      this.ready = true;
      document.getElementById("theCanvas").focus();

      BABYLON.Animation.AllowMatricesInterpolation = false;

      this.scene.ambientColor = new BABYLON.Color3(0.75, 0.75, 0.75);
      this.vectorPosicion = new BABYLON.Vector3(0,0,0);

      this.camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 19, 10), this.scene);
      this.music = new BABYLON.Sound("Musica", "57-Windmill.mp3", this.scene, null, { loop: true, autoplay: true });
      this.camera.setTarget(this.vectorPosicion);
      // https://doc.babylonjs.com/how_to/skybox
      //var skybox = BABYLON.MeshBuilder.CreateBox("SkyBox", {size:9600}, this.scene);
      //var skyboxMaterial = new BABYLON.StandardMaterial("SkyBoxMat", this.scene);
      //skyboxMaterial.backFaceCulling = false;
      // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("models/skybox/skybox", this.scene);
      //skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://www.babylonjs-playground.com/textures/TropicalSunnyDay", this.scene);
      //skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
      //skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      //skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      //skybox.material = skyboxMaterial;


      this.light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), this.scene);
      //this.light.position = new BABYLON.Vector3(.20, 11.00, .20);


      //let shadowGenerator = new BABYLON.ShadowGenerator(1024, this.light);


      this.ground = BABYLON.Mesh.CreateGround("Ground", 140,65, 2, this.scene);
      this.ground.material = new BABYLON.StandardMaterial("GroundMat", this.scene);
      //this.ground.material.diffuseColor = new BABYLON.Color3(0.3, 0.2, 0);
      this.ground.material.diffuseTexture = new BABYLON.Texture("Pared8.jpg");
      this.ground.material.specularColor = new BABYLON.Color3(0, 0, 0);
      //this.ground.receiveShadows = true;
      this.ground.checkCollisions = true;

      this.character = new GameEngine.Character2(this.scene);
      //shadowGenerator.getShadowMap().renderList.push(this.character.mesh);
      //this.camera.lockedTarget = this.character.cameraTarget;

      this.enemy1 = new GameEngine.Enemy1(this.scene, "enemy_1");
      this.enemy2 = new GameEngine.Enemy2(this.scene, this.character, "enemy_2", 5, 5, -5);



      // register keyboard input
      this.scene.actionManager = new BABYLON.ActionManager(this.scene);
      this.scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger,
          function(evt) {
            keys[evt.sourceEvent.key] = true;
          }
        )
      );
      this.scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger,
          function(evt) {
            delete keys[evt.sourceEvent.key];
          }
        )
      );

      var l = 0;

      for (var i = 0; i < this.character.lives; i++) {
        var image = new BABYLON.GUI.Image("but", "heart.svg");
        image.width = "30px";
        image.height = "40px";
        image.stretch = BABYLON.GUI.Image.STRETCH_NONE;
        image.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        image.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        image.left = l;
        this.advancedTexture.addControl(image);
        l+= 40;
      }
    }

    processInput() {
      if (this.ready) {
        this.character.processInput(keys);
      }
    }

    update(elapsed) {

     if (this.ready) {
        this.enemy1.update(elapsed);
        if (this.ground.intersectsMesh(this.enemy1.mesh, false)) {
          this.enemy1.inFloor = true;
        }
        if (this.enemy2.isAlive) this.enemy2.update(elapsed);
        if (this.ground.intersectsMesh(this.enemy2.mesh, false)) {
          this.enemy2.inFloor = true;
        }

        this.character.update(elapsed);
        //console.log(this.character.mesh.position.z);
        if (this.ground.intersectsMesh(this.character.mesh, false)) {
          this.character.inFloor = true;
        }

        if (this.character.state === "Atack") {
          if (this.character.weapon.intersectsMesh(this.enemy1.mesh, true)) {
            this.enemy1.displaceTo(this.character.mesh.position.subtract(this.enemy1.mesh.position).normalize().multiplyByFloats(-5, -5, -5));
            this.enemy1.hit();
            //console.log("enemigo golpeado");
          }
        }

        /////////
        // AQUI SOLO REVISO LA COLISION DE LA ESPADA CON EL ENEMIGO QUE SIGUE AL PERSONAJE
        // HAY QUE CHECAR LA COLISION CON TODOS LOS ENEMIGOS DEL JUEGO, LO MAS CONVENIENTE ES QUE LOS ENEMIGOS ESTEN EN UN ARREGLO E ITERAR PARA REVISAR LAS COLISIONES
        //
        // SE PUEDE CAMBIAR EL ESTADO AL ENEMIGO A "LASTIMADO" Y HACER ALGO CON ESA INFORMACION, POR EJEMPLO BAJAR SUS PUNTOS DE VIDA O MATARLO,
        // EN ESTE EJEMPLO SOLO LO MUEVO 5 UNIDADES EN LA DIRECCION OPUESTA A LA QUE SE MUEVE
        /////////
        if (this.character.state === "Atack") {
          if (this.character.weapon.intersectsMesh(this.enemy2.mesh, true)) {
            this.enemy2.displaceTo(this.character.mesh.position.subtract(this.enemy2.mesh.position).normalize().multiplyByFloats(-5, -5, -5));
            this.enemy2.hit();
            //console.log("enemigo golpeado");
          }
        }
        /////////

        if(this.character.mesh.position.z > -6.5 && this.character.mesh.position.z < 5.9 && this.character.mesh.position.x > -9.5&& this.character.mesh.position.x < 8){
          this.camera.position.z = 10;
          this.camera.position.x = 0;
        }
  
        if(this.character.mesh.position.z < -7.0 && this.character.mesh.position.z > -18 && this.character.mesh.position.x > -9.5 && this.character.mesh.position.x < 9.8){
          this.camera.position.z = -3;
          this.camera.position.x = 0;
        }
        if(this.character.mesh.position.x < -10 && this.character.mesh.position.x > -27 && this.character.mesh.position.z < -7.0 && 		  this.character.mesh.position.z > -18){
          this.camera.position.z = -3;
          this.camera.position.x = -20;
        }

        if(this.character.mesh.position.z > -5.9 && this.character.mesh.position.x < -10 && this.character.mesh.position.z < 6){
          this.camera.position.z = 10;
          this.camera.position.x = -20;
        }

        if(this.character.mesh.position.z > 6.4 && this.character.mesh.position.x < -10){
          this.camera.position.z = 23;
          this.camera.position.x = -20;
        }

        if(this.character.mesh.position.x > -8 && this.character.mesh.position.z > 6.4 && this.character.mesh.position.x < 8 ){
          this.camera.position.z = 23;
          this.camera.position.x = 0;
        }
        if(this.character.mesh.position.x > 9 &&this.character.mesh.position.z < 18.5 && this.character.mesh.position.z > 6.4 && this.character.mesh.position.x < 18 ){
          this.camera.position.z = 23;
          this.camera.position.x = 10;
        }
        if(this.character.mesh.position.x > 9.8 && this.character.mesh.position.z < 5.8 && this.character.mesh.position.x < 17){
          this.camera.position.z = 10;
          this.camera.position.x = 17;
        }

        if(this.character.mesh.position.x > 19 && this.character.mesh.position.z < 18.5 && this.character.mesh.position.z > 5.8 && this.character.mesh.position.x < 26){
          this.camera.position.z = 23;
          this.camera.position.x = 17;
        }

        if(this.character.mesh.position.z > 19.5){
          this.camera.position.z = 35;
          this.camera.position.x = 17;
        }

        if(this.character.mesh.position.x > 26.5){
          this.camera.position.z = 23;
          this.camera.position.x = 37;
        }
        if(this.character.mesh.position.z < -7.2 && this.character.mesh.position.z > -18 && this.character.mesh.position.x > 9.8 && this.character.mesh.position.x < 28){
          this.camera.position.z = -3;
          this.camera.position.x = 17;
          
        }
        if(this.character.mesh.position.z < 6 && this.character.mesh.position.z > -6 && this.character.mesh.position.x > 25 && this.character.mesh.position.x < 44.4){
          this.camera.position.z = 10;
          this.camera.position.x = 37;
        }
        if(this.character.mesh.position.x > 44.5){
          this.camera.position.z = 10;
          this.camera.position.x = 55;
        }
       

    }

  }

    render() {
      if (this.ready) {
        this.scene.render();
      }
    }
  }

  GameEngine.Level1State = Level1State;
  return GameEngine;
})(GameEngine || {})
