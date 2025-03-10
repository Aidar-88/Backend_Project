import { useState } from "react";
import LoginForm from "../components/LoginForm";
import Register from "../components/register/register";

const LoginPage = () => {

    const [isLogin, setIsLogin] = useState(true);

    return isLogin ? (
        <LoginForm onSwitch={() => setIsLogin(false)} />
    ) : (<Register onSwitch={() => setIsLogin(true)} />
    );
};

export default LoginPage;