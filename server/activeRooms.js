/**
 * Store the active rooms as keys and an array of object with playersId and username
 * Example:
 * {
 *  "roomId" : [
 *      {"playerId": "1234", "username": "username"}, 
 *      {"playerId": "5678", "username": "username"}
 *  ]
 * }
 */
const activeRooms = {};

/**
 * Add a player to a room
 * @param {*} playerId - The socket.id of the player
 * @param {*} username - The username of the player created on the frontend
 * @param {*} roomId  - The ID of the room
 */
function addPlayerToRoom(playerId, username, roomId) {
    // create a new entry if the room does not exist
    if(!activeRooms[roomId]) {
        activeRooms[roomId] = [{
            "playerId": playerId,
            "username": username
        }]
    }

    // append the player
    else {
        activeRooms[roomId].push({
            "playerId": playerId,
            "username": username
        });
    }
}

/**
 * Remove the player from a given room
 * @param {*} roomId - The room ID
 * @param {*} userId - The socket.io Id of the user
 */
function removePlayerFromRoom(roomId, userId) {
    if(!activeRooms[roomId]) {
        return;
    }

    // remove the entry from memory
    activeRooms[roomId] = activeRooms[roomId].filter(obj => obj.playerId !== userId);

    // if all users have left, delete the entry from memory
    if(activeRooms[roomId].length === 0) {
        delete activeRooms[roomId]
    }
}

/**
 * Get all users in a room
 * @param {*} roomId - The room ID
 * @returns all the user's information, null otherwise
 */
function getAllUsersFromRoom(roomId) {
    if (!activeRooms[roomId]) {
        return null;
    }

    return activeRooms[roomId];
}

/**
 * Check to make the entered room ID is valid
 * @param {*} roomId - The room ID
 * @returns true if the room exist, false otherwise
 */
function roomExists(roomId) {
    for(const room of Object.keys(activeRooms)) {
        if(room === roomId) {
            return true;
        }
    }

    return false;
}

module.exports = {
    addPlayerToRoom,
    removePlayerFromRoom,
    getAllUsersFromRoom,
    roomExists,
    activeRooms
}