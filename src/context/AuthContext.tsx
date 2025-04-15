import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

interface AuthContextType {
    user: string | null;
    token: string | null;
    role: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (name: string, email: string, password: string, role: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string | null>(localStorage.getItem("userName") || null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);
    const [role, setRole] = useState<string | null>(localStorage.getItem("role") || null);


    useEffect(() => {
    if (token) {
        localStorage.setItem("token", token);
    } else {
        localStorage.removeItem("token");
        }
        if (user) {
            localStorage.setItem("userName", user);
        } else {
            localStorage.removeItem("userName");
        }
        if (role) {
            localStorage.setItem("role", role);
        } else {
            localStorage.removeItem("role");
        }
}, [token, user, role]);

const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        setUser(response.data.name);
        setToken(response.data.token);
        setRole(response.data.role)
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }
};
    
    const register = async (name: string, email: string, password: string, role: string) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password, role });
            setUser(response.data.name);
            setToken(response.data.token);
            setRole(response.data.role)
            localStorage.setItem("userName", response.data.name);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    };

const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};

return (
    <AuthContext.Provider value={{ user, token, role, login, logout, register }}>
        {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
