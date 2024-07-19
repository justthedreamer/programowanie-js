import {type Alpha, Beta, Gamma} from "../Angle/Angles.js";


class DeviceOrientation {
    public alpha: Alpha
    public beta: Beta
    public gamma: Gamma

    constructor(alpha: Alpha, beta: Beta, gamma: Gamma) {
        this.alpha = alpha;
        this.beta = beta;
        this.gamma = gamma;
    }
}

export {DeviceOrientation};