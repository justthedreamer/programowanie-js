import {AxisDirection} from "../../../MotionModel/Direction.js";
import type Ball from "../../../Game/Model/Ball.js";

interface IBallMotionKeyboardHandler {
    handle(ball: Ball, currentDirection: AxisDirection): void;
}

class BallMotionKeyboardHandler implements IBallMotionKeyboardHandler {
    handle(ball: Ball, currentDirection: AxisDirection): void {
        throw new Error("Method not implemented.");
    }
}