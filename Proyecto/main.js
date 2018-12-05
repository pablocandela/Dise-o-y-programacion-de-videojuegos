window.addEventListener("load", function() {
  let theCanvas = document.getElementById("theCanvas");
  let engine = new BABYLON.Engine(theCanvas, true);

  let game =  new GameEngine.Game(engine);
  engine.runRenderLoop(function() {
    game.processInput();
    game.update(engine.getDeltaTime()/1000);
    game.render();
  });

});