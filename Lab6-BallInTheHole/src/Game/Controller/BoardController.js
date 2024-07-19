export default class BoardSizeController {
    board;
    constructor(board) {
        this.board = board;
    }
    handle(obj) {
        this.board.setSize(obj.getWidth(), obj.getHeight());
    }
}
