import React from "react";
import { Cell } from "./cell";

/**
 * Find the next open available cell on the board
 * @param board - The current connect 4 board
 * @param boardRef - The reference to each cell that is on the board
 * @param currentCol - The current column
 * @returns the div reference to the next open cell, or null if none is found
 */
export function findOpenCell(
    board : number[][], 
    boardRef : React.MutableRefObject<any>[][], 
    currentCol : number) : HTMLDivElement | null  
{
    for(let i = board.length - 1; i >= 0; i--) {
        if(board[i][currentCol] === Cell.EMPTY) {
            return boardRef[i][currentCol].current;
        }
    }

    return null;
}