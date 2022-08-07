export function getRoomId() : string {
    const roomId = sessionStorage.getItem("roomId");
    return roomId ? roomId : '';
}

