import { Routes, Route } from "react-router-dom";

import { routerConfig } from "./config/routerConfig";

export const AppRouter = () => {
    return (
        <Routes>
            {Object.values(routerConfig).map(({ element, path }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    )
}

// Не обовʼязково використовувати Router для двох сторінок