import {DeviceOrientation} from "./DeviceOrientation.js";
import ObservableController from "../../InputControllers/ObservableController.js";
import {Alpha, Beta, Gamma} from "../Angle/Angles.js";
import type IObservable from "../../Common/Observer/IObservable.js";

async function getDeviceOrientationAsync(): Promise<DeviceOrientation> {
    return new Promise<DeviceOrientation>((resolve, reject) => {
        if (!isDeviceOrientationSupported()) {
            reject(new Error("DeviceOrientation is not supported"));
        }

        const handler = (e: DeviceOrientationEvent) => {
            if (e.alpha === null || e.beta === null || e.gamma === null) {
                reject(new Error("Device orientation not available."));
            }

            const orientation = new DeviceOrientation(new Alpha(e.alpha), new Beta(e.beta), new Gamma(e.gamma));
            window.removeEventListener('deviceorientation', handler);
            resolve(orientation);
        }

        window.addEventListener('deviceorientation', handler);

        setTimeout(() => {
            window.removeEventListener('deviceorientation', handler);
            reject(new Error("DeviceOrientation not available."));
        }, 100)
    })
}

function isDeviceOrientationSupported(): boolean {
    return 'DeviceOrientationEvent' in window;
}

class DeviceOrientationController extends ObservableController<DeviceOrientation> {
    private alpha: Alpha
    private beta: Beta
    private gamma: Gamma

    private readonly deviceOrientationHandler: (e: DeviceOrientationEvent) => void

    constructor(publisher: IObservable<DeviceOrientation>) {
        super(publisher)
        this.alpha = new Alpha(0)
        this.beta = new Beta(0)
        this.gamma = new Gamma(0)
        this.deviceOrientationHandler = this.createDeviceOrientationHandler()
    }

    public getValue(): DeviceOrientation {
        return new DeviceOrientation(this.alpha, this.beta, this.gamma)
    }

    public attach(): void {
        window.addEventListener('deviceorientation', this.deviceOrientationHandler);
    }

    public detach(): void {
        window.removeEventListener('deviceorientation', this.deviceOrientationHandler);
    }

    private createDeviceOrientationHandler() {
        return (e: DeviceOrientationEvent): void => {
            this.alpha = new Alpha(e.alpha);
            this.beta = new Beta(e.beta);
            this.gamma = new Gamma(e.gamma);
            this.publisher.notify(this.getValue());
        }
    }
}

export {DeviceOrientationController, getDeviceOrientationAsync}