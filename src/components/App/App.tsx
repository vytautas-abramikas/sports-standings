import { StandingsProvider } from "../../context/StandingsContext";
import { PremierLeaguePanel } from "../PremierLeaguePanel/PremierLeaguePanel";
import "./App.scss";

export const App: React.FC = () => {
  return (
    <div className="screen">
      <StandingsProvider instanceId="premier">
        <PremierLeaguePanel />
      </StandingsProvider>
    </div>
  );
};
