import { getDeviceOrientationAsync } from "../../Device/Orientation/DeviceOrientationController.js";
import BallMotionController from "./BallMotionController.js";
export class BallMotionDeviceController extends BallMotionController {
    initialOrientation;
    handler;
    constructor(ball, handler) {
        super(ball);
        this.handler = handler;
    }
    async attachAsync() {
        this.initialOrientation = await getDeviceOrientationAsync();
        this.state = true;
    }
    handle(obj) {
        if (this.state) {
            this.handler.handle(this.ball, this.initialOrientation, obj);
        }
    }
    async restartAsync() {
        this.initialOrientation = await getDeviceOrientationAsync();
    }
}
