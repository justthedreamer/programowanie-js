import Predicate from "./Predicate.js";

export abstract class RangePredicate extends Predicate<number> {
    protected readonly bottom: number
    protected readonly top: number

    protected constructor(bottom: number, top: number) {
        super();
        this.bottom = bottom;
        this.top = top;
    }
}