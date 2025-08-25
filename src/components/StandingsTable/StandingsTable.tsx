import { useStandingsContext } from "../../hooks/useStandingsContext";

export const StandingsTable: React.FC = () => {
  const { resultsForTable, opponents } = useStandingsContext();

  return (
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
        {resultsForTable.length === 0 ? (
          <tr>
            <td colSpan={6} style={{ textAlign: "center" }}>
              No teams yet
            </td>
          </tr>
        ) : (
          resultsForTable.map((team) => {
            const opponent = opponents.find((o) => o.id === team.id);
            return (
              <tr key={team.id}>
                <td>{opponent ? opponent.name : "Unknown"}</td>
                <td>{team.played}</td>
                <td>{team.wins}</td>
                <td>{team.draws}</td>
                <td>{team.losses}</td>
                <td>{team.points}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};
