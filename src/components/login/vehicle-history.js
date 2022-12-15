import React, { useEffect, useState } from "react";
import { useVehicle } from "../../hooks/useVehicle";
import { useGetToken } from "../../hooks/use-get-token";
import { useQuery } from "../../hooks/use-query";

import jwt_decode from "jwt-decode";
import queryString from "query-string";

import VehicleList from "./vehicle-list";

// import { ErrorMessage } from '../components/styled/errorMessage'

// import MyPageLayout from '../layouts/my-page-layout'
// import History from '../components/my-page/history'
// import Xtra from '../components/my-page/xtra'
// import { VehicleHeader } from '../components/my-page/vehicleHeader'
// import { DateBoxes } from '../components/my-page/date-boxes'

// import NoDataFound from '../components/my-page/no-data-found'
// import VehicleSettings from '../components/my-page/vehicle-settings'
// import { authenticatedRequest } from '../services/data.service'

import { isBrowser } from "react-device-detect";

const VehicleHistory = (callback, deps) => {
  const { loading, fetchVehicleHistory, response, error } = useVehicle();

  const token = useGetToken();
  let location = useQuery();
  const query = queryString.parse(location.search);
  const { username: phone } = token ? jwt_decode(token) : { username: null };

  const [regno, setRegno] = useState(query.regno);
  const [selectedVehicle, setSelectedVehicle] = useState(undefined);
  const [vehicles, setVehicles] = useState([]);
  const [history, setHistory] = useState([]);
  const [xtra, setXtra] = useState(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [tab, setTab] = useState(0);

  const hasVehicles = vehicles && vehicles.length > 0;

  const mainBox = isBrowser ? { display: "flex" } : { display: "block" };
  const firstBox = isBrowser ? null : { marginBottom: "2rem" };

  useEffect(() => {
    (async () => {
      try {
        await fetchVehicleHistory();
        console.log("data", response);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [phone, regno]);

  return (
    <div style={mainBox} className="flex-container">
      <div className="flex-child magenta" style={firstBox}>
        {/* {!loading && !hasVehicles && <NoDataFound username={phone} />} */}
        {loading ? (
          <p>Henter kjøretøy og historikk...</p>
        ) : (
          <React.Fragment>
            {!selectedVehicle ? (
              <React.Fragment>
                <h2>Ingen historikk</h2>
                <p>
                  Fant ingen historikk registrert på deg med registreringsnummer{" "}
                  {regno}
                </p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/* <VehicleHeader selectedVehicle={selectedVehicle} />
                      <DateBoxes selectedVehicle={selectedVehicle} /> */}

                {loadingData && <p>Henter historikk...</p>}

                {!loadingData && (
                  <div onTabSelected={setTab}>
                    {/* {tab === 0 && <History history={history} />} */}

                    {/* {tab === 1 && <Xtra xtra={xtra} />} */}

                    {/* {tab === 2 && (
                            <VehicleSettings
                              regno={selectedVehicle.vehicle.regno}
                              phone={phone}
                              settings={selectedVehicle.settings}
                            />
                          )} */}
                  </div>
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>

      <div>
        <h4 style={{ margin: "0 0 1rem 0" }}>Dine biler</h4>

        {loading && !hasVehicles ? (
          <p>Henter biler...</p>
        ) : error ? (
          <div>Det oppstod en feil.</div>
        ) : (
          <VehicleList
            loading={loading}
            error={error}
            vehicles={vehicles}
            selected={selectedVehicle}
            onClicked={(regno) => {
              setTab(0);
              setRegno(regno);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default VehicleHistory;
