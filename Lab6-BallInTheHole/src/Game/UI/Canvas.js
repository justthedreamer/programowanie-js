export default class Canvas {
    canvas;
    ctx;
    constructor(canvas) {
        if (!canvas) {
            throw new Error("Canvas not found.");
        }
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }
    clearRect() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
export function createCanvas(nodeId, width, height) {
    const canvas = document.createElement("canvas");
    canvas.id = nodeId;
    canvas.width = width;
    canvas.height = height;
    return canvas;
}
