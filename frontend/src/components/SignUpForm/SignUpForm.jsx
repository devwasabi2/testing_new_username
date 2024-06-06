import { useState, useEffect } from "react";

import "./SignUpForm.css";
import { useNavigate } from "react-router-dom";
import { signUp } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: username,
        password: password,
        options: {
          userAttributes: {
            email: username,
          },
        },
      });
      if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        navigate("/confirmation", { state: { username } });
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.message.includes("Member must satisfy regular")) {
        setError(
          "Password did not conform with policy: Password not long enough"
        );
      } else {
        setError(error.message);
      }
    }
  };

  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <h2 className="signup-header">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          className="signup-input"
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="signup-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="password-requirements">
          <p>Password Requirements</p>
          <ul>
            <li>Minimum 8 characters</li>
            <li>At least one uppercase letter</li>
            <li>At least one lowercase letter</li>
            <li>At least one number</li>
            <li>At least one special character</li>
          </ul>
        </div>
        {error && <p className="error-text">{error}</p>}
        <button className="signup-button" type="submit">
          Sign Up
        </button>
        <button className="login-route" onClick={() => navigate("/login")}>
          Already have an account? Login
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
