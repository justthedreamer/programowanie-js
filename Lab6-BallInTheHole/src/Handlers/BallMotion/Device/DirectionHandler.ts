import {Direction} from "../../../MotionModel/Direction.js";
import type OrientationDifference from "./DirectionHandlers.js";

export default abstract class DirectionHandler {
    abstract invoke(difference: OrientationDifference): Direction
}