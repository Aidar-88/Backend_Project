import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css"

const LoginForm = ({ onSwitch }: { onSwitch: () => void }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/home")         
        } catch (err) {
            setError("Invalid credentials. Try again!");
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
