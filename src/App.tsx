import React, { useState, useEffect } from "react";
import axios from "axios";
import Users from "./components/User/UserItem";
import { Pagination, Stack } from "@mui/material";

export interface Racer {
  id: number;
  name: string;
  speed: number;
}

// const ITEMS_PER_PAGE = 50;

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
    const apiUrl: string = `https://devapi.almurut.com/api/test/racers/?page=${currentPage}`;
    setLoading(true);
    if (fetching) {
      fetchRacers(apiUrl).then((allRacers: Racer[]) => {
        setRacers(allRacers);
        setCurrentPage((prevState) => prevState + 1);
        setLoading(false);
      });
    }
  }, [currentPage, fetching]);

  useEffect(() => {
    document.addEventListener('scroll', ScrollHandler)
    return function () {
        document.removeEventListener('scroll', ScrollHandler )
    }
  }, [])

  const ScrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  //   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  //   const endIndex = startIndex + ITEMS_PER_PAGE;
  //   const racersToDisplay = racers.slice(startIndex, endIndex);

//   const handlePageChange = (
//     event: React.ChangeEvent<unknown>,
//     page: number
//   ) => {
//     setCurrentPage(page);
//   };

  return (
    <div>
      {racers.map((racer, index) => (
        <Users
          key={racer.id}
          racer={racer}
          index={(currentPage - 1) * 100 + index}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
      {isLoading && <h1>Loading...</h1>}
      {/* <div>
        <Pagination
          count={4210002}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div> */}
    </div>
  );
}

export default App;
