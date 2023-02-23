import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

export default function Home() {
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const LIMIT = 12;

  const getMovies = async () => {
    try {
      const url = new URL("/movies", import.meta.env.VITE_API_URL);
      if (search) {
        url.searchParams.set("search", search);
      }
      if (sort) {
        url.searchParams.set("sort", sort);
      }
      url.searchParams.set("page", page - 1);
      url.searchParams.set("limit", LIMIT);

      const res = await axios.get(url);
      setMovies(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, [sort, page]);

  const renderPagination = () => {
    const markup = [];

    if (page > 1) 
      markup.push(<span onClick={() => setPage(page - 1)} key="prev">&lt;</span>)

    const last = Math.ceil(movies.count / LIMIT);
    for (let i = 1; i <= Math.min(last, 10); i++) {
      const cn = i === page ? "active": "";
      markup.push(<span onClick={() => setPage(i)} key={`page-${i}`} className={cn}>{i}</span>)
    }
    if (last > 10) {
      markup.push(<span onClick={() => setPage(last)} key={`page-${last}`} className={last === page && "active"}>{last}</span>)
    }

    if (page < last)
      markup.push(<span onClick={() => setPage(page + 1)} key="next">&gt;</span>)

    return markup;
  }



  return (
    <>
      <div style={{ textAlign: "center" }}>
        <form id="form">
          <input
            style={{ padding: "0.2rem 0.3rem", font: "inherit" }}
            type="text"
            placeholder="Search"
            id="search"
            className="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              getMovies();
            }}
          >
            <span>GO!</span>
          </button>

          <div className="filter-condition" style={{ marginTop: "1rem" }}>
            <span>View from</span>
            <select
              name=""
              id="select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Default</option>
              <option value="LowToHigh">Low to high</option>
              <option value="HighToLow">High to low</option>
            </select>
          </div>
        </form>
      </div>
      <div className="main">
        {movies === null && <p>Loading...</p>}
        {movies?.length === 0 && <p>No Movie Was Found</p>}
        {movies?.movies?.map((movie) => (
          <MovieCard {...movie} key={movie.id} />
        ))}
      </div>
      {movies?.count > LIMIT && (
        <div className="pagination">{renderPagination()}</div>
      )}
    </>
  );
}
