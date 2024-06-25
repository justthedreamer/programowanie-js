import {
  MIN_RADIUS,
  MAX_RADIUS,
} from "./ApplicationSettings.js";

import { Ball, CalculateSpeed } from "./Ball.js";

class BallFactory {
  static CreateBalls(applicationSettings, canvas, count = null) {
    let balls = [];

    const ballsCount = count == null ? applicationSettings.ballsCount : count;

    const powerX = applicationSettings.ballPowerX;
    const powerY = applicationSettings.ballPowerY;

    for (let i = 1; i <= ballsCount; i++) {
      const radiusValue =
        Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
      const radius = Math.round(radiusValue);
      const speed = CalculateSpeed(radius);
      const xPos = Math.random() * canvas.width;
      const yPos = Math.random() * canvas.height;
      var color = applicationSettings.ballsColor;
      balls.push(new Ball(radius, speed, powerX, powerY, xPos, yPos, color));
    }
    return balls;
  }
}

export { BallFactory };
