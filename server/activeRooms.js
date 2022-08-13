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

module.exports = {
    addPlayerToRoom,
    removePlayerFromRoom,
    getUserFromRoom,
}