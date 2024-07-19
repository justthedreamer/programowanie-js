import {WindowSize} from "./WindowSize.js";
import Publisher from "../Common/Observer/Publisher.js";

export default class WindowResizePublisher extends Publisher<WindowSize> {
    constructor() {
        super();
    }
}
