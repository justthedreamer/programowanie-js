export default interface IInputController<T> {
    attach() : void
    detach(): void
    getValue() : T
}