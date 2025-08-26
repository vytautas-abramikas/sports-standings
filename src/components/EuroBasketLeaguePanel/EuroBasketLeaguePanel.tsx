import { useStandingsContext } from "../../hooks/useStandingsContext";
import { StandingsTable } from "../StandingsTable/StandingsTable";
import "./EuroBasketLeaguePanel.scss";
import basketballLogoUrl from "../../assets/basketball.svg";
import { AddButtonsSection } from "../AddButtonsSection/AddButtonsSection";
import { SelectTeamModal } from "../SelectTeamModal/SelectTeamModal";

export const EuroBasketLeaguePanel: React.FC = () => {
  const { isSelectTeamModalOpen } = useStandingsContext();

  return (
    <div className="league-container eurobasket">
      {isSelectTeamModalOpen && <SelectTeamModal />}
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
        <div className="table-section eurobasket">
          <StandingsTable />
        </div>
      </div>
    </div>
  );
};
