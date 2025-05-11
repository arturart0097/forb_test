import type { RouteObject } from "react-router-dom"

import { MainPage } from "../../pages/MainPage"
import { NotFoundPage } from "../../pages/NotFoundPage"

export enum AppRouter {
    MAIN = "main",
    NOT_FOUND = "not_found",
}

export const RouterPath: Record<AppRouter, string> = {
    [AppRouter.MAIN]: "/",
    [AppRouter.NOT_FOUND]: "*",
}

export const routerConfig: Record<AppRouter, RouteObject> = {
    [AppRouter.MAIN]: {
        path: RouterPath.main,
        element: <MainPage />,
    },
    [AppRouter.NOT_FOUND]: {
        path: RouterPath.not_found,
        element: <NotFoundPage />,
    },
}
