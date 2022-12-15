import React from "react";
import LoginForm from "./login-form";
import { isBrowser } from "react-device-detect";

import "./login.css";
const mainBox = isBrowser ? { display: "flex" } : { display: "block" };
const firstBox = isBrowser ? null : { marginBottom: "2rem" };

const LoginPage = () => {
  //   const workshop = useGetFavoriteWorkshop();
  //   const token = useGetToken();

  return (
    <div style={mainBox} className="flex-container">
      <div className="flex-child magenta" style={firstBox}>
        <h1>Bileiers side</h1>
        <LoginForm />
      </div>

      <div className="flex-child blue">
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
