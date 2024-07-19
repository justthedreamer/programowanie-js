import type BallMotionController from "./Controller/BallMotionController.js";
import WindowResizeController from "../Window/WindowResizeController.js";
import Board from "./Model/Board.js";
import Ball from "./Model/Ball.js";
import BoardSizeController from "./Controller/BoardController.js";
import DeviceOrientationPublisher from "../Device/Orientation/DeviceOrientationPublisher.js";
import BallMotionDeviceHandler from "../Handlers/BallMotion/Device/BallMotionDeviceHandler.js";
import {BallMotionDeviceController} from "./Controller/BallMotionDeviceController.js";
import WindowResizePublisher from "../Window/WindowResizePublisher.js";
import {DeviceOrientationController} from "../Device/Orientation/DeviceOrientationController.js";


export class GameController {
    private ballMotionController: BallMotionController;
    private windowResizeController: WindowResizeController;

    constructor(ballMotionController: BallMotionController, windowResizeController: WindowResizeController) {
        this.ballMotionController = ballMotionController;
        this.windowResizeController = windowResizeController;
    }

    changeMotionController(motionController: BallMotionController) {
        this.ballMotionController = motionController;
    }

    async restartMotionControllerAsync(): Promise<void> {
        await this.ballMotionController.restartAsync()
    }

    attachWindowResizeController() {
        this.windowResizeController.attach()
    }

    async attachMotionControllerAsync() {
        await this.ballMotionController.attachAsync()
    }

    detachMotionController() {
        this.ballMotionController.detach()
    }

    async onGameRunAsync() {
        await this.ballMotionController.attachAsync()
    }

    onGamePause() {
        this.ballMotionController.detach();
    }
}

export function createGameController(board: Board, ball: Ball): GameController {
    const windowResizeController = createWindowResizeController()
    const boardSizeController: BoardSizeController = new BoardSizeController(board);
    windowResizeController.subscribe(boardSizeController)

    const deviceOrientationPublisher = new DeviceOrientationPublisher()
    const deviceMotionController = new DeviceOrientationController(deviceOrientationPublisher)
    deviceMotionController.attach()

    const deviceMotionHandler = new BallMotionDeviceHandler()
    const ballMotionController = new BallMotionDeviceController(ball, deviceMotionHandler)
    deviceMotionController.subscribe(ballMotionController);

    return new GameController(ballMotionController, windowResizeController)
}

function createWindowResizeController(): WindowResizeController {
    const windowResizePublisher = new WindowResizePublisher()
    return new WindowResizeController(windowResizePublisher);
}

