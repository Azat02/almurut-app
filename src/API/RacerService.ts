import { useAppDispatch } from './../store/index';
import { fetchRacers } from './../store/racers/actions';
import { Racer } from './../types/Types';
import axios from "axios";

const API_BASE_URL = "https://devapi.almurut.com/api/test";

export const fetchRacer = async (page: number) => {
  try {
    const dispatch = useAppDispatch()
    const response = await axios.get(`${API_BASE_URL}/racers/?page=${page}`);
    const newRacers: Racer[] = response.data.results;
    dispatch(fetchRacers(newRacers))
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};