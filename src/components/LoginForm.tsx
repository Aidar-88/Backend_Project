import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css"
import { API_BASE_URL } from "../config";


const LoginForm = ({onSwitch}: {onSwitch: () => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                email,
                password,
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userName", response.data.name);
            setEmail("");
            setPassword("");
            navigate("/home");

        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.error("Error", err.response?.data || err.message);
                    setError(err.response?.data?.message || err.message || "Error in entry")
            }
            else {
                console.error("unknown error", err);
                setError("Unknown error in server");
            }
        }
    };

    return (
            
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Login</h2>
                <input
                name="email"    
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
            />
                <input
                name="password"    
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.input}
                />
                <button
                    type="submit"
                    className={styles.button}>Join</button>
                {error && <p className={styles.error}>{error}</p>}
                <p className={styles.link} onClick={onSwitch}>
                    No account? Sign up
                </p>
            
        </form>
        </div>
    );
};


export default LoginForm;
