import { MAX_SPPED, MIN_SPEED, MAX_RADIUS } from "./ApplicationSettings.js";

function GetNumberMark(number){
  if(number <= 0){
    return 1;
  }else{
    return -1;
  }

}
function getColor(radius){
  return "#d8dee9"
}

class Ball {
  constructor(radius, speed, powerX, powerY, xPos, yPos, color) {
    this.radius = radius;
    this.speed = speed;
    this.speedX = speed;
    this.speedY = speed;
    this.power = powerX * speed + powerY * radius;
    this.color = getColor(radius);
    this.xPos = xPos;
    this.yPos = yPos;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    
    ctx.fill();
    ctx.closePath();
  }

  updateRadius(radius) {
    if (radius >= MAX_RADIUS) {
      this.radius = MAX_RADIUS;
    } else {
      this.radius = radius;
    }
    this.updateColor();
  }

  updateColor(){
    this.color = getColor(this.radius)
  }

  update(canvas) {
    this.xPos += this.speedX;
    this.yPos += this.speedY;

    if (this.xPos + this.radius >= canvas.width) {
      this.speedX = -Math.abs(this.speedX);
    }

    if (this.xPos - this.radius <= 0) {
      this.speedX = Math.abs(this.speedX);
    }

    if (this.yPos + this.radius >= canvas.height) {
      this.speedY = -Math.abs(this.speedY);
    }

    if (this.yPos - this.radius <= 0) {
      this.speedY = Math.abs(this.speedY);
    }
  }
}

function CalculateSpeed(radius) {
  const k = MIN_SPEED * MAX_RADIUS;
  const speed = Math.round(k / radius);

  if (speed > MAX_SPPED) return MAX_SPPED;

  return speed;
}

export { Ball, CalculateSpeed };
