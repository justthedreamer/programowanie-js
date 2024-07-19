import Ball from "./Model/Ball.js";
import Hole from "./Model/Hole.js";
import Board from "./Model/Board.js";
import Canvas from "./UI/Canvas.js";
import { getRandomPosition, isBallInTheHole } from "./BallInTheHole.js";
export class GameComponents {
    ball;
    hole;
    board;
    canvas;
    constructor(ball, hole, board, canvas) {
        this.ball = ball;
        this.hole = hole;
        this.board = board;
        this.canvas = canvas;
    }
}
export function createGameComponents() {
    const boardNode = getBoardNode();
    const canvasNode = getCanvasNode();
    setCanvasSize(canvasNode, boardNode.clientWidth, boardNode.clientHeight);
    const canvas = new Canvas(canvasNode);
    const board = new Board(boardNode.clientWidth, boardNode.clientHeight);
    const ball = createBall(15, board);
    const hole = createHole(25, board);
    while (isBallInTheHole(ball, hole)) {
        ball.updatePosition(getRandomPosition(ball.getRadius(), board.getWidth(), board.getHeight(), board.getMargin()));
        hole.updatePosition(getRandomPosition(hole.getRadius(), board.getWidth(), board.getHeight(), board.getMargin()));
    }
    return new GameComponents(ball, hole, board, canvas);
}
function createHole(radius, board) {
    return new Hole(radius, getRandomPosition(radius, board.getWidth(), board.getHeight(), board.getMargin()));
}
function createBall(radius, board) {
    return new Ball(radius, getRandomPosition(radius, board.getWidth(), board.getHeight(), board.getMargin()));
}
function setCanvasSize(canvasNode, width, height) {
    canvasNode.width = width;
    canvasNode.height = height;
}
function getBoardNode() {
    const node = document.querySelector("#board");
    if (!node) {
        throw new Error("Cannot find board element.");
    }
    return node;
}
function getCanvasNode() {
    const node = document.querySelector("#canvas");
    if (!node) {
        throw new Error("Cannot find canvas element");
    }
    return node;
}
