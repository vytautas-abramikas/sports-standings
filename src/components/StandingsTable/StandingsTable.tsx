import { useStandingsContext } from "../../hooks/useStandingsContext";
import "./StandingsTable.scss";
import CheckLogoUrl from "../../assets/check.svg";
import CrossLogoUrl from "../../assets/cross.svg";

export const StandingsTable: React.FC = () => {
  const { instanceId, resultsForTable, opponents } = useStandingsContext();

  return (
    <table className={`table ${instanceId}`}>
      <thead>
        <tr>
          <th style={{ textAlign: "left" }}>
            {instanceId === "wimbledon" ? "Player" : "Team"}
          </th>
          {instanceId !== "eurobasket" && (
            <th>{instanceId === "premier" ? "P" : "M"}</th>
          )}
          <th>W</th>
          {instanceId === "premier" && <th>D</th>}
          <th>L</th>
          {instanceId === "eurobasket" && <th>D</th>}
          <th>Pts</th>
        </tr>
      </thead>
      <tbody>
        {resultsForTable.length === 0 ? (
          <tr>
            <td
              colSpan={instanceId === "premier" ? 6 : 5}
              style={{ textAlign: "center" }}
            >
              No teams yet
            </td>
          </tr>
        ) : (
          resultsForTable.map((team) => {
            const opponent = opponents.find((o) => o.id === team.id);
            return (
              <tr key={team.id}>
                <td style={{ textAlign: "left" }}>
                  {opponent ? opponent.name : "Unknown"}
                </td>
                {instanceId !== "eurobasket" && <td>{team.played}</td>}
                <td>
                  {team.wins}
                  {instanceId === "wimbledon" && (
                    <img
                      src={CheckLogoUrl}
                      alt="Check"
                      style={{
                        height: "1rem",
                        marginLeft: "0.25rem",
                      }}
                    />
                  )}
                </td>
                {instanceId === "premier" && <td>{team.draws}</td>}
                <td>
                  {team.losses}
                  {instanceId === "wimbledon" && (
                    <img
                      src={CrossLogoUrl}
                      alt="Cross"
                      style={{
                        height: "1rem",
                        marginBottom: "0.25rem",
                        verticalAlign: "middle",
                      }}
                    />
                  )}
                </td>
                {instanceId === "eurobasket" && <td>{team.draws}</td>}
                <td>{team.points}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};
