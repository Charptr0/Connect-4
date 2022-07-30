import { Cell } from "./cell";

/**
 * Enum representation of the different directions
 */
enum Direction {
    NONE, TOP, BOTTOM, LEFT, RIGHT, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT
}

/**
 * Check the connect 4 board for a winner using depth first search
 * 
 * @param board - The connect 4 board
 * @param row - The current row
 * @param col - The current column
 * @param player - The player at that cell
 * @param direction - The direction when performing dfs
 * @param count - The counter to keep track the total number of cells representing the player, a count of four represents a winner
 * @returns true if a winner is found, false otherwise
 */
function dfs(board : number[][], row : number, col : number, player : number, direction : Direction, count : number) : boolean
{
    // row and col is out of bound
    if(row < 0 || col < 0 || row >= board.length || col >= board[0].length) return false;
    
    // the cell does not contain the correct player
    if(board[row][col] !== player) return false;

    // 
    if(count === 4) return true;

    // check the top, bottom, left, right, top-left, top-right, bottom-left, and bottom-right for a winner
    if(direction === Direction.NONE) {
        return (
            dfs(board, row - 1, col, player, Direction.TOP, count + 1) ||
            dfs(board, row + 1, col, player, Direction.BOTTOM, count + 1) ||
            dfs(board, row, col - 1, player, Direction.LEFT, count + 1) || 
            dfs(board, row, col + 1, player, Direction.RIGHT, count + 1) ||
            dfs(board, row - 1, col - 1, player, Direction.TOP_LEFT, count + 1) ||
            dfs(board, row - 1, col + 1, player, Direction.TOP_RIGHT, count + 1) ||
            dfs(board, row + 1, col - 1, player, Direction.BOTTOM_LEFT, count + 1) ||
            dfs(board, row + 1, col + 1, player, Direction.BOTTOM_RIGHT, count + 1)
        )
    }

    // deep in dfs, follow the corresponding direction to check for a winner
    else {
        switch(direction)
        {
            case Direction.TOP: return dfs(board, row - 1, col, player, direction, count + 1);
            case Direction.BOTTOM: return dfs(board, row + 1, col, player, direction, count + 1);
            case Direction.LEFT: return dfs(board, row, col - 1, player, direction, count + 1);
            case Direction.RIGHT: return dfs(board, row, col + 1, player, direction, count + 1);
            case Direction.TOP_LEFT: return dfs(board, row - 1, col - 1, player, direction, count + 1);
            case Direction.TOP_RIGHT: return dfs(board, row - 1, col + 1, player, direction, count + 1);
            case Direction.BOTTOM_LEFT: return dfs(board, row + 1, col - 1, player, direction, count + 1);
            case Direction.BOTTOM_RIGHT: return dfs(board, row + 1, col + 1, player, direction, count + 1);
            default: return false;
        }
    }
}

/**
 * Check for a winner
 * 
 * @param board - The current connect 4 board
 * @returns player 1 or 2 if either of them wins, empty cell otherwise
 */
export function checkWinner(board : number[][]) : Cell
{
    // start to search from bottom to top
    for(let i = board.length - 1; i >= 0; i--) 
    {
        // left to right
        for(let j = 0; j < board[i].length; j++) 
        {
            // get player occupied at that space
            const cell = board[i][j];

            if(cell !== Cell.EMPTY) {
                // return winner
                if(dfs(board, i, j, cell, Direction.NONE, 1)) return cell
            }
        }
    }

    // no winner found
    return Cell.EMPTY;
}