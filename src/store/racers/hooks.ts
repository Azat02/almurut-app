import { Racer } from './../../types/Types';
import { useAppSelector } from "..";

export const useRacers = (): Racer[] => {
  return useAppSelector((state) => state.racers.racers);
};
