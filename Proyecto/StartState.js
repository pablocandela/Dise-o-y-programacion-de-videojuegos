var GameEngine = (function(GameEngine) {
  
  class StartState {
    constructor(engine, game) {
      let self = this;

      this.engine = engine;
      this.game = game;

      this.scene = new BABYLON.Scene(engine);

      this.camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 0, -10), this.scene);
      this.camera.setTarget(BABYLON.Vector3.Zero());

      // https://doc.babylonjs.com/how_to/gui
      this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("GUI");

      let rectPanel = new BABYLON.GUI.Rectangle();
      rectPanel.width = 1;
      rectPanel.height = "120px";
      rectPanel.top = 140;
      rectPanel.left = 0;
      rectPanel.cornerRadius = 0;
      rectPanel.color = "black";
      rectPanel.thickness = 0;
      rectPanel.background = "black";
      rectPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
      rectPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      this.advancedTexture.addControl(rectPanel);    

      let rectPanel2 = new BABYLON.GUI.Rectangle();
      rectPanel2.width = 1;
      rectPanel2.height = "140px";
      rectPanel2.top = 0;
      rectPanel2.left = 0;
      rectPanel2.cornerRadius = 0;
      rectPanel2.color = "black";
      rectPanel2.thickness = 0;
      rectPanel2.background = "black";
      rectPanel2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
      rectPanel2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      this.advancedTexture.addControl(rectPanel2);    


      let rectPanel3 = new BABYLON.GUI.Rectangle();
      rectPanel3.width = 1;
      rectPanel3.height = "200px";
      rectPanel3.top = 260;
      rectPanel3.left = 0;
      rectPanel3.cornerRadius = 0;
      rectPanel3.color = "black";
      rectPanel3.thickness = 0;
      rectPanel3.background = "black";
      rectPanel3.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
      rectPanel3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      this.advancedTexture.addControl(rectPanel3);    

      
      let rectPanel4 = new BABYLON.GUI.Rectangle();
      rectPanel4.width = 1;
      rectPanel4.height = "200px";
      rectPanel4.top = 450;
      rectPanel4.left = 0;
      rectPanel4.cornerRadius = 0;
      rectPanel4.color = "black";
      rectPanel4.thickness = 0;
      rectPanel4.background = "black";
      rectPanel4.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
      rectPanel4.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      this.advancedTexture.addControl(rectPanel4); 

      let text1 = new BABYLON.GUI.TextBlock();
      text1.text = "TRIFORCE 3D";
      text1.color = "#117e0d";
      text1.fontStyle = "italic";
      text1.fontSize = 40;
      rectPanel.addControl(text1);


      let button1 = BABYLON.GUI.Button.CreateSimpleButton("Button_1", "Comenzar juego");
      button1.width = 1;
      button1.height = "40px";
      button1.top = 98;
      button1.color = "white";
      button1.background = "black";
      this.advancedTexture.addControl(button1);
      button1.onPointerDownObservable.add(function(info) {
        console.log("button1:", info);
        self.changeState("scene_1");
      });

      
      
      this.image = new BABYLON.GUI.Image("img", "StartStateModels/startscreen.png");
      this.image.left = "0px";
      this.image.top = "-40px";
      this.image.width = "150px";
      this.image.height = "150px";
      this.image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
      this.advancedTexture.addControl(this.image);
      this.image.isVisible = true;
    }

    changeState(state_name) {
      this.game.changeState(state_name);
    }

    processInput(keys) {
    }

    update(elapsed) {
    }

    render() {
      this.scene.render();
    }
  }

  GameEngine.StartState = StartState;
  return GameEngine;
})(GameEngine || {})