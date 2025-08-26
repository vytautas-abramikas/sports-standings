import { useStandingsContext } from "../../hooks/useStandingsContext";
import { AddOpponentForm } from "../AddOpponentForm/AddOpponentForm";
import "./AddPlayerModal.scss";
import CrossLogoUrl from "../../assets/cross.svg";

export const AddPlayerModal: React.FC = () => {
  const { setIsAddPlayerModalOpen } = useStandingsContext();

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={() => setIsAddPlayerModalOpen(false)}
        >
          <img
            src={CrossLogoUrl}
            alt="Close"
            style={{
              height: "2rem",
            }}
          />
        </button>
        <div className="modal-header">Add Player</div>
        <AddOpponentForm />
      </div>
    </div>
  );
};
