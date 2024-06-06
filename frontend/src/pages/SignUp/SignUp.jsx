import { useLoaderData, useNavigate } from "react-router-dom";

import SignUpForm from "../../components/SignUpForm/SignUpForm.jsx";
import Header from "../../components/Header/Header.jsx"

const SignUp = () => {
    let navigate = useNavigate();

    return (
        <div>
            <Header logoutButton={false} />
            <SignUpForm />
        </div>
    )
}

export default SignUp