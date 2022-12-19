import React, { useState } from "react";
import { useVehicle } from "../../hooks/useVehicle";

const VehicleSettings = ({ settings, regno, phone }) => {
  const { updateVehicleSettings } = useVehicle();
  const [status, setStatus] = useState("idle");
  const [description, setDescription] = useState(settings.description);
  const [active, setActive] = useState(settings.active);

  const updateDescription = () => updateSettings({ ...settings, description });
  const updateActiveStatus = (active) =>
    updateSettings({ ...settings, active });

  const updateSettings = async (updatedSettings) => {
    setStatus("pending");
    let response = await updateVehicleSettings(updatedSettings, regno, phone);
    
    setStatus(response.status);
    setDescription(response.description);
    setActive(response.active);
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
          <button
            className="danger-button-small"
            onClick={() => updateActiveStatus(false)}
          >
            Deaktiver
          </button>
        )}
        {!active && (
          <button
            className="primary-button-small"
            onClick={() => updateActiveStatus(true)}
          >
            Aktivér
          </button>
        )}
      </div>
      <div className="form-group">
        <div className="label">Beskrivelse</div>
        <div className="row">
        <textarea style={{padding: '0.5rem'}}
          className="text-area"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        </div>
        <small>Eks. Petter kjører denne bilen.</small>
        <div className="row">
          <button
            className="primary-button-small"
            onClick={() => updateDescription()}
          >
            Oppdater
          </button>
        </div>
      </div>
      {status === "pending" && <p>Oppdaterer innstillinger...</p>}
    </div>
  );
};

export default VehicleSettings;
