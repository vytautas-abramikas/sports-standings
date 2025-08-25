import { useEffect, useState } from "react";
import { StandingsProvider } from "../../context/StandingsContext";
import { PremierLeaguePanel } from "../PremierLeaguePanel/PremierLeaguePanel";
import "./App.scss";
import type { TContextInstance } from "../../types/types";

const panels: TContextInstance[] = ["premier", "eurobasket", "wimbledon"];

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

  let touchStartX = 0;
  let touchEndX = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX - touchStartX > 50) setCurrent((c) => Math.max(0, c - 1));
    if (touchStartX - touchEndX > 50)
      setCurrent((c) => Math.min(panels.length - visibleCount, c + 1));
  };

  const showLeft = current > 0;
  const showRight = current < panels.length - visibleCount;

  return (
    <div
      className="screen"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {showLeft && (
        <button
          className="carousel-arrow left"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
        >
          &lt;
        </button>
      )}
      <div
        style={{ display: "flex", transition: "transform 0.3s", gap: "1rem" }}
      >
        {panels.slice(current, current + visibleCount).map((instance) => (
          <StandingsProvider key={instance} instanceId={instance}>
            <PremierLeaguePanel />
          </StandingsProvider>
        ))}
      </div>
      {showRight && (
        <button
          className="carousel-arrow right"
          onClick={() =>
            setCurrent((c) => Math.min(panels.length - visibleCount, c + 1))
          }
        >
          &gt;
        </button>
      )}
    </div>
  );
};
