import React from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import GymCard from "./components/GymCard";

const App = () => {
  // Mock data - replace with actual API calls
  const gyms = [
    {
      id: "1",
      name: "Fitness First",
      location: "Business Bay, Dubai",
      rating: 4.7,
      reviewCount: 378,
      distance: 5,
      openingTime: "11:00 AM",
      categories: ["Gym", "Yoga"],
      images: ["/api/placeholder/400/300"],
      amenities: ["Parking", "Shower", "Lockers"],
    },
    {
      id: "2",
      name: "Fitness First",
      location: "Business Bay, Dubai",
      rating: 4.7,
      reviewCount: 378,
      distance: 5,
      openingTime: "11:00 AM",
      categories: ["Gym", "Yoga"],
      images: ["/api/placeholder/400/300"],
      amenities: ["Parking", "Shower", "Lockers"],
    },
    // Add more gym data as needed
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
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
          {gyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
