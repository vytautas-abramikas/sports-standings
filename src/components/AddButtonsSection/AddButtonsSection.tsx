import { useStandingsContext } from "../../hooks/useStandingsContext";
import "./AddButtonsSection.scss";
import PlusLogoUrl from "../../assets/plus.svg";

export const AddButtonsSection: React.FC = () => {
  const {
    instanceId,
    setIsAddPlayerModalOpen,
    setIsAddMatchModalOpen,
    setIsSelectTeamModalOpen,
  } = useStandingsContext();

  return (
    <div className={`add-buttons-section ${instanceId}`}>
      <button
        className={`panel-button add-button add-team-button ${instanceId}`}
        onClick={() =>
          instanceId === "wimbledon"
            ? setIsAddPlayerModalOpen(true)
            : setIsSelectTeamModalOpen(true)
        }
      >
        <img
          src={PlusLogoUrl}
          alt="Plus Logo"
          style={{
            height: "1.6rem",
            marginRight: "0.25rem",
          }}
        />
        {instanceId === "wimbledon" ? "Add Player" : "Add Team"}
      </button>

      <button
        className={`panel-button add-button add-score-button ${instanceId}`}
        onClick={() => setIsAddMatchModalOpen(true)}
      >
        <img
          src={PlusLogoUrl}
          alt="Plus Logo"
          style={{
            height: "1.6rem",
            marginRight: "0.25rem",
          }}
        />
        Add Score
      </button>
    </div>
  );
};
