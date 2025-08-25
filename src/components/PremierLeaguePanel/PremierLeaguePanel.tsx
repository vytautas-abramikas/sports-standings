import { AddOpponentForm } from "../AddOpponentForm/AddOpponentForm";
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
        <form>
          <div className="form-row">
            <select className="select half dark" defaultValue="0">
              <option value="0" disabled>
                Home team
              </option>
            </select>
            <select className="select half dark" defaultValue="0">
              <option value="0" disabled>
                Away team
              </option>
            </select>
          </div>
          <div className="form-row">
            <input
              type="text"
              placeholder="Home Score"
              className="input half"
            />
            <input
              type="text"
              placeholder="Away Score"
              className="input half"
            />
          </div>
          <button type="submit" className="button full">
            Add Score
          </button>
        </form>
      </div>

      <div className="table-section">
        <StandingsTable />
      </div>
    </div>
  );
};
