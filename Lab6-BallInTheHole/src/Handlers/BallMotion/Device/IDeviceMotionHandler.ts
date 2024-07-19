import type Ball from "../../../Game/Model/Ball.js";
import {DeviceOrientation} from "../../../Device/Orientation/DeviceOrientation.js";
import type IMovableElement from "../../../Game/Abstraction/IMovableElement.js";

export interface IDeviceMotionHandler {
    handle(movableElement: IMovableElement, initialOrientation: DeviceOrientation, currentOrientation: DeviceOrientation): void
}