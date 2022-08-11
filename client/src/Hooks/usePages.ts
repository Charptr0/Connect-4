import { useState } from "react";
import { Page } from "../Utils";

export function usePages(initialValue : Page) : [Page, Function] {
    const [page, setPage] = useState(initialValue);
    
    function switchPage(requestedPage : Page) {
        if(requestedPage !== page) {
            setPage(requestedPage);
        }
    }

    return [page, switchPage];
}