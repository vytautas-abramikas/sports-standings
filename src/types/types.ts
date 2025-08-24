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

export type TContextInstance = "premier" | "eurobasket" | "wimbledon";

export type TStandingsContext = {
  instanceId: TContextInstance;
  opponents: TOpponent[];
  matches: TMatch[];
  opponentError: boolean;
  addOpponent: (opponent: TOpponent) => void;
  addMatch: (match: TMatch) => void;
};
