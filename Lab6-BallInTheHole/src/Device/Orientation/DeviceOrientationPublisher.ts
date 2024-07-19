import {DeviceOrientation} from "./DeviceOrientation.js";
import Publisher from "../../Common/Observer/Publisher.js";

export default class DeviceOrientationPublisher extends Publisher<DeviceOrientation> {
    constructor() {
        super();
    }
}

