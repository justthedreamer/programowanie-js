import type IObserver from "./IObserver.js";

export default interface IObservable<T> {
    subscribe(observer: IObserver<T>): void

    unsubscribe(observer: IObserver<T>): void

    notify(obj: T): void
}

