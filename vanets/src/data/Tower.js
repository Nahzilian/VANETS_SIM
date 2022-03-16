class Tower {
    /*
    Tower class:
    This is the main node for P2P network simulation
    */
    constructor(type = '', status = '', active = '', radius = 0, name = '', inRange = {}, commonData = {}) {
        this.type = type
        this.status = status
        this.active = active
        this.radius = radius
        this.name = name
        this.inRange = inRange
        this.commonData = commonData
        this.peerData = {}
    }

    setType(type) {
        this.type = type
        return this
    }

    setRange(range) {
        this.range = range
        return this
    }

    setRadius(radius) {
        this.radius = radius
        return this
    }

    setName(name) {
        this.name = name
        return this
    }

    setStatus(status) {
        this.status = status
        return this
    }

    setAction(action) {
        this.action = action
        return this
    }

    setCommonData (data) {
        this.commonData = data
        return this
    }

    setPeerData (data) {
        this.peerData = data
        return this
    }

    addPeerData(key, value) {
        this.peerData[key] = value
        return this.peerData
    }
    
}


export default Tower