var Direction;
(function (Direction) {
    Direction[Direction["None"] = 0] = "None";
    Direction[Direction["South"] = 1] = "South";
    Direction[Direction["North"] = -1] = "North";
    Direction[Direction["East"] = 1] = "East";
    Direction[Direction["West"] = -1] = "West";
})(Direction || (Direction = {}));
class AxisDirection {
    directionX;
    directionY;
    constructor(directionX, directionY) {
        this.directionX = directionX;
        this.directionY = directionY;
    }
}
export { Direction, AxisDirection };
