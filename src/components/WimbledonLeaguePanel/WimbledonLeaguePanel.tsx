import { StandingsTable } from "../StandingsTable/StandingsTable";
import "./WimbledonLeaguePanel.scss";
import tennisLogoUrl from "../../assets/tennis.svg";

export const WimbledonLeaguePanel: React.FC = () => {
  return (
    <div className="league-container wimbledon">
      <div className="header wimbledon">
        <img
          src={tennisLogoUrl}
          alt="Tennis Logo"
          style={{
            height: "2rem",
            marginRight: "1rem",
          }}
        />
        Wimbledon
      </div>

      <div className="league-content">
        <div className="table-section wimbledon">
          <StandingsTable />
        </div>
      </div>
    </div>
  );
};
