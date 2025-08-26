export type TOpponent = {
  id: number;
  name: string;
};

export type TMatch = {
  id: number;
  opponent1Id: number;
  opponent2Id: number;
  opponent1score: number;
  opponent2score: number;
};

export type TOpponentStats = {
  id: number;
  played: number;
  wins: number;
  losses: number;
  draws: number;
  points: number;
};

export type TContextInstance = "premier" | "eurobasket" | "wimbledon";

export type TMatchError = {
  home: boolean;
  away: boolean;
  homeScore: boolean;
  awayScore: boolean;
};

export type TStandingsContext = {
  instanceId: TContextInstance;
  opponents: TOpponent[];
  matches: TMatch[];
  opponentError: boolean;
  matchError: TMatchError;
  resultsForTable: TOpponentStats[];
  isAddPlayerModalOpen: boolean;
  isAddMatchModalOpen: boolean;
  isSelectTeamModalOpen: boolean;
  setMatchError: (error: TMatchError) => void;
  addOpponent: (opponent: TOpponent) => boolean;
  addMatch: (match: TMatch) => boolean;
  setIsAddPlayerModalOpen: (isOpen: boolean) => void;
  setIsAddMatchModalOpen: (isOpen: boolean) => void;
  setIsSelectTeamModalOpen: (isOpen: boolean) => void;
};
