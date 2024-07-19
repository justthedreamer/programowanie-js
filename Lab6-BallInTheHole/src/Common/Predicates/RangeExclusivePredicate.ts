import {RangePredicate} from "./RangePredicate.js";

class RangeExclusivePredicate extends RangePredicate {
    constructor(bottom: number, top: number) {
        super(bottom, top);
    }

    protected handler(value: number): boolean {
        return (value > this.bottom && value < this.top);
    }
}

export {RangeExclusivePredicate};