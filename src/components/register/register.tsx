import { useState } from "react";
import axios from "axios";
import styles from "./register.module.css"
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

const Register = ({onSwitch}: { onSwitch: ()=> void }) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    })
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("Sending request:",  formData )
            await axios.post(`${API_BASE_URL}/auth/register`,
                formData
            );
            setFormData({name: "", email: "", password: "", role: ""});
            navigate("/login");
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setMessage(err.response?.data?.message || err.message || "Registration failed, please try again!");
            }
            else {
                setMessage("Unknown error occurred.")
            }
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
                <button type="submit" className={styles.button}>
                    Sign up
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