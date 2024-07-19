export default class BallInHoleUIController {
    static updateScore(value: number) {
        const node = document.querySelector("#score")
        node.textContent = `${value}`
    }
}