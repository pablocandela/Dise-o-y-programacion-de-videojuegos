var GameEngine = (function(GameEngine) {
  const PI_180 = Math.PI/180;
  let move_vector;

  class Enemy2 {
    constructor(scene, character, id, x=0, y=5, z=-5) {
      this.scene = scene;
      this.character = character;
      this.mesh = scene.getMeshByName("Enemy").clone("My_"+id);
      this.mesh.checkCollisions = true;
      this.mesh.ellipsoid = new BABYLON.Vector3(0.911918/2, 1.15347/2, 1.02883/2);
      this.mesh.ellipsoidOffset = new BABYLON.Vector3(0, 1.15347/2, 0);
      this.mesh.position.x = x;
      this.mesh.position.y = y;
      this.mesh.position.z = z;

      // let debug_ellipsoid = BABYLON.MeshBuilder.CreateSphere("tmp_sphere", {diameterX: 0.911918, diameterY: 1.15347, diameterZ: 1.02883}, scene);
      // debug_ellipsoid.position.y = 1.15347/2;
      // debug_ellipsoid.parent = this.mesh;
      // debug_ellipsoid.visibility = 0.25;

      this.skeleton = scene.getSkeletonByName("EnemyArmature").clone(id+"_Armature_Name", id+"_Armature_Id");
      this.mesh.skeleton = this.skeleton;

      this.skeleton.needInitialSkinMatrix = false;

      this.idle_range = this.skeleton.getAnimationRange("Idle");
      this.walk_range = this.skeleton.getAnimationRange("Walk");
      
      this.state = "Idle";

      scene.beginAnimation(this.skeleton, this.walk_range.from, this.walk_range.to, true);

      this.gravity = new BABYLON.Vector3();
      this.velocity = new BABYLON.Vector3();
      this.vr = 0;
      this.rotation = 0;
      this.speed = 0;
      this.jump_heigth = 0.1;
      this.canJump = true;
      this.inFloor = false;  
    }

    moveTo(x, y, z) {
      this.mesh.position.x = x;
      this.mesh.position.y = y;
      this.mesh.position.z = z;
    }

    randomWalk() {
      this.speed = 2;

      if (Math.random() < 0.02) {
        this.rotation = (Math.random() < 0.5) ? Math.PI/4 : -Math.PI/4;
      }

    }

    update(elapsed) {
      if (BABYLON.Vector3.Distance(this.mesh.position, this.character.mesh.position) < 7) {
        move_vector = BABYLON.Vector3.Lerp(this.mesh.position, this.character.mesh.position, 0.03).subtract(this.mesh.position);
        this.mesh.moveWithCollisions(move_vector);

        this.mesh.lookAt(this.character.mesh.position);
      }
      else {
        this.randomWalk();

        this.velocity.x = -Math.cos(this.rotation) * this.speed * elapsed;
        this.velocity.y += this.scene.gravity.y * elapsed;
        this.velocity.z =  Math.sin(this.rotation) * this.speed * elapsed;
  
        this.mesh.rotation.y = this.rotation +Math.PI/2;
  
        this.mesh.moveWithCollisions(this.velocity);
      }
      
      if (this.inFloor) {
        this.velocity.y = Math.max(this.scene.gravity.y, this.velocity.y);
      }

      this.inFloor = false;
    }

  }

  GameEngine.Enemy2 = Enemy2;
  return GameEngine;
})(GameEngine || {})