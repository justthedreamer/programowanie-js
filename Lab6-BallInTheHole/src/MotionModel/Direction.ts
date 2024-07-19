enum Direction {
    None = 0,
    South = 1,
    North = -1,
    East = 1,
    West = -1
}

class AxisDirection {
    public directionX: Direction;
    public directionY: Direction;

    constructor(directionX: Direction, directionY: Direction) {
        this.directionX = directionX;
        this.directionY = directionY;
    }
}

export {Direction, AxisDirection}