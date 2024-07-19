import AxisPosition from "../../MotionModel/Position.js";
import type IPositionableElement from "../Abstraction/IPositionable.js";

export default class Hole implements IPositionableElement {
    private position: AxisPosition
    private radius: number
    private color: string

    constructor(radius: number, position: AxisPosition, color: string = '#23232F') {
        this.position = position;
        this.radius = radius;
        this.color = color;
    }

    getPosition(): AxisPosition {
        return new AxisPosition(this.position.positionX, this.position.positionY);
    }

    getRadius(): number {
        return this.radius;
    }

    getColor(): string {
        return this.color;
    }

    updatePosition(position: AxisPosition): void {
        this.position = position;
    }

    setRadius(radius: number) {
        this.radius = radius;
    }

    setColor(color: string) {
        this.color = color;
    }
}