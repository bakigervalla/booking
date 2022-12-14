import React, { useRef, useEffect } from "react";

import VehicleInfo from "./VehicleInfo";
import { useVehicles, clearFilter, setStep } from "../context/VehicleState";

import "../layout/css/summary.css";

const Summary = ({ workshop }) => {
  const [vehicleState, vehicleDispatch] = useVehicles();
  const { vehicles, person, filtered } = vehicleState;

  const topRef = useRef(null);

  useEffect(() => {
    topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [person]);

  return (
    <div ref={topRef} className="w4">
      <VehicleInfo vehicle={vehicles} />

      <div className="heading h-32 pt-6 text-center">
        <h3>Din forespørsel er sent!</h3>
        <span className="text-sm">
          Vi tar kontakt med deg så snart som mulig.
        </span>
      </div>

      <div className="summary w-[90%] md:w-1/2 mx-4">
        <h3>Bestilling Oversikt</h3>
        <div className="table">
          <div className="row">
            <div className="col-1">Sted</div>
            <div className="col-11">
              <span>{workshop.name}</span>
              <span>{workshop.street}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-1">Type</div>
            <div className="col-11 type">
              {filtered &&
                filtered
                  .map((item, key) => {
                    return item.name;
                  })
                  .join(", ")}
              {filtered.length === 0 && <span></span>}
            </div>
          </div>
          <div className="row ">
            <div className="col-1">Beskjed</div>
            <div className="col-11">
              <>
                <span>{person.request}</span>
                <span>{person.message}</span>
              </>
            </div>
          </div>
          <div className="row">
            <div className="col-1">Bil</div>
            <div className="col-11">
              <span>{vehicles?.kjennemerke}</span>
              <span>{`${vehicles?.merkeNavn} ${vehicles?.modellbetegnelse} ${vehicles?.regAAr}`}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-1">&nbsp;</div>
            <div className="col-11 grid place-items-center ">
              {/* <img alt="logo" className='w-40' src={logo} /> */}
            </div>
          </div>
        </div>
        <div className="actions">
          <input
            type="button"
            value="FERDIG"
            onClick={() => {
              const url = typeof window !== "undefined" ? window.location : "";
              url.hash = "";
              // navigate(`${url}order`)
              clearFilter(vehicleDispatch);
              setStep(vehicleDispatch, 1, "");
            }}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Summary;
