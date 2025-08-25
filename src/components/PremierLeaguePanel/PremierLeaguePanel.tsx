import { AddOpponentForm } from "../AddOpponentForm/AddOpponentForm";
import { AddMatchForm } from "../AddMatchForm/AddMatchForm";
import { StandingsTable } from "../StandingsTable/StandingsTable";
import "../App/App.scss";

export const PremierLeaguePanel: React.FC = () => {
  return (
    <div className="league-container">
      <div className="header">Premier League</div>

      <div className="section">
        <div className="section-title">Add Team</div>
        <AddOpponentForm />
      </div>

      <div className="section">
        <div className="section-title">Add Score</div>
        <AddMatchForm />
      </div>

      <div className="table-section">
        <StandingsTable />
      </div>
    </div>
  );
};
