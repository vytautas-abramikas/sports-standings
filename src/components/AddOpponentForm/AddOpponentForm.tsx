import { useState } from "react";
import { useStandingsContext } from "../../hooks/useStandingsContext";

export const AddOpponentForm: React.FC = () => {
  const { addOpponent, opponentError } = useStandingsContext();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success: boolean = addOpponent({ id: 0, name: inputValue });
    if (success) setInputValue("");
  };

  return (
    <form className="form-row" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Team Name"
        className="input p5o6"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ borderColor: opponentError ? "red" : undefined }}
      />
      <button type="submit" className="panel-button p1o6">
        Add
      </button>
    </form>
  );
};
