import { useRef } from "react";

/**
 * @returns The references to each cell on the board
 */
export function useBoardRef() : React.MutableRefObject<any>[][] {
    return [
        [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()],
    ]
}