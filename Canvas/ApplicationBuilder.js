import { BallFactory } from "./BallFactory.js";
import { BallsApplication } from "./BallsApplication.js";


function AddObserver(boardNode, canvasNode) {
  const observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry.target === boardNode) {
        canvasNode.width = boardNode.clientWidth;
        canvasNode.height = boardNode.clientHeight;
      }
    }
  });

  observer.observe(boardNode);
}

function AddBoardFunctions(app,board){

}

class ApplicationBuilder {
  static Build(applicationSettings,board) {
    const boardNode = document.querySelector("#board");
    const canvas = document.createElement("canvas");

    canvas.width = boardNode.clientWidth;
    canvas.height = boardNode.clientHeight;

    boardNode.appendChild(canvas);

    AddObserver(boardNode, canvas);
    
    const balls = BallFactory.CreateBalls(applicationSettings, canvas);
    
    const app = new BallsApplication(boardNode, canvas, applicationSettings, balls);

    board.addManagingHandlers(app);
    board.initialize();

    return app;
  }
}

export { ApplicationBuilder };
