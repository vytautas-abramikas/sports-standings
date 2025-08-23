import "./App.scss";

export const App: React.FC = () => {
  return (
    <div className="app">
      <div className="container">
        <div className="header">Premier League</div>

        <div className="section">
          <div className="section-title">Add Team</div>
          <form className="form-row">
            <input type="text" placeholder="Team Name" className="input p5o6" />
            <button type="submit" className="button p1o6">
              Add
            </button>
          </form>
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
          <table className="table">
            <thead>
              <tr>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Man U</td>
                <td>3</td>
                <td>2</td>
                <td>1</td>
                <td>0</td>
                <td>7</td>
              </tr>
              <tr>
                <td>Liverpool</td>
                <td>3</td>
                <td>2</td>
                <td>0</td>
                <td>1</td>
                <td>6</td>
              </tr>
              <tr>
                <td>Arsenal</td>
                <td>3</td>
                <td>1</td>
                <td>2</td>
                <td>0</td>
                <td>5</td>
              </tr>
              <tr>
                <td>Chelsea</td>
                <td>3</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
