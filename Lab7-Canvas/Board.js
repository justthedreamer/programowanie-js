import { MOUSE_MODE_BACK, MOUSE_MODE_PUSH } from "./ApplicationSettings.js";

function AddInputFieldListener(node, callback) {
  node.addEventListener("input", (e) => {
    var outputBox = e.target.parentNode.querySelector("span.value");
    outputBox.innerHTML = "";
    outputBox.innerHTML = e.target.value;

    if (callback) {
      callback(e.target.value);
    }
  });
}

class Board {
  constructor(applicationSettings) {
    this.applicationSettings = applicationSettings;
  }
  initialize() {
    const board = document.querySelector("#board");

    const xBoardSizeLabel = document.querySelector("label[for='x-board-size']");
    const xBoardSize = document.querySelector("#x-board-size");

    const yBoardSizeLabel = document.querySelector("label[for='y-board-size']");
    const yBoradSize = document.querySelector("#y-board-size");

    xBoardSize.addEventListener("input", (e) => {
      const value = `${e.target.value}%`;
      board.style.width = value;
      xBoardSizeLabel.innerHTML = "";
      xBoardSizeLabel.innerHTML = value;
    });

    yBoradSize.addEventListener("input", (e) => {
      const value = `${e.target.value}%`;
      board.style.height = value;
      yBoardSizeLabel.innerHTML = "";
      yBoardSizeLabel.innerHTML = value;
    });


    const ballsCount = document.querySelector("#balls-count");
    AddInputFieldListener(ballsCount, (value) => {
      this.applicationSettings.ballsCount = value;
    });

    const pipelineDistance = document.querySelector("#pipeline-distance");
    AddInputFieldListener(pipelineDistance, (value) => {
      this.applicationSettings.ballsPipelineDistance = value;
    });

    const ballsPowerX = document.querySelector("#balls-power-x");
    AddInputFieldListener(ballsPowerX, (value) => {
      this.applicationSettings.ballPowerX = value;
    });

    const ballsPowerY = document.querySelector("#balls-power-y");
    AddInputFieldListener(ballsPowerY, (value) => {
      this.applicationSettings.ballPowerY = value;
    });

    function HandleMoseModeButton(node, callback) {
      node.addEventListener("click", (e) => {
        e.target.classList.toggle("active");
        callback();
      });
    }

    const push = document.querySelector("#push");
    HandleMoseModeButton(push, () => {
      if (push.classList.contains("active")) {
        stave.classList.remove("active");
        this.applicationSettings.mouseMode = MOUSE_MODE_PUSH;
      } else {
        this.applicationSettings.mouseMode = null;
      }
    });

    const stave = document.querySelector("#stave");
    HandleMoseModeButton(stave, () => {
      if (stave.classList.contains("active")) {
        push.classList.remove("active");
        this.applicationSettings.mouseMode = MOUSE_MODE_BACK;
      } else {
        this.applicationSettings.mouseMode = null;
      }
    });

    const interactions = document.querySelector("button#interactions");
    const mouseSettings = document.querySelector("#mouse-settings");

    interactions.addEventListener("click", () => {
      mouseSettings.classList.toggle("active");
    });

    const mousePower = document.querySelector("#mouse-power");
    AddInputFieldListener(mousePower, (value) => {
      this.applicationSettings.mousePower = value;
    });

    const triggerDistance = document.querySelector("#trigger-distance");
    AddInputFieldListener(triggerDistance, (value) => {
      this.applicationSettings.mouseTriggerDistance = value;
    });

    const corruption = document.querySelector("button#corruption");
    const corruptionSettings = document.querySelector("#corruption-settings");

    corruption.addEventListener("click", () => {
      corruptionSettings.classList.toggle("active");
    });

    const corruptionState = document.querySelector("#corruption-state");
    corruptionState.addEventListener("click", () => {
      corruptionState.classList.toggle("active");

      if (corruptionState.classList.contains("active")) {
        corruptionState.innerHTML = "";
        corruptionState.innerHTML = "on";
        this.applicationSettings.corruptionState = true;
      } else {
        corruptionState.innerHTML = "";
        corruptionState.innerHTML = "off";
        this.applicationSettings.corruptionState = false;
      }
    });

    const energryStealing = document.querySelector("#corruption-power");
    AddInputFieldListener(energryStealing, (value) => {
      this.applicationSettings.enegryStealingPower = value;
    });
  }

  addManagingHandlers(app) {
    const start = document.querySelector("#start");
    start.addEventListener("click", () => {
      app.run();
    });

    const stop = document.querySelector("#stop");
    stop.addEventListener("click", () => {
      app.stop();
    });

    const clear = document.querySelector("#clear");
    clear.addEventListener("click", () => {
      app.clearContext();
    });

    const updateCount = document.querySelector("#balls-count");
    updateCount.addEventListener("input", (e) => {
      const value = e.target.value;
      this.applicationSettings.ballsCount = value;

      app.updateBallsCount();
    });
  }
}

export { Board };
