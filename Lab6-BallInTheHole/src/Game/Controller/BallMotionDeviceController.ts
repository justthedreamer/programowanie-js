import type IObserver from "../../Common/Observer/IObserver.js";
import type {DeviceOrientation} from "../../Device/Orientation/DeviceOrientation.js";
import type Ball from "../Model/Ball.js";
import {getDeviceOrientationAsync} from "../../Device/Orientation/DeviceOrientationController.js";
import BallMotionController from "./BallMotionController.js";
import type {IDeviceMotionHandler} from "../../Handlers/BallMotion/Device/IDeviceMotionHandler.js";

export class BallMotionDeviceController extends BallMotionController implements IObserver<DeviceOrientation> {
    private initialOrientation: DeviceOrientation;
    private handler: IDeviceMotionHandler

    constructor(ball: Ball, handler: IDeviceMotionHandler) {
        super(ball);
        this.handler = handler;
    }

    async attachAsync(): Promise<void> {
        this.initialOrientation = await getDeviceOrientationAsync();
        this.state = true;
    }

    handle(obj: DeviceOrientation): void {
        if (this.state) {
            this.handler.handle(this.ball, this.initialOrientation, obj)
        }
    }

    async restartAsync(): Promise<void> {
        this.initialOrientation = await getDeviceOrientationAsync()
    }
}