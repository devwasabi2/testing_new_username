// src/pages/Confirmation/Confirmation.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MFAForm from "../../components/MFAForm/MFAForm.jsx";
import Header from "../../components/Header/Header.jsx";

const MFA = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { secret, username } = location.state || {};
  return (
    <div>
      <Header logoutButton={false} />
      <MFAForm secret={secret} username={username} />
    </div>
  );
};

export default MFA;
