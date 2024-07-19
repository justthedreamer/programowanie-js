import {AxisSpeed, Speed} from "../../MotionModel/Speed.js";
import {AxisDirection, Direction} from "../../MotionModel/Direction.js";
import AxisPosition from "../../MotionModel/Position.js";
import type IMovableElement from "../Abstraction/IMovableElement.js";

export default class Ball implements IMovableElement {
    private direction: AxisDirection;
    private speed: AxisSpeed;
    private position: AxisPosition;
    private readonly radius: number
    private readonly color: string

    constructor(radius: number, position: AxisPosition, color: string = "#81B622") {
        this.direction = new AxisDirection(Direction.None, Direction.None);
        this.speed = new AxisSpeed(Speed.Slow, Speed.Slow);
        this.position = position;
        this.radius = radius
        this.color = color
    }

    getRadius(): number {
        return this.radius;
    }

    getColor(): string {
        return this.color;
    }

    getPosition(): AxisPosition {
        return new AxisPosition(this.position.positionX, this.position.positionY);
    }

    getDirection(): AxisDirection {
        return new AxisDirection(this.direction.directionX, this.direction.directionY);
    }

    getSpeed(): AxisSpeed {
        return new AxisSpeed(this.speed.speedX, this.speed.speedY);
    }

    updatePosition(position: AxisPosition): void {
        this.position = position;
    }

    updateDirection(directions: AxisDirection): void {
        this.direction = directions;
    }

    updateSpeed(speed: AxisSpeed): void {
        this.speed = speed;
    }
}