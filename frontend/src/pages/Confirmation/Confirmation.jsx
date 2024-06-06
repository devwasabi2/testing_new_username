// src/pages/Confirmation/Confirmation.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ConfirmationForm from "../../components/ConfirmationForm/ConfirmationForm.jsx";
import Header from "../../components/Header/Header.jsx";

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};

  return (
    <div>
      <Header logoutButton={false} />
      <ConfirmationForm username={username} />
    </div>
  );
};

export default Confirmation;
