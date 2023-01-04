import axios from "axios";
import { getRoomId } from "../../../Utils/getRoomId";

/**
 * Get the total number of players in the room that is stored in session storage
 * @returns The total number of players in a room
 */
export async function getCurrentPlayers(): Promise<number> {
    try {
        const response = await axios.get(`https://connect4-backend.charptrzero.net/get-room-size/${getRoomId()}`)
        return response.data.size;
    } catch (err) {
        console.log(err);
        return 0;
    }
}