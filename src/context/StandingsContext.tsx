import { useState, createContext } from "react";
import type { TOpponent, TMatch, TStandingsContext } from "../types/types";

export const StandingsContext = createContext<TStandingsContext | null>(null);

const [opponents, setOpponents] = useState<TOpponent[]>([]);
const [matches, setMatches] = useState<TMatch[]>([]);
