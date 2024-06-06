import { useNavigate } from "react-router-dom";
import { signOut } from "aws-amplify/auth";

import logo from "../../assets/budget-logo.svg";

import "./Header.css"

const Header = ({ logoutButton }) => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div onClick={() => {
                navigate("/");
            }} className="logo-container">
                <img src={logo} alt="Logo" className="logo-image" />
                <h1 className="logo-text">Budget Planner</h1>
            </div>
            {
                logoutButton && (
                    <>
                        <button className="logout-button" onClick={async () => {
                            await signOut().then(
                                navigate("/login")
                            )
                        }}>Logout</button>
                    </>
                )
            }
        </header>
    )
}

export default Header;