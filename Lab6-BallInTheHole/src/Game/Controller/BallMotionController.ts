import type Ball from "../Model/Ball.js";

export default abstract class BallMotionController {
    protected state = false;
    protected readonly ball: Ball;

    protected constructor(ball: Ball) {
        this.ball = ball;
    }

    async attachAsync(): Promise<void> {
        this.state = true;
    }

    detach(): void {
        this.state = false;
    }

    abstract restartAsync(): Promise<void>;
}