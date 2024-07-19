import { AxisSpeed, Speed } from "../../MotionModel/Speed.js";
import { AxisDirection, Direction } from "../../MotionModel/Direction.js";
import AxisPosition from "../../MotionModel/Position.js";
export default class Ball {
    direction;
    speed;
    position;
    radius;
    color;
    constructor(radius, position, color = "#81B622") {
        this.direction = new AxisDirection(Direction.None, Direction.None);
        this.speed = new AxisSpeed(Speed.Slow, Speed.Slow);
        this.position = position;
        this.radius = radius;
        this.color = color;
    }
    getRadius() {
        return this.radius;
    }
    getColor() {
        return this.color;
    }
    getPosition() {
        return new AxisPosition(this.position.positionX, this.position.positionY);
    }
    getDirection() {
        return new AxisDirection(this.direction.directionX, this.direction.directionY);
    }
    getSpeed() {
        return new AxisSpeed(this.speed.speedX, this.speed.speedY);
    }
    updatePosition(position) {
        this.position = position;
    }
    updateDirection(directions) {
        this.direction = directions;
    }
    updateSpeed(speed) {
        this.speed = speed;
    }
}
