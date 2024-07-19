import {DeviceOrientation} from "../../../Device/Orientation/DeviceOrientation.js";
import {AxisDirection, Direction} from "../../../MotionModel/Direction.js";
import {AxisSpeed, Speed} from "../../../MotionModel/Speed.js";
import type Ball from "../../../Game/Model/Ball.js";
import Predicate from "../../../Common/Predicates/Predicate.js";
import {RangeInclusivePredicate} from "../../../Common/Predicates/RangeInclusivePredicate.js";
import {AngleType} from "../../../Device/Angle/AngleType.js";
import type {IDeviceMotionHandler} from "./IDeviceMotionHandler.js";
import OrientationDifference, {
    AlphaDirectionHandler,
    BetaDirectionHandler,
    GammaDirectionHandler
} from "./DirectionHandlers.js";
import DirectionHandler from "./DirectionHandler.js";

const speedMap: Map<Predicate<number>, Speed> = new Map<Predicate<number>, Speed>([
    [new RangeInclusivePredicate(0, 3), Speed.None],
    [new RangeInclusivePredicate(3, 10), Speed.Slow],
    [new RangeInclusivePredicate(10, 20), Speed.Medium],
    [new RangeInclusivePredicate(20, 360), Speed.High],
]);

const directionMap: Map<AngleType, DirectionHandler> = new Map<AngleType, DirectionHandler>([
    [AngleType.Alpha, new AlphaDirectionHandler()],
    [AngleType.Beta, new BetaDirectionHandler()],
    [AngleType.Gamma, new GammaDirectionHandler()],
]);

function isOrientationTheSame(val1: DeviceOrientation, val2: DeviceOrientation): boolean {
    return val1.alpha.value === val2.alpha.value && val1.beta.value === val2.beta.value && val1.gamma.value === val2.gamma.value;
}

function getSpeed(startingOrientation: DeviceOrientation, currentOrientation: DeviceOrientation): AxisSpeed {

    const differenceX = Math.abs(OrientationDifference.Calculate(startingOrientation, currentOrientation, AngleType.Gamma).value)

    const differenceY = Math.abs(OrientationDifference.Calculate(startingOrientation, currentOrientation, AngleType.Beta).value)

    let speedX: Speed = undefined
    let speedY: Speed = undefined

    speedMap.forEach((value: number, key: Predicate<number>) => {
        if (key.invoke(differenceX)) {
            speedX = value;
        }
        if (key.invoke(differenceY)) {
            speedY = value;
        }
    })

    if (speedX === undefined) {
        throw Error(`Invalid speedX type "${speedX}"`)
    }

    if (speedY === undefined) {
        throw Error(`Invalid speedY type "${speedY}"`)
    }

    return new AxisSpeed(speedX, speedY);
}

function getDirection(startingOrientation: DeviceOrientation, currentOrientation: DeviceOrientation): AxisDirection {
    if (isOrientationTheSame(startingOrientation, currentOrientation)) {
        return new AxisDirection(Direction.None, Direction.None)
    }

    const directionX = directionMap.get(AngleType.Gamma).invoke(OrientationDifference.Calculate(startingOrientation, currentOrientation, AngleType.Gamma))

    const directionY = directionMap.get(AngleType.Beta).invoke(OrientationDifference.Calculate(startingOrientation, currentOrientation, AngleType.Beta))

    return new AxisDirection(directionX, directionY)
}

export default class BallMotionDeviceHandler implements IDeviceMotionHandler {
    handle(movableElement: Ball, initialOrientation: DeviceOrientation, currentOrientation: DeviceOrientation) {
        const direction = getDirection(initialOrientation, currentOrientation)
        movableElement.updateDirection(direction);
        const speed = getSpeed(initialOrientation, currentOrientation);
        movableElement.updateSpeed(speed);
    }
}