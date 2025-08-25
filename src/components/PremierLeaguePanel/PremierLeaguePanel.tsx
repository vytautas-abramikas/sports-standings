import { AddOpponentForm } from "../AddOpponentForm/AddOpponentForm";
import { AddMatchForm } from "../AddMatchForm/AddMatchForm";
import { StandingsTable } from "../StandingsTable/StandingsTable";
import "./PremierLeaguePanel.scss";

export const PremierLeaguePanel: React.FC = () => {
  return (
    <div className="league-container premier">
      <div className="header premier">Premier League</div>

      <div className="league-content">
        <div className="section premier">
          <div className="section-title premier">Add Team</div>
          <AddOpponentForm />
        </div>

        <div className="section premier">
          <div className="section-title premier">Add Score</div>
          <AddMatchForm />
        </div>

        <div className="table-section premier">
          <StandingsTable />
        </div>
      </div>
    </div>
  );
};
