import IInputController from "./IInputController";
import IObservable from "../Common/Observer/IObservable";
import type IObserver from "../Common/Observer/IObserver";

export default abstract class ObservableController<T> implements IInputController<T> {
    protected publisher: IObservable<T>

    protected constructor(publisher: IObservable<T>) {
        this.publisher = publisher
    }

    public subscribe(observer: IObserver<T>) {
        this.publisher.subscribe(observer)
    }
    
    public unsubscribe(observer: IObserver<T>) {
        this.publisher.unsubscribe(observer)
    }

    public abstract attach(): void;

    public abstract detach(): void;

    public abstract getValue(): T;
}