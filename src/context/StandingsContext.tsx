import { useState, createContext, useMemo, useEffect } from "react";
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
  const [opponents, setOpponents] = useState<TOpponent[]>(() => {
    const stored = localStorage.getItem(`opponents_${instanceId}`);
    return stored ? JSON.parse(stored) : [];
  });
  const [matches, setMatches] = useState<TMatch[]>(() => {
    const stored = localStorage.getItem(`matches_${instanceId}`);
    return stored ? JSON.parse(stored) : [];
  });
  const [opponentError, setOpponentError] = useState<boolean>(false);
  const [matchError, setMatchError] = useState({
    home: false,
    away: false,
    homeScore: false,
    awayScore: false,
  });
  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] =
    useState<boolean>(false);
  const [isAddMatchModalOpen, setIsAddMatchModalOpen] =
    useState<boolean>(false);
  const [isSelectTeamModalOpen, setIsSelectTeamModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(`opponents_${instanceId}`, JSON.stringify(opponents));
    localStorage.setItem(`matches_${instanceId}`, JSON.stringify(matches));
  }, [opponents, matches, instanceId]);

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
    const trimmedName =
      opponent.name.length > 22 ? opponent.name.slice(0, 22) : opponent.name;

    if (!isValidNewOpponent(trimmedName)) {
      setOpponentError(true);
      return false;
    }
    setOpponentError(false);
    const newId = opponent.id ? opponent.id : getNextId(opponents);
    const newOpponent: TOpponent = { id: newId, name: trimmedName };
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

  const addMatch = (match: TMatch): boolean => {
    if (!isValidMatch(match)) {
      return false;
    }
    const newId = getNextId(matches);
    const newMatch: TMatch = { ...match, id: newId };
    setMatches((prev) => [...prev, newMatch]);
    return true;
  };

  const isValidMatch = (match: TMatch) => {
    const { opponent1Id, opponent2Id, opponent1score, opponent2score } = match;
    let valid = true;
    const error = {
      home: false,
      away: false,
      homeScore: false,
      awayScore: false,
    };

    if (opponent1Id === 0 || opponent2Id === 0) {
      error.home = opponent1Id === 0;
      error.away = opponent2Id === 0;
      valid = false;
    }

    if (!opponent1score && opponent1score !== 0) {
      error.homeScore = true;
      valid = false;
    }
    if (!opponent2score && opponent2score !== 0) {
      error.awayScore = true;
      valid = false;
    }
    if (opponent1score && opponent1score > 999) {
      error.homeScore = true;
      valid = false;
    }
    if (opponent2score && opponent2score > 999) {
      error.awayScore = true;
      valid = false;
    }

    setMatchError(error);
    return valid;
  };

  return (
    <StandingsContext.Provider
      value={{
        instanceId,
        opponents,
        matches,
        opponentError,
        matchError,
        resultsForTable,
        isAddPlayerModalOpen,
        isAddMatchModalOpen,
        isSelectTeamModalOpen,
        setMatchError,
        addOpponent,
        addMatch,
        setIsAddPlayerModalOpen,
        setIsAddMatchModalOpen,
        setIsSelectTeamModalOpen,
      }}
    >
      {children}
    </StandingsContext.Provider>
  );
};
