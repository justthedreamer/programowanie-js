import Predicate from "./Predicate.js";
export class RangePredicate extends Predicate {
    bottom;
    top;
    constructor(bottom, top) {
        super();
        this.bottom = bottom;
        this.top = top;
    }
}
