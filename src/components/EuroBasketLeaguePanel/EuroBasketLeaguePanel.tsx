import { useStandingsContext } from "../../hooks/useStandingsContext";
import { MatchList } from "../MatchList/MatchList";
import { StandingsTable } from "../StandingsTable/StandingsTable";
import "./EuroBasketLeaguePanel.scss";
import basketballLogoUrl from "../../assets/basketball.svg";
import { AddButtonsSection } from "../AddButtonsSection/AddButtonsSection";
import { SelectTeamModal } from "../SelectTeamModal/SelectTeamModal";
import { AddMatchModal } from "../AddMatchModal/AddMatchModal";

export const EuroBasketLeaguePanel: React.FC = () => {
  const { isSelectTeamModalOpen, isAddMatchModalOpen } = useStandingsContext();

  return (
    <div className="league-container eurobasket">
      {isSelectTeamModalOpen && <SelectTeamModal />}
      {isAddMatchModalOpen && <AddMatchModal />}
      <div className="header eurobasket">
        <img
          src={basketballLogoUrl}
          alt="Basketball Logo"
          style={{
            height: "2rem",
            marginRight: "1rem",
          }}
        />
        EUROBASKET
      </div>

      <div className="league-content">
        <div className="section eurobasket-buttons">
          <AddButtonsSection />
        </div>
        <div className="section eurobasket matchlist">
          <MatchList />
        </div>
        <div className="table-section eurobasket">
          <div className="table-title">Score Table:</div>
          <StandingsTable />
        </div>
      </div>
    </div>
  );
};
