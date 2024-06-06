import { useState, useEffect } from "react";
import "./MFAForm.css";
import { useNavigate } from "react-router-dom";
import { fetchAuthSession, confirmSignIn } from "aws-amplify/auth";
import { createUser } from "../../api/api.jsx";
import QRCodeCanvas from "qrcode.react";

const MFAForm = ({ secret, username }) => {
  const navigate = useNavigate();

  const [showQrCode] = useState(!!secret);
  const [mfaPin, setMfaPin] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const issuer = "BudgetPlanner";
  const totpUri = `otpauth://totp/${issuer}:${username}?secret=${secret}&issuer=${issuer}`;
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
      const { isSignedIn } = await confirmSignIn({
        challengeResponse: mfaPin,
      });

      if (isSignedIn) {
        try {
          await (fetchAuthSession()).then(async (response) => {
            const token = response.tokens.accessToken.toString();
            if (showQrCode) {
              await createUser(token);
            }
          });
          setError("");
          setSuccessMessage(
            "Authentication successful. Redirecting to home page..."
          );
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } catch (error) {
          console.log("received error", error);
          setError(error.message);
        }
      }
    } catch (error) {
      console.log("received error", error);
      setError(error.message);
    }
  };

  return (
    <div className="mfa-container">
      <h2 className="mfa-header">Two-factor authentication</h2>

      {showQrCode && (
        <div>
          <div className="qr">
            <QRCodeCanvas value={totpUri} />
          </div>
          <div className="qr-para">
            <span>
              Budget Planner requires that you use Multi-Factor Authentication
              to access your account.
            </span>
            <br></br>
            <span>
              Please install an authenticator app to your smartphone. Once you
              have installed the application, scan the qr code above to generate
              a code.
            </span>
          </div>
        </div>
      )}

      {!showQrCode && (
        <p className="mfa-para">
          Input the 6 digit code in your authenticator app.
        </p>
      )}
      <form className="mfa-form" onSubmit={handleSubmit}>
        <input
          className="mfa-input"
          value={mfaPin}
          onChange={(e) => setMfaPin(e.target.value)}
          required
        />
        <button className="mfa-button" type="submit">
          Continue
        </button>
        {error && <p className="error-text">{error}</p>}
        {successMessage && <p className="success-text">{successMessage}</p>}
      </form>
    </div>
  );
};

export default MFAForm;
