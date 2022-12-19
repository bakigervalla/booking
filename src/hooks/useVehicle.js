import { useState } from "react";
import client from "../context/api";

export const useVehicle = () => {
  const [error, setError] = useState(undefined);

  const fetchVehicle = async (phone, regno) => {
    const response = await client.get(`vehicle/phone/null`);

    if (response.status !== 200) setError("An error occurred");
    const { data } = response;

    const index = data.findIndex(({ vehicle }) => vehicle.regno === regno);

    if (index !== -1) {
      let selectedVehicle = data[index],
        regNo = selectedVehicle.vehicle.regno;

      const { vehicle, history, xtra } = await fetchVehicleHistory(
        phone,
        regNo
      );
      return {
        vehicles: data,
        vehicle: vehicle,
        selectedVehicle: selectedVehicle,
        regNo: regNo,
        history: history,
        xtra: xtra,
      };
    }
  };

  const fetchVehicleHistory = async (phone, regno) => {
    const { data } = await client.get(`history/${regno}/null`);
    return data;
  };

  const updateVehicleSettings = async (updatedSettings, regno, phone) => {
    delete updatedSettings.regno;

    try {
      let response = await client.patch(`vehicle/${regno}/settings`, {
        ...updatedSettings,
        phone,
      });

      if (response.status === 200) {
        const { data } = response;
        return {
          status: "idle",
          description: data.description,
          active: data.active,
        };
      } else {
        return { status: "failure" };
      }
    } catch (error) {
      console.error(error);
      return { status: "failure" };
    }
  };

  return {
    fetchVehicle,
    updateVehicleSettings,
    error,
  };
};
