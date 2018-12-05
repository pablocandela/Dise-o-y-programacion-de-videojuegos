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


    var mat = new BABYLON.StandardMaterial("mat", this.scene);
    var texture = new BABYLON.Texture("Pared2.jpg", this.scene);
    mat.diffuseTexture = texture;

    var mat2 = new BABYLON.StandardMaterial("mat2", this.scene);
    var texture2 = new BABYLON.Texture("Puerta.jpg", this.scene);
    mat2.diffuseTexture = texture2;

    var columns = 1;  // 6 columns
    var rows = 1;  // 4 rows

    var faceUV = new Array(6);

    for (var i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }

    var options = {
        width: 2.10,
        height: 5.00,
        depth: .50,
        faceUV: faceUV
    };

    var options2 = {
      width: .50,
      height: 5.00,
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
      this.box5 = BABYLON.MeshBuilder.CreateBox('pared5', options2, this.scene);
      this.box5.material = mat;
      this.box5.position.x = 9.00;
      this.box5.position.y = 1.00;
      this.box5.position.z = this.inicialFrontal - this.distaciaFrontal;
      this.box5.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
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
      console.log(this.inicialFrontal + this.distaciaFrontal);
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
    
    this.inicialFrontal = -8.60;
    this.distaciaFrontal = 2.10;
    for(var i = 0; i < 9; i++){
      this.box8 = BABYLON.MeshBuilder.CreateBox('pared8', options, this.scene);
      this.box8.material = mat;
      this.box8.position.x = this.inicialFrontal - this.distaciaFrontal;
      this.box8.position.y = 1.00;
      this.box8.position.z = -6.50;
      this.box8.checkCollisions = true;
      this.inicialFrontal = this.inicialFrontal - this.distaciaFrontal;
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

      this.camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 15, 10), this.scene);
      this.camera.setTarget(BABYLON.Vector3.Zero());
      // https://doc.babylonjs.com/how_to/skybox
      var skybox = BABYLON.MeshBuilder.CreateBox("SkyBox", {size:9600}, this.scene);
      var skyboxMaterial = new BABYLON.StandardMaterial("SkyBoxMat", this.scene);
      skyboxMaterial.backFaceCulling = false;
      // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("models/skybox/skybox", this.scene);
      skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://www.babylonjs-playground.com/textures/TropicalSunnyDay", this.scene);
      skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
      skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      skybox.material = skyboxMaterial;


      this.light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(1, 1, 1), this.scene);
      this.light.position = new BABYLON.Vector3(.20, 7.00, .20);


      //let shadowGenerator = new BABYLON.ShadowGenerator(1024, this.light);
   
      
      this.ground = BABYLON.Mesh.CreateGround("Ground", 60,60, 2, this.scene);
      this.ground.material = new BABYLON.StandardMaterial("GroundMat", this.scene);
      //this.ground.material.diffuseColor = new BABYLON.Color3(0.3, 0.2, 0);
      this.ground.material.diffuseTexture = new BABYLON.Texture("Pared8.jpg");
      this.ground.material.specularColor = new BABYLON.Color3(0, 0, 0);
      //this.ground.receiveShadows = true;
      this.ground.checkCollisions = true;
     
      this.character = new GameEngine.Character2(this.scene);
      //shadowGenerator.getShadowMap().renderList.push(this.character.mesh);
      this.camera.lockedTarget = this.character.cameraTarget;

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
        this.enemy2.update(elapsed);
        if (this.ground.intersectsMesh(this.enemy2.mesh, false)) {
          this.enemy2.inFloor = true;
        }

        this.character.update(elapsed);
        if (this.ground.intersectsMesh(this.character.mesh, false)) {
          this.character.inFloor = true;
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