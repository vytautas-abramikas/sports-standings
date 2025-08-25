import { useEffect, useState } from "react";
import { StandingsProvider } from "../../context/StandingsContext";
import { PremierLeaguePanel } from "../PremierLeaguePanel/PremierLeaguePanel";
import "./App.scss";
import type { TContextInstance } from "../../types/types";

const panels: TContextInstance[] = ["premier", "eurobasket", "wimbledon"];
const PANEL_WIDTH = 30;
const PANEL_GAP = 2;

export const App: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const updateVisibleCount = () => {
      const { innerWidth: w, innerHeight: h } = window;
      const ratio = w / h;
      if (ratio > 1.7) setVisibleCount(3);
      else if (ratio > 1.3) setVisibleCount(2);
      else setVisibleCount(1);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxCurrent = Math.max(0, panels.length - visibleCount);

  useEffect(() => {
    setCurrent((c) => Math.min(c, maxCurrent));
  }, [visibleCount, maxCurrent]);

  let touchStartX = 0;
  let touchEndX = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX - touchStartX > 50)
      setCurrent((c) => Math.max(0, Math.min(maxCurrent, c - 1)));
    if (touchStartX - touchEndX > 50)
      setCurrent((c) => Math.max(0, Math.min(maxCurrent, c + 1)));
  };

  const showLeft = current > 0;
  const showRight = current < maxCurrent;

  const viewportWidth =
    visibleCount * PANEL_WIDTH + (visibleCount - 1) * PANEL_GAP;

  return (
    <div
      className="screen"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {showLeft && (
        <button
          className="carousel-arrow left"
          onClick={() =>
            setCurrent((c) => Math.max(0, Math.min(maxCurrent, c - 1)))
          }
        >
          &lt;
        </button>
      )}
      <div
        className="carousel-viewport"
        style={{ width: `${viewportWidth}rem` }}
      >
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${current * (PANEL_WIDTH + PANEL_GAP)}rem)`,
          }}
        >
          {panels.map((instance) => (
            <StandingsProvider key={instance} instanceId={instance}>
              <PremierLeaguePanel />
            </StandingsProvider>
          ))}
        </div>
      </div>
      {showRight && (
        <button
          className="carousel-arrow right"
          onClick={() =>
            setCurrent((c) => Math.max(0, Math.min(maxCurrent, c + 1)))
          }
        >
          &gt;
        </button>
      )}
    </div>
  );
};
