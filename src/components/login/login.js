import React from "react";
import LoginForm from "./login-form";
import { isBrowser } from "react-device-detect";

import "./login.css";
import "../../layout/css/simple-grid.css";
const mainBox = isBrowser ? { display: "flex" } : { display: "block" };
const firstBox = isBrowser ? null : { marginBottom: "2rem" };

const LoginPage = () => {
  return (
    <div style={mainBox} className="flex-container container">
      <div className=" magenta" style={firstBox}>
        <h1>Bileiers side</h1>
        <LoginForm />
      </div>

      <div className="blue">
        <h2>På bileiers side kan du sjekke blant annet:</h2>
        <ul>
          <li>Historikken på en eller flere av bilene dine</li>
          <li>Neste service</li>
          <li>Neste EU-kontroll</li>
          <li>Xtraskjekk skjema</li>
          <li>Mobilitetsgaranti</li>
        </ul>
      </div>
    </div>
  );
};

export default LoginPage;
