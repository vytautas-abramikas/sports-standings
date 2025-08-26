import { StandingsTable } from "../StandingsTable/StandingsTable";
import "./EuroBasketLeaguePanel.scss";
import basketballLogoUrl from "../../assets/basketball.svg";

export const EuroBasketLeaguePanel: React.FC = () => {
  return (
    <div className="league-container eurobasket">
      <div className="header eurobasket">
        <img
          src={basketballLogoUrl}
          alt="Basketball Logo"
          style={{
            height: "2rem",
            marginRight: "1rem",
          }}
        />
        EUROBASKET
      </div>

      <div className="league-content">
        <div className="table-section eurobasket">
          <StandingsTable />
        </div>
      </div>
    </div>
  );
};
