import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

export const AppRoutes = () => {
    return (
      
            <Routes>
            <Route path="/" element={ <Navigate to="/login" />} />
            <Route path="/register" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            </Routes>
   
    )
}