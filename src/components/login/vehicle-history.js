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

import { isBrowser } from "react-device-detect";

const VehicleHistory = (callback, deps) => {
  const { fetchVehicle, error } = useVehicle();
  const token = useGetToken();
  let location = useQuery();
  const query = queryString.parse(location);
  const { username: phone } = token ? jwt_decode(token) : { username: null };

  const [loading, setLoading] = useState(false);
  const [regno, setRegno] = useState(query.regno);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(undefined);
  const [history, setHistory] = useState([]);
  const [xtra, setXtra] = useState(undefined);
  const [loadingData] = useState(false);
  const [tab, setTab] = useState(0);
  const [hasVehicles, setHasVehicles] = useState(false);

  const mainBox = isBrowser ? { display: "flex" } : { display: "block" };
  const firstBox = isBrowser ? null : { marginBottom: "2rem" };

  useEffect(() => {
    (async () => {
      try {
        console.log(phone);
        if (phone != null) {
          setLoading(true);
          var response = await fetchVehicle(phone, regno);

          setVehicles(response.vehicles);
          setSelectedVehicle(response.selectedVehicle);
          setHistory(response.history);
          setXtra(response.xtra);

          setHasVehicles(response.vehicles && response.vehicles.length > 0);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
      }
    })();
    // eslint-disable-next-line
  }, [phone, regno]);

  const dateBoxStyle = { paddingTop: "1rem", paddingBottom: "1rem", marginRight: isBrowser ? '1rem' : '0' }

  const DateBox = ({ title, date }) => {
    return (
      <div
        className="date-box col-3"
        style={dateBoxStyle}
      >
        <strong>{title}</strong>
        <br />
        {date && <time>{moment(date).format("DD.MM.YY")}</time>}
        {!date && "Ikke oppgitt"}
      </div>
    );
  };

  return (
    <div style={mainBox} className="vehicle-history container">
      <div className="left-sec col-9" style={firstBox}>
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
                <div className="vehicle-header row">
                  {selectedVehicle && (
                    <div className="vehicle-title">
                      {selectedVehicle.vehicle.regno}
                    </div>
                  )}
                  {selectedVehicle && selectedVehicle.data && (
                    <div className="vehicle-subheader row">
                      {selectedVehicle.data.merkeNavn}{" "}
                      {selectedVehicle.data.modellbetegnelse}{" "}
                      {selectedVehicle.data.regAAr}
                    </div>
                  )}
                </div>
                {selectedVehicle && (
                  <div className={isBrowser ? 'flex row' : 'row'}>
                    <DateBox
                      title="Neste EU-kontroll"
                      date={selectedVehicle?.data?.nestePKK ?? "-"}
                    />
                    <DateBox
                      title="Neste time"
                      date={selectedVehicle.vehicle.next_work_date}
                    />
                    <DateBox
                      title="Neste beregnet service"
                      date={selectedVehicle.vehicle.next_service_date}
                    />
                    <DateBox
                      title="Mobilitetsgaranti utløper 1 mnd. etter denne dato"
                      date={selectedVehicle.vehicle.mob_expiry_date}
                    />
                  </div>
                )}

                {loadingData && <p>Henter historikk...</p>}

                {!loadingData && (
                  <div className="row">
                    <MyPageTabs onTabSelected={setTab} tab={tab}>
                      <div className="ul-content">
                        {tab === 0 && <History history={history} />}

                        {tab === 1 && <Xtra xtra={xtra} />}

                        {tab === 2 && (
                          <VehicleSettings
                            regno={selectedVehicle.vehicle.regno}
                            phone={phone}
                            settings={selectedVehicle.settings}
                          />
                        )}
                      </div>
                    </MyPageTabs>
                  </div>
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>

      <div className="vehicle-list col-3">
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
