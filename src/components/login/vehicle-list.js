import React, { useState } from "react";

const VehicleList = ({ vehicles, selected, onClicked }) => {
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const onActiveVehiclesChange = (e) => setShowActiveOnly(e.target.checked);
  const activeVehicles = vehicles
    ? vehicles.filter((v) => v.settings.active)
    : [];
  const data = showActiveOnly ? activeVehicles : vehicles;

  return (
    <div className="container">
      <div className="vh-checkbox">
        <input type="checkbox" onChange={onActiveVehiclesChange} />
        Vis kun aktive biler
      </div>
      {data?.map((vehicle, i) => {
        const isSelected =
          selected && vehicle.vehicle.regno === selected.vehicle.regno;

        return (
          <div
            className="vh-box-right col-12"
            key={`vehicle-${i}`}
            onClick={() => onClicked(vehicle.vehicle.regno)}
          >
            <div className={isSelected ? "selected-vehicle" : null}>
              <strong>{vehicle.vehicle.regno}</strong>
              <br />
              {vehicle.data && (
                <small>
                  {vehicle.data.merkeNavn} {vehicle.data.modellbetegnelse}{" "}
                  {vehicle.data.regAAr}
                </small>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VehicleList;
