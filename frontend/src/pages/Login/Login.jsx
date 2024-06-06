import { useLoaderData, useNavigate } from "react-router-dom";
import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect } from "react";

import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import Header from "../../components/Header/Header.jsx"

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const session = await fetchAuthSession();
                const token = session.tokens.accessToken.toString();
                if (token) {
                    navigate("/");
                }
            } catch {
                console.log("No session found");
            }
        };
        checkToken();
    }, []);

    return (
        <div>
            <Header logoutButton={false} />
            <LoginForm />
        </div>
    )
}

export default Login