import createRoutesFromChildren from "./createRoutesFromChildren.js";
import { useRoutes } from './hook';

export default function Routes ({ children }) {
    const routes = createRoutesFromChildren(children)

    return useRoutes(routes);
}