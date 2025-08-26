import { useState } from "react";
import { useStandingsContext } from "../../hooks/useStandingsContext";
import "./AddOpponentForm.scss";

export const AddOpponentForm: React.FC = () => {
  const {
    instanceId,
    addOpponent,
    opponentError,
    setIsAddPlayerModalOpen,
    isAddPlayerModalOpen,
  } = useStandingsContext();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed: string = inputValue.trim();
    const success: boolean = addOpponent({ id: 0, name: trimmed });
    if (success) {
      setInputValue("");
      if (instanceId === "wimbledon" && isAddPlayerModalOpen)
        setIsAddPlayerModalOpen(false);
    }
  };

  return (
    <form className="form-row" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={`${
          instanceId === "wimbledon" ? "Player Name" : "Team Name"
        }`}
        className={`input p6o7 ${instanceId}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ borderColor: opponentError ? "red" : undefined }}
      />
      <button type="submit" className={`panel-button p1o7 ${instanceId}`}>
        Add
      </button>
    </form>
  );
};
