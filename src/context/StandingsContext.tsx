import { useState, createContext, useMemo } from "react";
import type { ReactNode } from "react";
import type {
  TOpponent,
  TMatch,
  TOpponentStats,
  TContextInstance,
  TStandingsContext,
} from "../types/types";

export const StandingsContext = createContext<TStandingsContext | null>(null);

export const StandingsProvider: React.FC<{
  instanceId: TContextInstance;
  children: ReactNode;
}> = ({ instanceId, children }) => {
  const [opponents, setOpponents] = useState<TOpponent[]>([]);
  const [matches, setMatches] = useState<TMatch[]>([]);
  const [opponentError, setOpponentError] = useState<boolean>(false);

  const resultsForTable = useMemo(() => {
    const statsMap: { [key: number]: TOpponentStats } = {};
    opponents.forEach((opponent) => {
      statsMap[opponent.id] = {
        id: opponent.id,
        played: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        points: 0,
      };
    });
    matches.forEach((match) => {
      const opponent1Stats = statsMap[match.opponent1Id];
      const opponent2Stats = statsMap[match.opponent2Id];
      if (opponent1Stats && opponent2Stats) {
        opponent1Stats.played += 1;
        opponent2Stats.played += 1;
        if (match.opponent1score > match.opponent2score) {
          opponent1Stats.wins += 1;
          opponent1Stats.points += 3;
          opponent2Stats.losses += 1;
        } else if (match.opponent1score < match.opponent2score) {
          opponent2Stats.wins += 1;
          opponent2Stats.points += 3;
          opponent1Stats.losses += 1;
        } else {
          opponent1Stats.draws += 1;
          opponent2Stats.draws += 1;
          opponent1Stats.points += 1;
          opponent2Stats.points += 1;
        }
      }
    });
    return Object.values(statsMap).sort((a, b) => b.points - a.points);
  }, [opponents, matches]);

  const getNextId = (list: { id: number }[]) =>
    list.length > 0 ? Math.max(...list.map((item) => item.id)) + 1 : 1;

  const addOpponent = (opponent: TOpponent): boolean => {
    if (!isValidNewOpponent(opponent.name)) {
      setOpponentError(true);
      return false;
    }
    setOpponentError(false);
    const newId = getNextId(opponents);
    const newOpponent: TOpponent = { ...opponent, id: newId };
    setOpponents((prev) => [...prev, newOpponent]);
    return true;
  };

  const isValidNewOpponent = (name: string) => {
    if (name === "") {
      return false;
    }
    const exists = opponents.some(
      (opponent) => opponent.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) {
      return false;
    }
    return true;
  };

  const isValidScore = (score: number) => Number.isInteger(score) && score >= 0;

  const addMatch = (match: TMatch) => {
    const newId = match.id === 0 ? getNextId(matches) : match.id;
    const newMatch: TMatch = { ...match, id: newId };
    setMatches((prev) => [...prev, newMatch]);
  };

  return (
    <StandingsContext.Provider
      value={{
        instanceId,
        opponents,
        matches,
        opponentError,
        addOpponent,
        addMatch,
        resultsForTable,
      }}
    >
      {children}
    </StandingsContext.Provider>
  );
};
