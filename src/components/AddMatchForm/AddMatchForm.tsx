import "../App/App.scss";

export const AddMatchForm: React.FC = () => {
  return (
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
        <input type="text" placeholder="Home Score" className="input half" />
        <input type="text" placeholder="Away Score" className="input half" />
      </div>
      <button type="submit" className="button full">
        Add Score
      </button>
    </form>
  );
};
