export default class Board {
    width;
    height;
    margin;
    color;
    constructor(width, height, margin = 10, color = "#ECF87F") {
        this.width = width;
        this.height = height;
        this.color = color;
        this.margin = margin;
    }
    getMaxWidth() {
        return this.width - this.margin;
    }
    getMinWidth() {
        return this.margin;
    }
    getMaxHeight() {
        return this.height - this.margin;
    }
    getMinHeight() {
        return this.margin;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getMargin() {
        return this.margin;
    }
    getColor() {
        return this.color;
    }
    setSize(width, height) {
        this.width = width;
        this.height = height;
    }
    setColor(color) {
        this.color = color;
    }
}
