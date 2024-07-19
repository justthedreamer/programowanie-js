import {AxisDirection, Direction} from "../MotionModel/Direction";
import IObservable from "../Common/Observer/IObservable";
import ObservableController from "../InputControllers/ObservableController";

export class KeyboardDirectionController extends ObservableController<AxisDirection> {
    private readonly directions: AxisDirection;

    private readonly keyDownHandler: (e: KeyboardEvent) => void;
    private readonly keyUpHandler: (e: KeyboardEvent) => void;

    constructor(publisher: IObservable<AxisDirection>) {
        super(publisher);
        this.directions = new AxisDirection(Direction.None, Direction.None);
        this.keyDownHandler = this.createKeyDownHandler()
        this.keyUpHandler = this.createKeyUpHandler();
    }

    public attach(): void {
        document.addEventListener("keydown", this.keyDownHandler);
        document.addEventListener("keyup", this.keyUpHandler);
    }

    public detach(): void {
        document.removeEventListener("keydown", this.keyDownHandler);
        document.removeEventListener("keyup", this.keyUpHandler);
    }

    public getValue(): AxisDirection {
        return this.directions;
    }

    private createKeyDownHandler() {
        return (e: KeyboardEvent): void => {
            const key = e.key
            switch (key) {
                case 'w': {
                    this.directions.directionX = Direction.North;
                    break;
                }
                case 'a': {
                    this.directions.directionY = Direction.East;
                    break;
                }
                case 's' : {
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
        }
    }
    private createKeyUpHandler() {
        return (e: KeyboardEvent): void => {
            const key = e.key
            switch (key) {
                case 'w': {
                    this.directions.directionX = Direction.None;
                    break;
                }
                case 'a': {
                    this.directions.directionY = Direction.None;
                    break;
                }
                case 's' : {
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
        }
    }
}

