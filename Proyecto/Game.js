var GameEngine = (function(GameEngine) {

  class Game {
    constructor(engine) {
      this.engine = engine;
      this.state = new GameEngine.StartState(engine, this);
    }

    changeState(state_name) {
      document.getElementById("theCanvas").blur();
      
      if (state_name === "scene_1") {
        this.state.scene.dispose();
        this.state = new GameEngine.Level1State(this.engine, this);
      }
      else if (state_name === "scene_2") {
        this.state.scene.dispose();
        this.state = new GameEngine.Level2State(this.engine, this);
      }
      else if (state_name === "scene_3") {
        this.state.scene.dispose();
        this.state = new GameEngine.Level3State(this.engine, this);
      }
    }

    processInput() {
      this.state.processInput();
    }

    update(elapsed) {
      this.state.update(elapsed);
    }

    render() {
      this.state.render();
    }
  }

  GameEngine.Game = Game;
  return GameEngine;
})(GameEngine || {})