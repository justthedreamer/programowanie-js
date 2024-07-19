export default class ObservableController {
    publisher;
    constructor(publisher) {
        this.publisher = publisher;
    }
    subscribe(observer) {
        this.publisher.subscribe(observer);
    }
    unsubscribe(observer) {
        this.publisher.unsubscribe(observer);
    }
}
