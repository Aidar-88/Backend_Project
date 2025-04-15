import { useState } from "react";
import styles from "./register.module.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = ({onSwitch}: { onSwitch: ()=> void }) => {

    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    })
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        console.log("Register", formData);
        try {
            await register(formData.name, formData.email, formData.password, formData.role);
            navigate("/home")
        } catch (err) {
            console.error("Registration failed", err)
            setMessage("Registration failed, please try again!")
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleRegister}>
                <h2 className={styles.title}>Registration</h2>
                <input 
                    name="name"
                    type="text"
                    placeholder="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />

                <input
                    name="email"
                    type="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    autoComplete="current-password"
                />
                <select
                    name="role"
                    value={formData.role || ""}
                    onChange={handleChange}
                    required
                    className={styles.select}>
                    <option value="" disabled hidden>Select Role</option>
                    <option value="consumer">Consumer</option>
                    <option value="seller">Seller</option>
                </select>
                <button type="submit" className={styles.button} disabled={loading}>
                    { loading ? "Signing up..." : "Sign Up" }
                </button>
                {message && <p className={styles.error}>{message}</p>}
                <div>
                    <p onClick={onSwitch} className={styles.link}>Already have an account? Sign in</p>
                </div>
        </form>
        </div>
    )
}
export default Register;