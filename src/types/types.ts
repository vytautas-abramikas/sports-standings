import type { Dispatch, SetStateAction } from "react";

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

export type TStandingsContext = {
  opponents: TOpponent[];
  matches: TMatch[];
  setOpponents: Dispatch<SetStateAction<TOpponent[]>>;
  setMatches: Dispatch<SetStateAction<TMatch[]>>;
};
