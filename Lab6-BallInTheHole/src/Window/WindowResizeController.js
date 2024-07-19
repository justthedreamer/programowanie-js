import ObservableController from "../InputControllers/ObservableController.js";
import { WindowSize } from "./WindowSize.js";
export default class WindowResizeController extends ObservableController {
    handler;
    currentWindowSize;
    constructor(publisher) {
        super(publisher);
        this.handler = this.createWindowResizeHandler();
    }
    attach() {
        window.addEventListener('resize', this.handler);
    }
    detach() {
        window.removeEventListener('resize', this.handler);
    }
    getValue() {
        return this.currentWindowSize;
    }
    createWindowResizeHandler() {
        return (e) => {
            this.currentWindowSize = new WindowSize(window.innerWidth, window.innerHeight);
            this.publisher.notify(this.currentWindowSize);
        };
    }
    handlePublisherUpdate(newSize) {
        this.currentWindowSize = newSize;
    }
}
