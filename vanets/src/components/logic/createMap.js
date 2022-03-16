export const getMapSize = () => {
    let screenWidth = window.innerWidth
    let screenHeight = window.innerHeight

    if (screenWidth % 26 !== 0) {
        screenWidth -= (screenWidth % 26)
    }

    if (screenHeight % 26 !== 0) {
        screenHeight -= (screenHeight % 26)
    }

    let mapSize = (Math.round(screenHeight / 26)) * Math.round(screenWidth / 26);

    return mapSize
}

const getBuilding = (buildingRange, startIndex) => {
    let tempSet = new Set()

    for(let y = 0; y < buildingRange; y++) {
        for (let x = 0; x < buildingRange; x++ ) {
            tempSet.add(y + startIndex )
        }
    }

    return tempSet
}


export const generateBuildings = (count, totalSize) => {
    let buildingList = new Set()

    // Fixed size for building
    let buildingRange = 5

    for (let i = 0; i < count; i++) {
        let startingIndex = Math.floor(Math.random() * totalSize)
        let generatedSet = getBuilding(buildingRange, startingIndex)
        console.log(buildingList)
        buildingList = new Set([...buildingList, ...generatedSet])
    }

    return buildingList
}

