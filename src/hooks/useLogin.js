import { useState } from "react";
import client from "../context/api";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const login = async (phone, regno) => {
    setLoading(true);

    const response = await client.post("auth/bilxtra-web", { phone, regno });

    setLoading(false);
    if (!response.ok) setError("An error occurred");

    return response.data;
  };

  return {
    loading,
    login,
    error,
  };
};
