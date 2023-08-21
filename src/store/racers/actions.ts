import { Racer } from './../../types/Types';
import { createAction } from "@reduxjs/toolkit";

export const fetchRacers = createAction<Racer[]>("racers/fetchRacers");
