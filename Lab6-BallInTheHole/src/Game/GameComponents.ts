import Ball from "./Model/Ball.js";
import Hole from "./Model/Hole.js";
import Board from "./Model/Board.js";
import Canvas from "./UI/Canvas.js";
import {getRandomPosition, isBallInTheHole} from "./BallInTheHole.js";

export class GameComponents {
    public ball: Ball
    public hole: Hole
    public board: Board
    public canvas: Canvas

    constructor(ball: Ball, hole: Hole, board: Board, canvas: Canvas) {
        this.ball = ball;
        this.hole = hole;
        this.board = board;
        this.canvas = canvas;
    }

}

export function createGameComponents(): GameComponents {
    const boardNode = getBoardNode();
    const canvasNode = getCanvasNode()

    setCanvasSize(canvasNode, boardNode.clientWidth, boardNode.clientHeight)

    const canvas = new Canvas(canvasNode)
    const board = new Board(boardNode.clientWidth, boardNode.clientHeight);
    const ball: Ball = createBall(15, board)
    const hole: Hole = createHole(25, board)

    while (isBallInTheHole(ball, hole)) {
        ball.updatePosition(getRandomPosition(ball.getRadius(), board.getWidth(), board.getHeight(), board.getMargin()))
        hole.updatePosition(getRandomPosition(hole.getRadius(), board.getWidth(), board.getHeight(), board.getMargin()))
    }

    return new GameComponents(ball, hole, board, canvas)
}

function createHole(radius: number, board: Board) {
    return new Hole(radius, getRandomPosition(radius, board.getWidth(), board.getHeight(), board.getMargin()))
}

function createBall(radius: number, board: Board) {
    return new Ball(radius, getRandomPosition(radius, board.getWidth(), board.getHeight(), board.getMargin()))
}

function setCanvasSize(canvasNode: HTMLCanvasElement, width: number, height: number) {
    canvasNode.width = width;
    canvasNode.height = height;
}

function getBoardNode(): HTMLElement {
    const node = document.querySelector("#board");
    if (!node) {
        throw new Error("Cannot find board element.")
    }
    return node as HTMLElement;
}

function getCanvasNode(): HTMLCanvasElement {
    const node = document.querySelector("#canvas") as HTMLCanvasElement;
    if (!node) {
        throw new Error("Cannot find canvas element");
    }
    return node;
}
