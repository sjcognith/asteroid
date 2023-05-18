import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Home = () => {
  const navigate = useNavigate();
  const [asteroid, setAsteroid] = useState("");

  const handleAsteroidInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAsteroid(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("submit is triggered", asteroid);
    navigate(`/asteroid/${asteroid}`);
  };

  const generateRandomAsteroid = async () => {
    try {
      const apiKey = "y4qAb8iN0zd1h4ABdGiSLqA9vyk6K45Ci5fwGQKY";
      const { data } = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`
      );
      const asteroid = data.near_earth_objects;
      const randomAsteroid = asteroid[generateRandomNumber(0, asteroid.length - 1)].id;
      setAsteroid(randomAsteroid);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAsteroid("");
  }, []);

  const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <Layout>
      <form onSubmit={onSubmit} data-testid="form">
        <div className="flex mt-12 flex-col gap-4 items-center">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-lg">FIND YOUR ASTEROIDS</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
          </div>
          <div className="mt-2 w-1/2">
            <input
              value={asteroid}
              onChange={handleAsteroidInput}
              type="text"
              name="asteroid"
              id="asteroid"
              placeholder="Asteroid ID"
              className="w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button
            disabled={!asteroid}
            type="submit"
            className="rounded-md w-1/2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed"
          >
            View Asteroid
          </button>
          <button
            type="button"
            onClick={generateRandomAsteroid}
            className="rounded-md w-1/2 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Random Asteroid
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Home;
