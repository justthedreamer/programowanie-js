import {
  ApplicationSettings,
  MIN_RADIUS,
  MOUSE_MODE_BACK,
  MOUSE_MODE_PUSH,
} from "./ApplicationSettings.js";
import { BallFactory } from "./BallFactory.js";
import { BallsPipeline } from "./BallsPipeline.js";

function PushBack(ball, mouseX, mouseY, triggerDistance, mousePower) {
  const xDistance = ball.xPos - mouseX;
  const yDistance = ball.yPos - mouseY;
  const distace = Math.round(
    Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 2)
  );

  if (distace > triggerDistance) {
    return;
  }

  if (xDistance < 0 && ball.speedX >= 0) {
    ball.xPos += -Math.abs(ball.speedX) + mousePower * 0.1;
    ball.speedX = -Math.abs(ball.speedX);
  }

  if (xDistance > 0 && ball.speedX <= 0) {
    ball.xPos += Math.abs(ball.speedX) + mousePower * 0.1;
    ball.speedX = Math.abs(ball.speedX);
  }

  if (yDistance > 0 && ball.speedY >= 0) {
    ball.yPos += -Math.abs(ball.speedY) + mousePower * 0.1;
    ball.speedY = -Math.abs(ball.speedY);
  }

  if (yDistance > 0 && ball.speedY <= 0) {
    ball.yPos += Math.abs(ball.speedY) + mousePower * 0.1;
    ball.speedY = Math.abs(ball.speedY);
  }
}

function PushToPoint(
  ball,
  destinationX,
  destinationY,
  triggerDistance,
  mosuePower
) {
  const a = Math.abs(ball.xPos - destinationX);
  const b = Math.abs(ball.yPos - destinationY);
  const c = Math.round(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2), 2));

  if (c > triggerDistance) {
    return;
  }

  const speedX = (a / c) * (mosuePower)
  const speedY = (b / c) * (mosuePower)

  if (ball.xPos > destinationX) {
    ball.speedX = -Math.abs(speedX);
  }
  if (ball.xPos < destinationX) {
    ball.speedX = Math.abs(speedX);
  }

  if (ball.yPos > destinationY) {
    ball.speedY = -Math.abs(speedY);
  }
  if (ball.yPos < destinationY) {
    ball.speedY = Math.abs(speedY);
  }
}

function ClearContext(ctx, canvas) {
  ctx.clearRect(0, 0, canvas, width, canvas.height);
}

class BallsApplication {
  constructor(board, canvas, settings, balls) {
    this.board = board;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.settings = settings;
    this.balls = [...balls];
    this.animate = this.animate.bind(this);
    this.pipelines = [];
    this.state = false;
  }
  #initializePipelines() {
    var pipelines = [];

    for (let i = 0; i <= this.balls.length; i++) {
      for (let j = i + 1; j <= this.balls.length - 1; j++) {
        pipelines.push(
          new BallsPipeline(this.balls[i], this.balls[j], this.settings)
        );
      }
    }

    this.pipelines = pipelines;
  }

  spawnAction() {
    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const selectedBalls = this.balls.filter((ball) => {
        const xArea =
          x >= ball.xPos - ball.radius && x <= ball.xPos + ball.radius;
        const yArea =
          y >= ball.yPos - ball.radius && y <= ball.yPos + ball.radius;
        return xArea && yArea;
      });

      selectedBalls.forEach((ball) => {
        const index = this.balls.indexOf(ball);
        if (index > -1) {
          this.balls.splice(index, 1);
        }
      });

      const newBalls = BallFactory.CreateBalls(
        this.settings,
        this.canvas,
        selectedBalls.length * 2
      );

      newBalls.forEach((ball) => {
        this.balls.push(ball);
      });

      this.#initializePipelines();
    });
  }

  mouseAction() {
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const triggerDistance = this.settings.mouseTriggerDistance;
      const mousePower = this.settings.mousePower;

      switch (this.settings.mouseMode) {
        case MOUSE_MODE_BACK: {
          this.balls.forEach((ball) =>
            PushBack(ball, x, y, triggerDistance, mousePower)
          );
          break;
        }
        case MOUSE_MODE_PUSH: {
          this.balls.forEach((ball) =>
            PushToPoint(ball, x, y, triggerDistance, mousePower)
          );
        }
        default: {
          break;
        }
      }
    });
  }

  updateBalls() {
    this.balls.forEach((ball) => {
      if (ball.radius <= MIN_RADIUS) {
        const index = this.balls.indexOf(ball);
        if (index > -1) {
          this.balls.splice(index, 1);
        }
      }
    });
  }

  clearContext() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const newBalls = BallFactory.CreateBalls(
      this.settings,
      this.canvas,
      this.settings.ballsCount
    );
    this.balls = newBalls;
    this.#initializePipelines();
  }

  updateBallsCount() {
    var ballsCount = this.settings.ballsCount;

    if (this.balls.length < ballsCount) {
      const difference = ballsCount - this.balls.length;

      const balls = BallFactory.CreateBalls(
        this.settings,
        this.canvas,
        difference
      );

      balls.forEach((ball) => {
        this.balls.push(ball);
      });

      this.#initializePipelines();
    } else {
      const difference = this.balls.length - ballsCount - 1;
      for (let i = 0; i <= difference; i++) {
        this.balls.pop();
      }
      this.#initializePipelines();
    }

  }

  animate() {
    if (this.state) {
      requestAnimationFrame(this.animate);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.updateBalls();
      this.#initializePipelines();

      this.pipelines.forEach((pipeline) => {
        pipeline.drawPipeline(
          this.ctx,
          this.settings.ballsPipelineDistance,
          this.settings.corruptionState,
          this.settings.enegryStealingPower
        );
      });

      this.balls.forEach((ball) => {
        ball.update(this.canvas);
        ball.draw(this.ctx);
      });
    }
  }

  run() {
    if (!this.state) {
      this.state = true;
      this.#initializePipelines();
      this.animate();
      this.spawnAction();
      this.mouseAction();
    }
  }

  stop() {
    if (this.state) {
      this.state = false;
    }
  }
}

export { BallsApplication };
