import { DeviceOrientation } from "./DeviceOrientation.js";
import ObservableController from "../../InputControllers/ObservableController.js";
import { Alpha, Beta, Gamma } from "../Angle/Angles.js";
async function getDeviceOrientationAsync() {
    return new Promise((resolve, reject) => {
        if (!isDeviceOrientationSupported()) {
            reject(new Error("DeviceOrientation is not supported"));
        }
        const handler = (e) => {
            if (e.alpha === null || e.beta === null || e.gamma === null) {
                reject(new Error("Device orientation not available."));
            }
            const orientation = new DeviceOrientation(new Alpha(e.alpha), new Beta(e.beta), new Gamma(e.gamma));
            window.removeEventListener('deviceorientation', handler);
            resolve(orientation);
        };
        window.addEventListener('deviceorientation', handler);
        setTimeout(() => {
            window.removeEventListener('deviceorientation', handler);
            reject(new Error("DeviceOrientation not available."));
        }, 100);
    });
}
function isDeviceOrientationSupported() {
    return 'DeviceOrientationEvent' in window;
}
class DeviceOrientationController extends ObservableController {
    alpha;
    beta;
    gamma;
    deviceOrientationHandler;
    constructor(publisher) {
        super(publisher);
        this.alpha = new Alpha(0);
        this.beta = new Beta(0);
        this.gamma = new Gamma(0);
        this.deviceOrientationHandler = this.createDeviceOrientationHandler();
    }
    getValue() {
        return new DeviceOrientation(this.alpha, this.beta, this.gamma);
    }
    attach() {
        window.addEventListener('deviceorientation', this.deviceOrientationHandler);
    }
    detach() {
        window.removeEventListener('deviceorientation', this.deviceOrientationHandler);
    }
    createDeviceOrientationHandler() {
        return (e) => {
            this.alpha = new Alpha(e.alpha);
            this.beta = new Beta(e.beta);
            this.gamma = new Gamma(e.gamma);
            this.publisher.notify(this.getValue());
        };
    }
}
export { DeviceOrientationController, getDeviceOrientationAsync };
