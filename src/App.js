import VehicleState from "./context/VehicleState";
import { Routes, Route } from "react-router-dom";

import { Container } from "./components/index";
import LoginPage from "./components/login/login";
import VehicleHistory from "./components/login/vehicle-history";

import "./layout/css/style.css";

function App() {
  return (
    <div className="main">
      <VehicleState>
          <Routes>
            <Route exact path="/" element={<Container />} />
            <Route exact path="/vehicle-history" element={<VehicleHistory />} />
            <Route exact path="/login" element={<LoginPage />} />
          </Routes>
      </VehicleState>
    </div>
  );
}

export default App;
