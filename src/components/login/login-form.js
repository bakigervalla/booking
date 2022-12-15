import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

import Alert from "../../layout/Alert";

const LoginForm = () => {
  let navigate = useNavigate();

  const { loading, login, error } = useLogin();
  const [phone, setPhone] = useState("");
  const [regno, setRegno] = useState("");

  const doLogin = async (e) => {
    e.preventDefault();
    const { token } = await login(phone, regno);
    localStorage.setItem("bilxtra-web-auth", token);
    navigate(`/vehicle-history?regno=${regno}`);
    // navigate(`/min-side?regno=${regno}`)
  };

  return (
    <form className="login-form" onSubmit={doLogin}>
      {error && <Alert type="error" message="Det oppstod en feil." />}

      <div>
        <input
          type="phone"
          name="phone"
          value={phone}
          placeholder="Telefonnummer"
          onChange={(e) => setPhone(e.target.value) }
        />
        <input
          name="regno"
          value={regno}
          placeholder="Reg. nr"
          onChange={(e) => setRegno(e.target.value.toUpperCase())}
        />
      </div>
      <button
        type="submit"
        disabled={(!phone && !regno) || loading ? "disabled" : ""}
      >
        Logg inn
      </button>
    </form>
  );
};

export default LoginForm;
