import React, { useEffect, useState } from "react";
import { useVehicle } from "../../hooks/useVehicle";
import { useGetToken } from "../../hooks/use-get-token";
import { useQuery } from "../../hooks/use-query";

import jwt_decode from "jwt-decode";
import queryString from "query-string";
import * as moment from "moment";

import VehicleList from "./vehicle-list";
import VehicleSettings from "./vehicle-settings";
import MyPageTabs from "./tab-pages";
import History from "./history";
import Xtra from "./xtra";

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
  const { vehicles, selectedVehicle, history, xtra } = response;
  const token = useGetToken();
  let location = useQuery();
  const query = queryString.parse(location);
  const { username: phone } = token ? jwt_decode(token) : { username: null };

  const [regno, setRegno] = useState(query.regno);
  // const [selectedVehicle, setSelectedVehicle] = useState(undefined);
  // const [vehicles, setVehicles] = useState([]);
  // const [history, setHistory] = useState([]);
  // const [xtra, setXtra] = useState(undefined);
  const [loadingData] = useState(false);
  const [tab, setTab] = useState(0);

  const hasVehicles = vehicles && vehicles.length > 0;

  const mainBox = isBrowser ? { display: "flex" } : { display: "block" };
  const firstBox = isBrowser ? null : { marginBottom: "2rem" };

  useEffect(() => {
    (async () => {
      try {
        await fetchVehicleHistory(phone, regno);
        console.log(response);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [phone, regno]);

  const DateBox = ({ title, date }) => {
    return (
      <div
        className="date-box"
        style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
      >
        <strong>{title}</strong>
        <br />
        {date && <time>{moment(date).format("DD.MM.YY")}</time>}
        {!date && "Ikke oppgitt"}
      </div>
    );
  };

  return (
    <div style={mainBox} className="vehicle-history">
      <div className="left-sec" style={firstBox}>
        {!loading && !hasVehicles && (
          <React.Fragment>
            <h2>Ingen data</h2>
            <p>Vi har ingen kjøretøy registrert på telefonnummer {phone}.</p>
          </React.Fragment>
        )}
        {loading ? (
          <p>Henter kjøretøy og historikk...</p>
        ) : (
          <React.Fragment>
            {!selectedVehicle ? (
              <React.Fragment>
                <h1>Ingen historikk</h1>
                <p>
                  Fant ingen historikk registrert på deg med registreringsnummer{" "}
                  {regno}
                </p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="vehicle-header">
                  {selectedVehicle && (
                    <div className="vehicle-title">
                      {selectedVehicle.vehicle.regno}
                    </div>
                  )}
                  {selectedVehicle && selectedVehicle.data && (
                    <div className="vehicle-subheader">
                      {selectedVehicle.data.merkeNavn}{" "}
                      {selectedVehicle.data.modellbetegnelse}{" "}
                      {selectedVehicle.data.regAAr}
                    </div>
                  )}
                </div>
                <div className="date-boxes">
                  {selectedVehicle && (
                    <div className="grid">
                      <div className="column">
                        <DateBox
                          title="Neste EU-kontroll"
                          date={selectedVehicle?.data?.nestePKK ?? "-"}
                        />
                      </div>
                      <div className="column">
                        <DateBox title="Neste time">
                          date={selectedVehicle.vehicle.next_work_date}
                        </DateBox>
                      </div>
                      <div className="column">
                        <DateBox
                          title="Neste beregnet service"
                          date={selectedVehicle.vehicle.next_service_date}
                        />
                      </div>
                      <div className="column">
                        <DateBox
                          title="Mobilitetsgaranti utløper 1 mnd. etter denne dato"
                          date={selectedVehicle.vehicle.mob_expiry_date}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {loadingData && <p>Henter historikk...</p>}

                {!loadingData && (
                  <MyPageTabs onTabSelected={setTab}>
                    {tab === 0 && <History history={history} />}

                    {tab === 1 && <Xtra xtra={xtra} />}

                    {tab === 2 && (
                      <VehicleSettings
                        regno={selectedVehicle.vehicle.regno}
                        phone={phone}
                        settings={selectedVehicle.settings}
                      />
                    )}
                  </MyPageTabs>
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>

      <div className="vehicle-list">
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
