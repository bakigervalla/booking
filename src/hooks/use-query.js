import React from "react";
import { useLocation } from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string for you.
export const useQuery = () => {
  const { search } = useLocation();
  // eslint-disable-next-line
  return React.useMemo(() => search); // new URLSearchParams(search), [search]
};
