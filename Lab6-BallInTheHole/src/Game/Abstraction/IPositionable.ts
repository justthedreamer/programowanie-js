import type AxisPosition from "../../MotionModel/Position.js";

export default interface IPositionableElement {
    updatePosition(position : AxisPosition): void;
}