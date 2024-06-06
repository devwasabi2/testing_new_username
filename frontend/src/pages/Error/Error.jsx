import { useNavigate, useRouteError } from "react-router-dom";
import "./Error.css";

const Error = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className="error-container">
            <h2 className="error-header">Oops! Something went wrong...</h2>
            <p className="error-message">{error.message || error.statusText}</p>
            <button className="error-button" onClick={() => {
                navigate("/");
            }}>Return Home</button>
        </div>
    )
}

export default Error