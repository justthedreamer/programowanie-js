import {RangePredicate} from "./RangePredicate.js";

class RangeInclusivePredicate extends RangePredicate {
    constructor(bottom: number, top: number) {
        super(bottom, top);
    }

    protected handler(value: number): boolean {
        return (value >= this.bottom && value <= this.top);
    }
}

export {RangeInclusivePredicate};