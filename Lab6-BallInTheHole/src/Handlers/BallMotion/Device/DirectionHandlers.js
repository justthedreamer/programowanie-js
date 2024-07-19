import { Direction } from "../../../MotionModel/Direction.js";
import DirectionHandler from "./DirectionHandler.js";
import { AngleType } from "../../../Device/Angle/AngleType.js";
export default class OrientationDifference {
    value;
    constructor(value) {
        this.value = value;
    }
    static Calculate(val1, val2, angle) {
        switch (angle) {
            case AngleType.Alpha:
                return new OrientationDifference(val1.alpha.value - val2.alpha.value);
            case AngleType.Beta:
                return new OrientationDifference(val1.beta.value - val2.beta.value);
            case AngleType.Gamma: {
                return new OrientationDifference(val1.gamma.value - val2.gamma.value);
            }
            default:
                throw Error(`Invalid angle type ${angle}.`);
        }
    }
}
class AlphaDirectionHandler extends DirectionHandler {
    invoke(difference) {
        if (difference.value === 0)
            return Direction.None;
        return difference.value < 0 ? Direction.East : Direction.West;
    }
}
class BetaDirectionHandler extends DirectionHandler {
    invoke(difference) {
        if (difference.value === 0)
            return Direction.None;
        return difference.value < 0 ? Direction.South : Direction.North;
    }
}
class GammaDirectionHandler extends DirectionHandler {
    invoke(difference) {
        if (difference.value === 0)
            return Direction.None;
        return difference.value < 0 ? Direction.East : Direction.West;
    }
}
export { AlphaDirectionHandler, BetaDirectionHandler, GammaDirectionHandler };
