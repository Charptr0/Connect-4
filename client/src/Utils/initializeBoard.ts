/**
 * Generate a new empty connect 4 board
 * 
 * 0 - Empty space
 * 
 * 1 - Player 1
 * 
 * 2 - Player 2
 * 
 * @returns A brand new connect 4 board
 */
export function initializeBoard() : number[][] {
    return [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]]
}