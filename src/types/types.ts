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
