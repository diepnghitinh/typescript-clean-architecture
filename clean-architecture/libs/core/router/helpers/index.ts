import { Routes, RouteTree } from '@nestjs/core';

export const extractModulesFromRoutes = (routes: Routes) => {
    return routes.reduce((prev, cur) => {
        if (cur.module) prev.push(cur.module);
        if (cur.children) prev.push(...extractModulesFromRoutes(cur.children as RouteTree[]));
        return prev;
    }, []);
};
