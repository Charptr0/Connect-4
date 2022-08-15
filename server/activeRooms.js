const activeRooms = {};

function addPlayerToRoom(playerId, roomId) {
    activeRooms[playerId] = roomId;
}

function removePlayerFromRoom(playerId) {
    delete activeRooms[playerId];
}

function getUserFromRoom(playerId) {
    if (!activeRooms[playerId]) {
        return null;
    }

    return activeRooms[playerId];
}

function roomExists(roomId) {
    for(const room of Object.keys(activeRooms)) {
        if(activeRooms[room] === roomId) {
            return true;
        }
    }

    return false;
}

module.exports = {
    addPlayerToRoom,
    removePlayerFromRoom,
    getUserFromRoom,
    roomExists
}