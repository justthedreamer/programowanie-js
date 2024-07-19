export default class BallMotionController {
    state = false;
    ball;
    constructor(ball) {
        this.ball = ball;
    }
    async attachAsync() {
        this.state = true;
    }
    detach() {
        this.state = false;
    }
}
