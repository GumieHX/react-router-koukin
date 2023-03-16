export const normalizePathName = (pathname) =>
    pathname.replace(/\/+$/, '').replace(/^\/*/, '/');