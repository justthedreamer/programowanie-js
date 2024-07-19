import AxisPosition from "../../MotionModel/Position.js";
export default class Hole {
    position;
    radius;
    color;
    constructor(radius, position, color = '#23232F') {
        this.position = position;
        this.radius = radius;
        this.color = color;
    }
    getPosition() {
        return new AxisPosition(this.position.positionX, this.position.positionY);
    }
    getRadius() {
        return this.radius;
    }
    getColor() {
        return this.color;
    }
    updatePosition(position) {
        this.position = position;
    }
    setRadius(radius) {
        this.radius = radius;
    }
    setColor(color) {
        this.color = color;
    }
}
