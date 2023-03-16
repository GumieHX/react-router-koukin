import Router from "./Router.jsx";
import { createBrowserHistory } from "history";
import { useLayoutEffect, useRef, useState } from "react";

export default function BrowserRouter ({ children }) {

    let historyRef = useRef()

    if(!historyRef.current) {
        historyRef.current = createBrowserHistory()
    }
    const history = historyRef.current; 
    const [state, setState] = useState({ location: history.location})

    useLayoutEffect(() => {
        history.listen(setState);
    }, [state])

    return <Router children={children} navigate={history} location={state.location} />
}