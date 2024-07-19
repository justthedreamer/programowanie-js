import type Board from "../Model/Board.js";
import type IObserver from "../../Common/Observer/IObserver.js";
import type {WindowSize} from "../../Window/WindowSize.js";

export default class BoardSizeController implements IObserver<WindowSize> {
    private readonly board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    handle(obj: WindowSize): void {
        this.board.setSize(obj.getWidth(), obj.getHeight());
    }
}