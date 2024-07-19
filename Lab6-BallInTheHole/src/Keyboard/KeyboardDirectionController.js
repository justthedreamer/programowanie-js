import { AxisDirection, Direction } from "../MotionModel/Direction";
import ObservableController from "../InputControllers/ObservableController";
export class KeyboardDirectionController extends ObservableController {
    directions;
    keyDownHandler;
    keyUpHandler;
    constructor(publisher) {
        super(publisher);
        this.directions = new AxisDirection(Direction.None, Direction.None);
        this.keyDownHandler = this.createKeyDownHandler();
        this.keyUpHandler = this.createKeyUpHandler();
    }
    attach() {
        document.addEventListener("keydown", this.keyDownHandler);
        document.addEventListener("keyup", this.keyUpHandler);
    }
    detach() {
        document.removeEventListener("keydown", this.keyDownHandler);
        document.removeEventListener("keyup", this.keyUpHandler);
    }
    getValue() {
        return this.directions;
    }
    createKeyDownHandler() {
        return (e) => {
            const key = e.key;
            switch (key) {
                case 'w': {
                    this.directions.directionX = Direction.North;
                    break;
                }
                case 'a': {
                    this.directions.directionY = Direction.East;
                    break;
                }
                case 's': {
                    this.directions.directionX = Direction.South;
                    break;
                }
                case 'd': {
                    this.directions.directionX = Direction.West;
                    break;
                }
                default:
                    break;
            }
        };
    }
    createKeyUpHandler() {
        return (e) => {
            const key = e.key;
            switch (key) {
                case 'w': {
                    this.directions.directionX = Direction.None;
                    break;
                }
                case 'a': {
                    this.directions.directionY = Direction.None;
                    break;
                }
                case 's': {
                    this.directions.directionX = Direction.None;
                    break;
                }
                case 'd': {
                    this.directions.directionX = Direction.None;
                    break;
                }
                default:
                    break;
            }
        };
    }
}
