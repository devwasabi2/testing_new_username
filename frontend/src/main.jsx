// src/index.js or src/main.js (adjust based on your setup)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import awsConfig from "../aws-config.js";
Amplify.configure(awsConfig);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
