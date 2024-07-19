export default interface IObserver<T> {
    handle(obj: T): void
}

