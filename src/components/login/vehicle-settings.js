import React, { useState } from "react";

const VehicleSettings = ({ settings, regno, phone }) => {
  const [status, setStatus] = useState("idle");
  const [description, setDescription] = useState(settings.description);
  const [active, setActive] = useState(settings.active);

  const updateDescription = () => updateSettings({ ...settings, description });
  const updateActiveStatus = (active) =>
    updateSettings({ ...settings, active });

  const updateSettings = (updatedSettings) => {
    setStatus("pending");

    delete updatedSettings.regno;

    fetch(`${process.env.API_URL}vehicle/${regno}/settings`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...updatedSettings,
        phone,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          setStatus("idle");
          const data = await response.json();
          setDescription(data.description);
          setActive(data.active);
        } else {
          setStatus("failure");
        }
      })
      .catch((error) => {
        console.error(error);
        setStatus("failure");
      });
  };

  return (
    <div className="vehicle-settings">
      {status === "failure" && (
        <div className="error-message">Det oppstod dessverre en feil</div>
      )}
      <div className="form-group">
        <div className="label">Status</div>
        <p>Denne bilen er {active ? "aktiv" : "inaktiv"}.</p>
        {active && (
          <div
            className="danger-button-small"
            onClick={() => updateActiveStatus(false)}
          >
            Deaktiver
          </div>
        )}
        {!active && (
          <div
            className="primary-button-small"
            onClick={() => updateActiveStatus(true)}
          >
            Aktivér
          </div>
        )}
      </div>
      <div className="form-group">
        <div className="label">Beskrivelse</div>
        <input
          className="text-area"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <small>Eks. Petter kjører denne bilen.</small>
        <div className="row">
          <div
            className="primary-button-small"
            onClick={() => updateDescription()}
          >
            Oppdater
          </div>
        </div>
      </div>
      {status === "pending" && <p>Oppdaterer innstillinger...</p>}
    </div>
  );
};

export default VehicleSettings;
