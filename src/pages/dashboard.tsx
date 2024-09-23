import React, { useEffect, useState } from "react";
import axios from "axios";
import GameDetails from "../interfaces/GameDetails";
import Game from "../interfaces/Game";
import ApiResponse from "../interfaces/ApiResponse";
import GameItem from "../components/gameItem";

interface FetchParams {
  page?: number;
  pageSize?: number;
  filterName?: string;
}

const DashBoard: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(100);
  const [filterName, setFilterName] = useState<string>("");

  const [nameFilter, setNameFilter] = useState("");
  const [minScore, setMinScore] = useState<number | "">("");
  const [orderBy, setOrderBy] = useState("Release Date");
  const [ascending, setAscending] = useState(true);

  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  const fetchGames = async ({ page, pageSize }: FetchParams) => {
    setLoading(true);
    setError(null);

    try {
      let url = `https://spa.api.logicloop.io/api/games?pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
      if (filterName) {
        url += `&filters[name][$containsi]=${filterName}`;
      }
      const response = await axios.get<ApiResponse>(url);
      setGames(response.data.data);
      setFilteredGames(response.data.data);
    } catch (error: any) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = games;
    if (filterName) {
      filtered = filtered.filter((game) =>
        game.attributes.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (minScore !== "" && minScore > 0) {
      filtered = filtered.filter(
        (game) => parseFloat(game.attributes.rating) >= minScore
      );
    }

    filtered = filtered.sort((a, b) => {
      const aValue =
        orderBy === "Release Date"
          ? new Date(a.attributes.firstReleaseDate).getTime()
          : orderBy === "Score"
          ? parseFloat(a.attributes.rating)
          : a.attributes.name.toLowerCase();
      const bValue =
        orderBy === "Release Date"
          ? new Date(b.attributes.firstReleaseDate).getTime()
          : orderBy === "Score"
          ? parseFloat(b.attributes.rating)
          : b.attributes.name.toLowerCase();
      return ascending ? (aValue > bValue ? 1 : -1) : aValue < bValue ? 1 : -1;
    });

    setFilteredGames(filtered);
  };

  const clearFilters = () => {
    setFilterName("");
    setMinScore("");
    setOrderBy("Release Date");
    setAscending(true);
    setFilteredGames(games); // Reset to original games
  };

  //   const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     fetchGames({ page, pageSize, filterName });
  //   };

  //   useEffect(() => {
  //     fetchGames({ page, pageSize });
  //   }, [page, pageSize]);

  useEffect(() => {
    console.log("Start");
    fetchGames({ page, pageSize });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filterName, minScore, orderBy, ascending]);

  return (
    <div>
      {/* <form onSubmit={handleFilterSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Filter by name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 ml-2">
          Search
        </button>
      </form>

      <div className="mb-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="mr-2 p-2 bg-gray-300"
        >
          Previous
        </button>
        <button onClick={() => setPage(page + 1)} className="p-2 bg-gray-300">
          Next
        </button>
      </div> */}

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {loading && <div>Loading...</div>}
      {!loading && !error && (
        <div className="p-4 flex flex-col lg:flex-row gap-x-1">
          <div className="bg-[#0e1a2b] p-6 rounded-lg mb-4 max-h-96">
            <h4 className="text-white font-montserrat font-semibold text-left text-xl mb-4">
              Filter Results
            </h4>
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="filterName"
                className="text-[#c1d1e8] font-mulish text-left flex "
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Name (contains)"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="border border-[#c1d1e8] bg-[#182c47] text-[#c1d1e8] p-2 mb-4 items-start"
              />
            </div>

            <div className="mb-4 flex flex-col">
              <label
                htmlFor="minScore"
                className="text-[#c1d1e8] font-mulish text-left flex "
              >
                Minimum Score
              </label>
              <input
                type="number"
                placeholder="Minimum Score"
                value={minScore}
                onChange={(e) =>
                  setMinScore(e.target.value ? Number(e.target.value) : "")
                }
                className="border border-[#c1d1e8] bg-[#182c47] text-[#c1d1e8] p-2 mb-4"
                min="0"
              />
            </div>

            <div className="flex flex-col lg:flex-col md:flex-row gap-4">
              <div className="flex flex-row w-full">
                <button
                  onClick={() => setAscending(!ascending)}
                  className="text-white mr-2 text-2xl"
                >
                  {ascending ? "⬆️" : "⬇️"}
                </button>

                <select
                  value={orderBy}
                  onChange={(e) => setOrderBy(e.target.value)}
                  className="border border-[#c1d1e8] bg-[#182c47] text-[#c1d1e8] p-2 mb-4 md:mb-0 flex-grow-1 w-full"
                >
                  <option value="Release Date">Release Date</option>
                  <option value="Score">Score</option>
                  <option value="Name">Name</option>
                </select>
              </div>

              <button
                onClick={clearFilters}
                className="bg-[#5692e8] text-white font-montserrat font-semibold px-4 py-2"
              >
                Clear
              </button>
            </div>
          </div>
          <ul>
            {filteredGames.map((game) => (
              <li key={game.id} className="mb-4">
                <GameItem
                  name={game.attributes.name}
                  firstReleaseDate={new Date(game.attributes.firstReleaseDate)}
                  summary={game.attributes.summary}
                  rating={game.attributes.rating}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
