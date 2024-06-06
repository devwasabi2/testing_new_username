import { useState, useEffect } from "react";
import "./ConfirmationForm.css";
import { useNavigate } from "react-router-dom";
import { confirmSignUp } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";

const ConfirmationForm = ({ username }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      const { isSignUpComplete } = await confirmSignUp({
        username: username,
        confirmationCode: otp,
      });

      if (isSignUpComplete) {
        setError("");
        setSuccessMessage(
          "Authentication successful. Redirecting to login page..."
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log("received error", error);
      setError(error.message);
    }
  };

  const blurredEmail = (email) => {
    if (!email) {
      return;
    }
    const [username, domain] = email.split("@");
    const blurredUsername =
      username.substring(0, Math.ceil(username.length / 2)) +
      "*".repeat(username.length - Math.ceil(username.length / 2));
    return blurredUsername + "@" + domain;
  };

  const navigate = useNavigate();

  return (
    <div className="confirm-container">
      <h2 className="confirm-header">Authentication required</h2>
      <p className="confirm-para">
        For your security, we need to authenticate your request. We've send an
        OTP to the email address {blurredEmail(username)}. Please enter it below
        to complete verification.
      </p>
      <form className="confirm-form" onSubmit={handleSubmit}>
        <input
          className="confirm-input"
          placeholder="Otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button className="confirm-button" type="submit">
          Continue
        </button>
        {error && <p className="error-text">{error}</p>}
        {successMessage && <p className="success-text">{successMessage}</p>}
      </form>
    </div>
  );
};

export default ConfirmationForm;
