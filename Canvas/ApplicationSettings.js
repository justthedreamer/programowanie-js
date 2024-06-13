const MIN_RADIUS = 5;
const MAX_RADIUS = 25;
const MIN_SPEED = 2;
const MAX_SPPED = 15;

const MOUSE_MODE_PUSH = "PUSH";
const MOUSE_MODE_BACK = "BACK";


class ApplicationSettings {
  constructor(
    ballsCount,
    ballsPipelineDistance,
    ballPowerX,
    ballPowerY,
    ballsColor,
    mousePower,
    mouseTriggerDistance,
    mouseMode,
    enegryStealingPower,
    corruptionState,
  ) {
    this.ballsCount = ballsCount;
    this.ballsPipelineDistance = ballsPipelineDistance;
    this.ballPowerX = ballPowerX;
    this.ballPowerY = ballPowerY;
    this.ballsColor = ballsColor;
    this.mousePower = mousePower;
    this.mouseTriggerDistance = mouseTriggerDistance;
    this.mouseMode = mouseMode;
    this.enegryStealingPower = enegryStealingPower;
    this.corruptionState = corruptionState;
  }
}

export {ApplicationSettings,MOUSE_MODE_PUSH,MOUSE_MODE_BACK,MIN_RADIUS,MAX_RADIUS,MIN_SPEED,MAX_SPPED}