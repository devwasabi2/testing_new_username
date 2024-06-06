import { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { signIn } from "aws-amplify/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const output = await signIn({
        username: email,
        password: password,
      });
      const { nextStep } = output;
      const username = email;
      let secret = null;
      switch (nextStep.signInStep) {
        // ...
        case "CONTINUE_SIGN_IN_WITH_TOTP_SETUP":
          secret = nextStep.totpSetupDetails.sharedSecret;
          navigate("/mfa", { state: { secret, username } });

          break;
        case "CONFIRM_SIGN_IN_WITH_TOTP_CODE":
          navigate("/mfa", { state: { secret, username } });
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-text">{error}</p>}
        <button className="login-button" type="submit">
          Login
        </button>
        <button
          className="sign-up-route"
          type="button"
          onClick={() => navigate("/signup")}
        >
          Don't have an account? Sign Up
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
