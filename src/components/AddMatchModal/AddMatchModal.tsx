import { useStandingsContext } from "../../hooks/useStandingsContext";
import { AddMatchForm } from "../AddMatchForm/AddMatchForm";
import "./AddMatchModal.scss";
import CrossLogoUrl from "../../assets/cross.svg";

export const AddMatchModal: React.FC = () => {
  const { instanceId, setIsAddMatchModalOpen } = useStandingsContext();

  return (
    <div className="modal-backdrop">
      <div className={`modal-content ${instanceId}`}>
        <button
          className="modal-close"
          onClick={() => setIsAddMatchModalOpen(false)}
        >
          <img
            src={CrossLogoUrl}
            alt="Close"
            style={{
              height: "2rem",
            }}
          />
        </button>
        <div className="modal-header">Add Match</div>
        <AddMatchForm />
      </div>
    </div>
  );
};
