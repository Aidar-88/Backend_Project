import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAuth } from "./context/AuthContext";
import { JSX } from "react";


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    // const { token } = useAuth();     потом включу
    // return token ? children : <Navigate to="/login" />
     return children;
};
export const AppRoutes = () => {
    return (
            <Routes>
            <Route path="/" element={ <Navigate to="/login" />} />
            <Route path="/register" element={<LoginPage />} />
            {/* <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} /> */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            </Routes>
    )
}