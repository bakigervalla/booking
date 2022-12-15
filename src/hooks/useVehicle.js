import { useState } from "react";
import client from "../context/api";

export const useVehicle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [response, setResponse] = useState(undefined);

  const fetchVehicleHistory = async (phone, regno) => {
    setLoading(true);

    const response = await client.get(`vehicle/phone/${phone}`);

    if (!response.ok) setError("An error occurred");

    const { data } = response;

    console.log(data);
    const index = data.findIndex(
      ({ vehicle }) => vehicle.regno === regno
    );

    if (index !== -1) {
      let selectedVehicle = data[index];
      let regNo = data[index].vehicle.regno;

      const { history, xtra } = await client.get(`history/${regno}/${phone}`);
      setResponse({
        vehicles: data,
        selectedVehicle: selectedVehicle,
        regNo: regNo,
        history: history,
        xtra: xtra,
      });
      console.log("data", data);
    }

    setLoading(false);
  };

  return {
    loading,
    fetchVehicleHistory,
    response,
    error,
  };
};
