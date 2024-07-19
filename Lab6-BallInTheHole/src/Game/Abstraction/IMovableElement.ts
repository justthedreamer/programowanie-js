import type {AxisDirection} from "../../MotionModel/Direction.js";
import type {AxisSpeed} from "../../MotionModel/Speed.js";
import type AxisPosition from "../../MotionModel/Position.js";

export default interface IMovableElement {
    getPosition(): AxisPosition;

    updatePosition(position: AxisPosition): void

    getDirection(): AxisDirection;

    updateDirection(direction: AxisDirection): void

    getSpeed(): AxisSpeed;

    updateSpeed(speed: AxisSpeed): void
}