import { useStandingsContext } from "../../hooks/useStandingsContext";
import { StandingsTable } from "../StandingsTable/StandingsTable";
import { AddButtonsSection } from "../AddButtonsSection/AddButtonsSection";
import { AddPlayerModal } from "../AddPlayerModal/AddPlayerModal";
import { AddMatchModal } from "../AddMatchModal/AddMatchModal";
import "./WimbledonLeaguePanel.scss";
import tennisLogoUrl from "../../assets/tennis.svg";

export const WimbledonLeaguePanel: React.FC = () => {
  const { isAddPlayerModalOpen, isAddMatchModalOpen } = useStandingsContext();

  return (
    <div className="league-container wimbledon">
      {isAddPlayerModalOpen && <AddPlayerModal />}
      {isAddMatchModalOpen && <AddMatchModal />}
      <div className="header wimbledon">
        <img
          src={tennisLogoUrl}
          alt="Tennis Logo"
          style={{
            height: "2rem",
            marginRight: "1rem",
          }}
        />
        Wimbledon
      </div>

      <div className="league-content">
        <div className="section wimbledon">
          <AddButtonsSection />
        </div>
        <div className="table-section wimbledon">
          <StandingsTable />
        </div>
      </div>
    </div>
  );
};
