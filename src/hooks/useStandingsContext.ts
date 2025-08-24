import { useContext } from "react";
import { StandingsContext } from "../context/StandingsContext";

export const useStandingsContext = () => {
  const context = useContext(StandingsContext);
  if (!context) {
    throw new Error(
      "useStandingsContext must be used within a StandingsProvider"
    );
  }
  return context;
};
