export default class BallInHoleUIController {
    static updateScore(value) {
        const node = document.querySelector("#score");
        node.textContent = `${value}`;
    }
}
