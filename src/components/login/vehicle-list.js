import React, { useState } from "react";
// import Box from './styled/box'

const VehicleList = ({ vehicles, selected, onClicked }) => {
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const onActiveVehiclesChange = (e) => setShowActiveOnly(e.target.checked);
  const activeVehicles = vehicles
    ? vehicles.filter((v) => v.settings.active)
    : [];
  const data = showActiveOnly ? activeVehicles : vehicles;

  return (
    <div className="vehicle-liste">
      <div className="vh-checkbox">
        <input type="checkbox" onChange={onActiveVehiclesChange} />
        Vis kun aktive biler
      </div>
      {data?.map((vehicle, i) => {
        const isSelected =
          selected && vehicle.vehicle.regno === selected.vehicle.regno;

        return (
          <div className="vh-box-right"
            key={`vehicle-${i}`}
            onClick={() => onClicked(vehicle.vehicle.regno)}
          >
            {isSelected ? (
              <div>
                <strong>{vehicle.vehicle.regno}</strong>
                <br />
                {vehicle.data && (
                  <small>
                    {vehicle.data.merkeNavn} {vehicle.data.modellbetegnelse}{" "}
                    {vehicle.data.regAAr}
                  </small>
                )}
              </div>
            ) : (
              <div>
                <strong>{vehicle.vehicle.regno}</strong>
                <br />
                {vehicle.data && (
                  <small>
                    {vehicle.data.merkeNavn} {vehicle.data.modellbetegnelse}{" "}
                    {vehicle.data.regAAr}
                  </small>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default VehicleList;
