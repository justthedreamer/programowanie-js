enum Speed {
    None = 0,
    Slow = 1,
    Medium = 2,
    High = 3,
}

class AxisSpeed {
    public speedX: Speed
    public speedY: Speed

    constructor(speedX: Speed, speedY: Speed) {
        this.speedX = speedX;
        this.speedY = speedY;
    }
}

export {Speed, AxisSpeed}