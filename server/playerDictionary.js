/**
 * Store the playerId correspond to a given room
 */
const roomDictionary = {};

function addPlayerToDictionary(playerId, roomId) {
    roomDictionary[playerId] = roomId;
}

function removePlayerFromDictionary(playerId) {
    if(!roomDictionary[playerId]) return;

    delete roomDictionary[playerId];
}

function getRoomFromDictionary(playerId) {
    if(!roomDictionary[playerId]) return null;
    
    return roomDictionary[playerId];
}

module.exports = {
    addPlayerToDictionary,
    removePlayerFromDictionary,
    getRoomFromDictionary
}