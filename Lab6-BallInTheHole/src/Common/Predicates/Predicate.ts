export default abstract class Predicate<T> {
    protected abstract handler(value: T): boolean

    invoke(value: T): boolean {
        return this.handler(value);
    }
}