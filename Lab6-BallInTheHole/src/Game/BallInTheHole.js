import { drawBall, drawBoard, drawHole } from "./UI/Drawing.js";
import AxisPosition from "../MotionModel/Position.js";
import { createGameComponents } from "./GameComponents.js";
import { createGameController } from "./GameController.js";
import BallInHoleUIController from "./Controller/UIController.js";
const BallState = {
    pause: false,
    run: true
};
class BallInTheHole {
    components;
    controller;
    state;
    animation = this.animate.bind(this);
    score;
    constructor(components, controller) {
        this.components = components;
        this.controller = controller;
        this.state = BallState.pause;
        this.score = 0;
        controller.attachWindowResizeController();
    }
    updateBallPosition() {
        const position = getUpdatedPosition(this.components.ball);
        updatePositionX(this.components.board, this.components.ball, position);
        updatePositionY(this.components.board, this.components.ball, position);
        function updatePositionX(board, ball, positions) {
            const minX = board.getMinWidth() + ball.getRadius();
            const maxX = board.getMaxWidth() - ball.getRadius();
            if (positions.positionX >= minX && positions.positionX <= maxX) {
                ball.updatePosition(new AxisPosition(positions.positionX, ball.getPosition().positionY));
            }
        }
        function updatePositionY(board, ball, positions) {
            const minY = board.getMinHeight() + ball.getRadius();
            const maxY = board.getMaxHeight() - ball.getRadius();
            if (positions.positionY >= minY && positions.positionY <= maxY) {
                ball.updatePosition(new AxisPosition(ball.getPosition().positionX, positions.positionY));
            }
        }
    }
    updateHole() {
        const hole = this.components.hole;
        const ball = this.components.ball;
        if (ballInHole(ball, hole)) {
            const board = this.components.board;
            const maxX = board.getMaxWidth() - hole.getRadius();
            const maxY = board.getMaxHeight() - hole.getRadius();
            const margin = board.getMargin();
            hole.updatePosition(getRandomPosition(hole.getRadius(), maxX, maxY, margin));
            this.updateScore();
        }
        function ballInHole(ball, hole) {
            const ballPosition = ball.getPosition();
            const ballRadius = ball.getRadius();
            const ballX = ballPosition.positionX;
            const ballY = ballPosition.positionY;
            const holePosition = hole.getPosition();
            const holeRadius = hole.getRadius();
            const holeX = holePosition.positionX;
            const holeY = holePosition.positionY;
            const a = Math.abs(ballX - holeX);
            const b = Math.abs(ballY - holeY);
            const distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
            // Whole ball is in the hole.
            return distance <= (holeRadius - ballRadius);
        }
    }
    animate() {
        if (this.state) {
            requestAnimationFrame(this.animation);
            this.components.canvas.clearRect();
            this.updateBallPosition();
            this.updateHole();
            drawBoard(this.components.canvas, this.components.board);
            drawHole(this.components.canvas, this.components.hole);
            drawBall(this.components.canvas, this.components.ball);
        }
    }
    updateScore() {
        this.score++;
        BallInHoleUIController.updateScore(this.score);
    }
    async runAsync() {
        this.state = BallState.run;
        await this.controller.attachMotionControllerAsync();
        this.animate();
    }
    pause() {
        this.controller.detachMotionController();
        this.state = BallState.pause;
    }
}
export function buildApplication() {
    const gameComponents = createGameComponents();
    const gameController = createGameController(gameComponents.board, gameComponents.ball);
    return new BallInTheHole(gameComponents, gameController);
}
function getUpdatedPosition(element) {
    const direction = element.getDirection();
    const speed = element.getSpeed();
    const position = element.getPosition();
    const x = position.positionX + (speed.speedX * direction.directionX);
    const y = position.positionY + (speed.speedY * direction.directionY);
    return new AxisPosition(x, y);
}
export function getRandomPosition(radius, maxWidth, maxHeight, margin) {
    const minX = radius + margin;
    const maxX = (maxWidth - radius) - margin;
    const minY = radius + margin;
    const maxY = (maxHeight - radius) - margin;
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    return new AxisPosition(x, y);
}
export function isBallInTheHole(ball, hole) {
    const ballPos = ball.getPosition();
    const holePos = hole.getPosition();
    const distance = Math.sqrt(Math.pow(ballPos.positionX - holePos.positionY, 2) + Math.pow(ballPos.positionX - holePos.positionY, 2));
    return distance <= ball.getRadius() + hole.getRadius();
}
