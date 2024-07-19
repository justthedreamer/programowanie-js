export default class Predicate {
    invoke(value) {
        return this.handler(value);
    }
}
