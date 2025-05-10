import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./layout/Layout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import FavoritesPage from "./pages/FavoritesPage";
import CartPage from "./pages/CartPage";
// import { useAuth } from "./context/AuthContext";
import ProductDetailPage from "./pages/ProductDetailPage";
// import { ReactElement } from "react";

// interface PrivateRouteProps {
//     children: ReactElement;
// }

// Временно отключаем проверку авторизации
// const PrivateRoute = ({ children }: PrivateRouteProps) => {
//     //  const { token } = useAuth();
//     // return token ? children : <Navigate to="/login" replace />;
//     return children;
// };

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/register" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            <Route element={<Layout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    );
};