import { CalculateSpeed } from "./Ball.js";

class BallsPipeline {
  constructor(ball1, ball2, appSettings) {
    this.ball1 = ball1;
    this.ball2 = ball2;
    this.appSettings = appSettings;
  }

  #getDistance() {
    const absX = Math.abs(this.ball1.xPos - this.ball2.xPos);
    const absY = Math.abs(this.ball1.yPos - this.ball2.yPos);
    const distanceX = Math.round(absX);
    const distanceY = Math.round(absY);
    const distace = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    return Math.round(distace);
  }

  #isNearby(availableDistance) {
    var distance = this.#getDistance();
    return distance <= availableDistance;
  }

  #getColor(availableDistance) {
    const distance = this.#getDistance();
    const color1 = "#5e81ac";
    const color2 = "#88c0d0"; 
    const color3 = "#81a1c1";
    const color4 = "#8fbcbb";

    const breakpoint1 = distance >= availableDistance * 0.7;
    const breakpoint2 = distance >= availableDistance * 0.5;
    const breakpoint3 = distance >= availableDistance * 0.3;
    const breakpoint4 = distance >= availableDistance;

    if (breakpoint1) return color1;
    if (breakpoint2) return color2;
    if (breakpoint3) return color3;
    if (breakpoint4) return color4;
  }

  #corruption(){
    if(this.appSettings.corruptionState){
      const corruptionPower = this.appSettings.enegryStealingPower;
      const stealingValue = corruptionPower * 0.025;
      
      if(this.ball1.power == this.ball2.power){
        return;
      }

      if(this.ball1.power > this.ball2.power){
        this.ball1.updateRadius(this.ball1.radius += stealingValue)
        this.ball2.updateRadius(this.ball2.radius -= stealingValue)
      }else{
        this.ball1.updateRadius(this.ball1.radius -= stealingValue)
        this.ball2.updateRadius(this.ball2.radius += stealingValue)
      }
      
    }
  }

  drawPipeline(ctx, availableDistance) {
    if (this.#isNearby(availableDistance)) {
      const x1 = this.ball1.xPos;
      const y1 = this.ball1.yPos;
      const x2 = this.ball2.xPos;
      const y2 = this.ball2.yPos;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineWidth = 5;
      ctx.strokeStyle = this.#getColor(availableDistance);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      this.#corruption();
    }
  }
}

export { BallsPipeline };
