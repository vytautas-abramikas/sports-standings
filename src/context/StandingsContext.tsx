import { useState, createContext } from "react";
import type { ReactNode } from "react";
import type {
  TOpponent,
  TMatch,
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

  const getNextId = (list: { id: number }[]) =>
    list.length > 0 ? Math.max(...list.map((item) => item.id)) + 1 : 1;

  const addOpponent = (opponent: TOpponent) => {
    if (!isValidNewOpponent(opponent.name)) {
      setOpponentError(true);
      return;
    }
    setOpponentError(false);
    const newId = opponent.id === 0 ? getNextId(opponents) : opponent.id;
    const newOpponent: TOpponent = { ...opponent, id: newId };
    setOpponents((prev) => [...prev, newOpponent]);
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
      }}
    >
      {children}
    </StandingsContext.Provider>
  );
};
