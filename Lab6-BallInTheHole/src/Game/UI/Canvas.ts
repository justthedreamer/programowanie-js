import Board from "../Model/Board.js";
import type Ball from "../Model/Ball.js";

export default class Canvas {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        if (!canvas) {
            throw new Error("Canvas not found.");
        }
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    clearRect() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}

export function createCanvas(nodeId: string, width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.id = nodeId;
    canvas.width = width;
    canvas.height = height;
    return canvas;
}