import React, { useEffect, useState } from "react";
import GymCard from "./GymCard";
import SearchBar from "./SearchBar";
import { GET_PLACES } from "../utils/API";
import { fetchData } from "../utils/fetchData";

const Home = () => {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const address = "Lucknow";

  useEffect(() => {
    const fetchGyms = async () => {
      setLoading(true);
      try {
        const data = await fetchData(GET_PLACES, {
          latitude: 20.5937,
          longitude: 78.9629,
          radius: 5000,
          keyword: "gym",
        });
        setGyms(data);
      } catch (error) {
        console.error("Error fetching gyms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGyms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <main className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Workout & Live Sessions</h1>
          <p className="text-gray-600 text-lg">
            Curated by a team of fitness coaches for everybody, every mood,
            every goal
          </p>
        </div>
        <SearchBar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {loading ? (
            <div className="text-center text-white text-2xl font-semibold">
              Loading...
            </div>
          ) : (
            gyms.map((gym) => <GymCard key={gym.placeId} gym={gym} />)
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
