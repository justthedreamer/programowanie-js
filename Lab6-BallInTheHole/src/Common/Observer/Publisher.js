export default class Publisher {
    observers;
    constructor() {
        this.observers = [];
    }
    subscribe(observer) {
        const isExist = this.observers.indexOf(observer) !== -1;
        if (!isExist) {
            this.observers.push(observer);
        }
    }
    unsubscribe(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }
    notify(obj) {
        this.observers.forEach((observer) => {
            observer.handle(obj);
        });
    }
}
