import { useState } from "react";
import { useStandingsContext } from "../../hooks/useStandingsContext";
import "../App/App.scss";

export const AddMatchForm: React.FC = () => {
  const { opponents, matches, addMatch, matchError } = useStandingsContext();

  const [homeId, setHomeId] = useState<number>(0);
  const [awayId, setAwayId] = useState<number>(0);
  const [homeScore, setHomeScore] = useState<string>("");
  const [awayScore, setAwayScore] = useState<string>("");

  const getAvailableOpponents = (selectedId: number, isHome: boolean) => {
    return opponents.filter((opponent) => {
      if (isHome && opponent.id === awayId) return false;
      if (!isHome && opponent.id === homeId) return false;
      if (opponent.id === selectedId) return true;
      const alreadyPlayed = matches.some(
        (m) =>
          (m.opponent1Id === (isHome ? opponent.id : homeId) &&
            m.opponent2Id === (isHome ? awayId : opponent.id)) ||
          (m.opponent1Id === (isHome ? awayId : opponent.id) &&
            m.opponent2Id === (isHome ? opponent.id : homeId))
      );
      return !alreadyPlayed;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedHomeScore = parseInt(homeScore, 10);
    const parsedAwayScore = parseInt(awayScore, 10);

    const success: boolean = addMatch({
      id: 0,
      opponent1Id: homeId,
      opponent2Id: awayId,
      opponent1score: parsedHomeScore,
      opponent2score: parsedAwayScore,
    });

    if (!success) return;

    setHomeId(0);
    setAwayId(0);
    setHomeScore("");
    setAwayScore("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <select
          className="select half dark"
          value={homeId}
          onChange={(e) => setHomeId(Number(e.target.value))}
          style={{ borderColor: matchError.home ? "red" : undefined }}
        >
          <option value={0} className="option-placeholder">
            Home team
          </option>
          {getAvailableOpponents(homeId, true).map((opponent) => (
            <option key={opponent.id} value={opponent.id}>
              {opponent.name}
            </option>
          ))}
        </select>
        <select
          className="select half dark"
          value={awayId}
          onChange={(e) => setAwayId(Number(e.target.value))}
          style={{ borderColor: matchError.away ? "red" : undefined }}
        >
          <option value={0} className="option-placeholder">
            Away team
          </option>
          {getAvailableOpponents(awayId, false).map((opponent) => (
            <option key={opponent.id} value={opponent.id}>
              {opponent.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <input
          type="text"
          placeholder="Home Score"
          className="input half"
          value={homeScore}
          onChange={(e) => setHomeScore(e.target.value.replace(/\D/, ""))}
          style={{
            borderColor: matchError.homeScore ? "red" : undefined,
          }}
        />
        <input
          type="text"
          placeholder="Away Score"
          className="input half"
          value={awayScore}
          onChange={(e) => setAwayScore(e.target.value.replace(/\D/, ""))}
          style={{
            borderColor: matchError.awayScore ? "red" : undefined,
          }}
        />
      </div>
      <button type="submit" className="panel-button full">
        Add Score
      </button>
    </form>
  );
};
