import IObservable from "../Common/Observer/IObservable.js";
import {AxisDirection} from "../MotionModel/Direction.js";
import IObserver from "../Common/Observer/IObserver.js";

class KeyboardDirectionPublisher implements IObservable<AxisDirection> {
    private observers: Array<IObserver<AxisDirection>>

    constructor() {
        this.observers = []
    }

    subscribe(observer: IObserver<AxisDirection>): void {
        const isExist = this.observers.indexOf(observer) !== -1;
        if (!isExist) {
            this.observers.push(observer);
        }
    }

    unsubscribe(observer: IObserver<AxisDirection>): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    notify(obj: AxisDirection): void {
        this.observers.forEach((observer: IObserver<AxisDirection>) => {
            observer.handle(obj)
        })
    }
}