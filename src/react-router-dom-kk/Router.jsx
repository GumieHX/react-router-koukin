import { NavigateContext } from "./Context"
import { useMemo } from "react"

export default function Router ({ navigate, children, location }) {
    const navigationContext = useMemo(() => ({ navigate, location }), [navigate, location]);
    return (
        <NavigateContext.Provider value={navigationContext}>
            {children}
        </NavigateContext.Provider>
    )
}