import { RangePredicate } from "./RangePredicate.js";
class RangeInclusivePredicate extends RangePredicate {
    constructor(bottom, top) {
        super(bottom, top);
    }
    handler(value) {
        return (value >= this.bottom && value <= this.top);
    }
}
export { RangeInclusivePredicate };
