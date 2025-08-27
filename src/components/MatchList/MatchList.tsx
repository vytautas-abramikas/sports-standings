import { useMemo } from "react";
import { useStandingsContext } from "../../hooks/useStandingsContext";
import "./MatchList.scss";
import { EuroBasketCountries } from "../../lib/EuroBasketCountries";
import { FlagMap } from "../../lib/FlagMap";

const allCountries = EuroBasketCountries;

function getCountryById(id: number) {
  return allCountries.find((c) => c.id === id);
}
function getFlagById(id: number) {
  const country = getCountryById(id);
  return country ? FlagMap[country.name] : "";
}

export const MatchList: React.FC = () => {
  const { matches } = useStandingsContext();

  const matchDisplayList = useMemo(
    () =>
      matches.map((match) => ({
        id: match.id,
        opponent1: {
          name: getCountryById(match.opponent1Id)?.name || "",
          flag: getFlagById(match.opponent1Id),
        },
        opponent2: {
          name: getCountryById(match.opponent2Id)?.name || "",
          flag: getFlagById(match.opponent2Id),
        },
        score: `${match.opponent1score} - ${match.opponent2score}`,
      })),
    [matches]
  );

  return (
    <div className="matchlist-container">
      <div className="matchlist-content">
        {matchDisplayList.length === 0 ? (
          <div className="no-matches text">No matches yet</div>
        ) : (
          matchDisplayList.map((item) => (
            <div key={item.id} className="match-item">
              <div className="teams">
                <span className="team">
                  {item.opponent1.flag && (
                    <img
                      src={item.opponent1.flag}
                      alt="Team1 Flag"
                      className="flag"
                    />
                  )}
                  <span className="text">{item.opponent1.name}</span>
                  <span className="text">&nbsp;&nbsp;vs&nbsp;</span>
                </span>
                <span className="team">
                  {item.opponent2.flag && (
                    <img
                      src={item.opponent2.flag}
                      alt="Team2 Flag"
                      className="flag"
                    />
                  )}
                  <span className="text">{item.opponent2.name}</span>
                </span>
              </div>
              <span className="text">{item.score}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
