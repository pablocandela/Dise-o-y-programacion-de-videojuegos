var GameEngine = (function(GameEngine) {
  const PI_180 = Math.PI/180;
  let self;

  class Character2 {
    constructor(scene) {
      this.scene = scene;
      this.mesh = scene.getMeshByName("Neptunia");
      this.mesh.checkCollisions = true;
      this.mesh.ellipsoid = new BABYLON.Vector3(1.1933/2, 1.6646/2, 1.0242/2);
      this.mesh.ellipsoidOffset = new BABYLON.Vector3(0, 1.6646/2, 0);
      this.mesh.position.y = 5;
      this.lives = 3;

      this.weapon = scene.getMeshByName("Weapon");
      this.weapon.parent = this.mesh;

      // let debug_ellipsoid = BABYLON.MeshBuilder.CreateSphere("tmp_sphere", {diameterX: 1.1933, diameterY: 1.6646, diameterZ: 1.0242}, scene);
      // debug_ellipsoid.position.y = 1.6646/2;
      // debug_ellipsoid.parent = this.mesh;
      // debug_ellipsoid.visibility = 0.25;

      this.cameraTarget = BABYLON.MeshBuilder.CreateBox("CameraTarget", {width: 0.1, height: 0.1, depth: 0.1}, scene);
      this.cameraTarget.visibility = 1;
      this.cameraTarget.parent = this.mesh;
      this.cameraTarget.position.y = 1.6646/2;

      this.skeleton = scene.getSkeletonByName("Armature");
      this.skeleton.needInitialSkinMatrix = false;

      this.idle_range = this.skeleton.getAnimationRange("Idle");
      this.walk_range = this.skeleton.getAnimationRange("Walk");
      this.atack_range = this.skeleton.getAnimationRange("Atack");

      this.state = "Idle";

      scene.beginAnimation(this.skeleton, this.idle_range.from, this.idle_range.to, true);

      this.gravity = new BABYLON.Vector3();
      this.velocity = new BABYLON.Vector3();
      this.vr = 0;
      this.rotation = -Math.PI/2;
      this.speed = 0;
      this.jump_heigth = 0.1;
      this.canJump = true;
      this.inFloor = false;
    }

    processInput(keys) {
      self = this;
      this.vr = 0;

      if (keys["ArrowUp"]) {
        if (this.state === "Idle") {
          this.scene.stopAnimation(this.skeleton);
          this.scene.beginAnimation(this.skeleton, this.walk_range.from, this.walk_range.to, true);
          this.rotation = 270 * PI_180;
          this.state = "Walk";
        }
        this.speed = 7;
      } else if (keys["ArrowDown"]) {
        if (this.state === "Idle") {
          this.scene.stopAnimation(this.skeleton);
          this.scene.beginAnimation(this.skeleton, this.walk_range.from, this.walk_range.to, true);
          this.rotation = 90 * PI_180;
          this.state = "Walk";
        }
        this.speed = 7;
      } else if (keys["ArrowLeft"]) {
        if (this.state === "Idle") {
          this.scene.stopAnimation(this.skeleton);
          this.scene.beginAnimation(this.skeleton, this.walk_range.from, this.walk_range.to, true);
          this.rotation = 180 * PI_180;
          this.state = "Walk";
        }
        this.speed = 7;
      } else if (keys["ArrowRight"]) {
        if (this.state === "Idle") {
          this.scene.stopAnimation(this.skeleton);
          this.scene.beginAnimation(this.skeleton, this.walk_range.from, this.walk_range.to, true);
          this.rotation = 0 * PI_180;
          this.state = "Walk";
        }
        this.speed = 7;
      } else {
        if (this.state === "Walk") {
          this.scene.stopAnimation(this.skeleton);
          this.scene.beginAnimation(this.skeleton, this.idle_range.from, this.idle_range.to, true);
          this.state = "Idle";
        }
        this.speed = 0;
        this.velocity.x = 0;
        this.velocity.z = 0;
    }

    if ((this.state !== "Atack") && (keys["a"] || keys["A"])) {
        this.state = "Atack";
        // https://doc.babylonjs.com/api/classes/babylon.scene#beginanimation
        this.scene.beginAnimation(this.skeleton, this.atack_range.from, this.atack_range.to, false, 1, function(){
            self.state = "Idle";
        });
    }
    }

    update(elapsed) {
      this.velocity.x = -Math.cos(this.rotation) * this.speed * elapsed;
      this.velocity.y += this.scene.gravity.y * elapsed;
      this.velocity.z =  Math.sin(this.rotation) * this.speed * elapsed;

      this.mesh.rotation.y = this.rotation +Math.PI/2;
      this.cameraTarget.rotation.y = this.mesh.rotation.y;

      this.mesh.moveWithCollisions(this.velocity);
      
      if (this.inFloor) {
        this.velocity.y = Math.max(this.scene.gravity.y, this.velocity.y);
      }

      this.inFloor = false;
    }
    
    
  }

  GameEngine.Character2 = Character2;
  return GameEngine;
})(GameEngine || {})
