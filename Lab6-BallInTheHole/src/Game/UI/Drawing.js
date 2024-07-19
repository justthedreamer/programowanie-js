export function drawBoard(canvas, board) {
    canvas.ctx.fillStyle = board.getColor();
    canvas.ctx.fillRect(0, 0, board.getWidth(), board.getHeight());
}
export function drawBall(canvas, ball) {
    const position = ball.getPosition();
    const x = position.positionX;
    const y = position.positionY;
    canvas.ctx.beginPath();
    canvas.ctx.arc(x, y, ball.getRadius(), 0, Math.PI * 2);
    canvas.ctx.fillStyle = ball.getColor();
    canvas.ctx.fill();
    canvas.ctx.closePath();
}
export function drawHole(canvas, hole) {
    const position = hole.getPosition();
    const x = position.positionX;
    const y = position.positionY;
    canvas.ctx.beginPath();
    canvas.ctx.arc(x, y, hole.getRadius(), 0, Math.PI * 2);
    canvas.ctx.fillStyle = hole.getColor();
    canvas.ctx.fill();
    canvas.ctx.closePath();
}
