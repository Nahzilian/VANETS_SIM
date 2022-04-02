class Path {
    constructor(path = [], steps) {
        this.path = path
        this.counter = 0
        this.stepCounter = 0
        this.initVal = path[this.counter].start
        this.currentPath = this.initVal
        this.nextPath = path[this.counter].end
        this.currentLatSpeed = path[this.counter].latSpeed
        this.currentLngSpeed = path[this.counter].lngSpeed
        this.steps = steps
    }

    updateInitLatLng() {
        // UPdate base on counter
        // When still in process of 2 nodes
        if (this.counter < this.path.length) {
            if (this.stepCounter < this.steps) {
                this.initVal = {
                    lat: this.initVal.lat + this.currentLatSpeed,
                    lng: this.initVal.lng + this.currentLngSpeed
                }
                // console.log("Counter:", this.stepCounter)
                this.stepCounter += 1
            } else {
                this.initVal = this.nextPath
                this.counter += 1
                let nextPathRef = this.path[this.counter]
                if (nextPathRef) {
                    this.currentPath = nextPathRef.start
                    this.nextPath = nextPathRef.end
                    this.currentLatSpeed = nextPathRef.latSpeed
                    this.currentLngSpeed = nextPathRef.lngSpeed
                    this.stepCounter = 0
                }
            }
        }


        return this.initVal
    }
}

export default class Direction {
    constructor({ initLat, initLng, path = [], steps }) {
        this.currentLat = initLat;
        this.currentLng = initLng;
        this.steps = steps
        this.path = new Path(path, this.steps)
    }

    updatePath() {
        let { lat, lng } = this.path.updateInitLatLng()
        this.currentLat = lat
        this.currentLng = lng
        return this
    }
}