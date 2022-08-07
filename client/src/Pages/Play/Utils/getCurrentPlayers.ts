import axios from "axios";
import { getRoomId } from "./getRoomId";

export async function getCurrentPlayers() : Promise<number> {
    try {
        const response = await axios.get(`http://localhost:4000/get-room-size/${getRoomId()}`)   
        return response.data.size;
    } catch (err) {
        console.log(err);
        return 0;
    }
}