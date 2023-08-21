import React, { useState, useEffect } from "react";
import axios from "axios";
import Users from "./components/User/UserItem";
import { MainWrapper } from "./components/User/style";
import { Racer } from "./types/Types";
import Loader from "./components/Loader";



function App(): JSX.Element {
  const [racers, setRacers] = useState<Racer[]>([]);
  const [selected, setSelected] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchRacers = async (url: string): Promise<Racer[]> => {
    try {
      const response = await axios.get(url);
      const newRacers: Racer[] = response.data.results;
      setFetching(false);
      return newRacers;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  useEffect(() => {
    if (isLoading) return;
    if (fetching) {
      const apiUrl: string = `https://devapi.almurut.com/api/test/racers/?page=${currentPage}`;
      setLoading(true);
      fetchRacers(apiUrl).then((allRacers: Racer[]) => {
        setRacers([...racers, ...allRacers]);
        setCurrentPage((prevState) => prevState + 1);
        setLoading(false);
      });
    }
  }, [currentPage, fetching]);

  useEffect(() => {
    document.addEventListener("scroll", ScrollHandler);
    return function () {
      document.removeEventListener("scroll", ScrollHandler);
    };
  }, []);

  const ScrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  return (
    <MainWrapper>
      {racers.map((racer, index) => (
        <Users
          key={racer.id}
          racer={racer}
          index={index}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
      {isLoading && <Loader/> }
    </MainWrapper>
  );
}

export default App;