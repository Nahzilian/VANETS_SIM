import Tower from "./Tower";

const vehicleDirection = {
    LEFT: -1,
    RIGHT: 1,
    UP: -1,
    DOWN: -1
}


export default class Vehicle extends Tower {
    constructor(type = '', status = '', active = '', radius = 0, name = '', inRange = {}, commonData = {}, speed = 0, direction = '') {
        super(type, status, active, radius, name, inRange, commonData)
        this.speed = speed
        this.direction = direction
        this.unit = "km/h"
        this.move = vehicleDirection[this.direction]
    }

    setSpeed(speed) {
        this.speed = speed
        return this
    }

    setDirection(direction) {
        this.direction = direction
        this.move = vehicleDirection[this.direction]
        return this
    }
}