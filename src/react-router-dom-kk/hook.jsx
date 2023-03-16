import { useCallback, useContext, useMemo } from "react";
import { matchRoutes, matchPath } from "react-router-dom";
import { NavigateContext, RouterContext } from "./Context";
import Outlet from "./Outlet";
import { normalizePathName } from './utils/utils.js';

export function useRoutes (routes) {
    const location = useLocation();
    const pathname = location.pathname;

    const matches = matchRoutes(routes, { pathname });
    return renderMatches(matches);
}

function renderMatches (matches) {
    if(!matches) return null;
    return matches.reduceRight((outlet, match) => {
        return <RouterContext.Provider value={{ outlet, matches}} children={match.route.element || outlet } />
    }, null);
}

export function useNavigate () {
    const { navigate } = useContext(NavigateContext);

    const _nagigate = useCallback((to, options={}) => {
        if(typeof to === 'number') {
            navigate.go(to);
            return;
        }
        (!!options.replace ? navigate.replace : navigate.push)(to, options.state);
    }, [navigate])

    return _nagigate;
}

export function useLocation () {
    const { location } = useContext(NavigateContext);
    return location;
}

export function useOutlet () {
    let { outlet }  = useContext(RouterContext);
    return outlet;
}

export function useParams () {
    const { matches } = useContext(RouterContext);
    const routeMatch = matches[matches.length - 1];
    return routeMatch ? routeMatch.params : {};
}

export function useMatch (pattern) {
    const { pathname } = useLocation();
    console.log(pattern, pathname);
    return useMemo(() => matchPath(pattern, pathname), [pathname, pattern])  
}

export function useResolvedPath (to) {
    const { pathname } = useLocation();
    return useMemo(() => ({ pathname: to, hash: '', search: '' }), [pathname]);
} 