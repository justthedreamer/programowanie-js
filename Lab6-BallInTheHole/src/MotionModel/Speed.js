var Speed;
(function (Speed) {
    Speed[Speed["None"] = 0] = "None";
    Speed[Speed["Slow"] = 1] = "Slow";
    Speed[Speed["Medium"] = 2] = "Medium";
    Speed[Speed["High"] = 3] = "High";
})(Speed || (Speed = {}));
class AxisSpeed {
    speedX;
    speedY;
    constructor(speedX, speedY) {
        this.speedX = speedX;
        this.speedY = speedY;
    }
}
export { Speed, AxisSpeed };
