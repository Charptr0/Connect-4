import { useRef } from "react";

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