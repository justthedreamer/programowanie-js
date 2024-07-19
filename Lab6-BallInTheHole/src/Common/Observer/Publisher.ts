import type IObserver from "./IObserver.js";
import type IObservable from "./IObservable.js";

export default abstract class Publisher<T> implements IObservable<T> {
    private observers: Array<IObserver<T>>

    protected constructor() {
        this.observers = []
    }

    public subscribe(observer: IObserver<T>) {
        const isExist = this.observers.indexOf(observer) !== -1;
        if (!isExist) {
            this.observers.push(observer);
        }
    }

    public unsubscribe(observer: IObserver<T>) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    public notify(obj: T): void {
        this.observers.forEach((observer: IObserver<T>) => {
            observer.handle(obj)
        })
    }
}