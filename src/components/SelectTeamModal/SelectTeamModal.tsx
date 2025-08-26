import { useState } from "react";
import { useStandingsContext } from "../../hooks/useStandingsContext";
import { EuroBasketCountries } from "../../lib/EuroBasketCountries";
import type { TOpponent } from "../../types/types";
import "./SelectTeamModal.scss";
import CrossLogoUrl from "../../assets/cross.svg";

const allCountries: TOpponent[] = EuroBasketCountries;

export const SelectTeamModal: React.FC = () => {
  const { opponents, opponentError, addOpponent, setIsSelectTeamModalOpen } =
    useStandingsContext();

  const [selectedTeamId, setSelectedTeamId] = useState(0);

  const getAvailableCountries = (
    allCountries: TOpponent[],
    opponents: TOpponent[]
  ): TOpponent[] => {
    const opponentIds = new Set(opponents.map((o) => o.id));
    return allCountries.filter((country) => !opponentIds.has(country.id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success: boolean = addOpponent(
      allCountries.find((country) => country.id === selectedTeamId) as TOpponent
    );
    if (success) {
      setSelectedTeamId(0);
      setIsSelectTeamModalOpen(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content eurobasket">
        <button
          className="modal-close"
          onClick={() => setIsSelectTeamModalOpen(false)}
        >
          <img
            src={CrossLogoUrl}
            alt="Close"
            style={{
              height: "2rem",
            }}
          />
        </button>
        <div className="modal-header eurobasket">Select Team</div>
        <form className="form-row" onSubmit={handleSubmit}>
          <select
            className="select p6o7 eurobasket"
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(Number(e.target.value))}
            style={{ borderColor: opponentError ? "red" : undefined }}
          >
            <option value={0} disabled className="option-placeholder">
              Select Team
            </option>
            {getAvailableCountries(allCountries, opponents).map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          <button type="submit" className="panel-button p1o7 eurobasket">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
