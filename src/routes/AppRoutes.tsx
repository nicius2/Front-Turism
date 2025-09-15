import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { Home } from "../pages/Home";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}