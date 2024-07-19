export default class Board {
    private width: number;
    private height: number;
    private readonly margin: number
    private color: string

    constructor(width: number, height: number, margin: number = 10, color: string = "#ECF87F") {
        this.width = width;
        this.height = height;
        this.color = color;
        this.margin = margin;
    }

    getMaxWidth(): number {
        return this.width - this.margin;
    }

    getMinWidth(): number {
        return this.margin;
    }

    getMaxHeight(): number {
        return this.height - this.margin;
    }

    getMinHeight(): number {
        return this.margin;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    getMargin(): number {
        return this.margin;
    }

    getColor(): string {
        return this.color;
    }

    setSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    setColor(color: string) {
        this.color = color;
    }
}