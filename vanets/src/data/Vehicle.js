import Tower from "./Tower";


export default class Vehicle extends Tower {
    constructor(name = '', inRange = {}, commonData = {}) {
        super("Car", "DRIVING", '' , 60, name, inRange, commonData)
    }

    setSpeed(speed) {
        this.speed = speed
        return this
    }

    setDirection(direction) {
        this.direction = direction
        return this
    }
}