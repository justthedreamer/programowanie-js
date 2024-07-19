import ObservableController from "../InputControllers/ObservableController.js";
import type IObservable from "../Common/Observer/IObservable.js";
import {WindowSize} from "./WindowSize.js";


export default class WindowResizeController extends ObservableController<WindowSize> {
    private readonly handler: (e: Event) => void;
    private currentWindowSize: WindowSize;

    constructor(publisher: IObservable<WindowSize>) {
        super(publisher);
        this.handler = this.createWindowResizeHandler();
    }

    public attach(): void {
        window.addEventListener('resize', this.handler);
    }

    public detach(): void {
        window.removeEventListener('resize', this.handler);
    }

    public getValue(): WindowSize {
        return this.currentWindowSize;
    }

    private createWindowResizeHandler() {
        return (e: Event): void => {
            this.currentWindowSize = new WindowSize(window.innerWidth, window.innerHeight);
            this.publisher.notify(this.currentWindowSize);
        };
    }

    private handlePublisherUpdate(newSize: WindowSize): void {
        this.currentWindowSize = newSize;
    }
}