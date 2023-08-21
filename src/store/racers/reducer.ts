import { Racer } from '../../types/Types';
import { createReducer } from "@reduxjs/toolkit";
import { fetchRacers } from './actions';

interface IRacersState {
  racers: Racer[];
}

export const initialState: IRacersState = {
    racers: [],
};

export default createReducer<IRacersState>(initialState, (buiilder) =>
  buiilder.addCase(fetchRacers, (state, { payload }) => ({
    ...state,
    racers: payload,
  }))
);
