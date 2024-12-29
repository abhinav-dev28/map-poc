import React, { useState } from "react";
import axios from "axios";
import { GET_SUGGESTION } from "../utils/API";
import { fetchData } from "../utils/fetchData";

const SearchBar = () => {
  const [location, setLocation] = useState(null);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // const [coordinates, setCoordinates] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChangeHandler = async (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setSuggestions([]);
      return;
    }
    const response = await axios.get(GET_SUGGESTION, {
      params: { input: e.target.value },
    });
    setSuggestions(response.data);
    setShowSuggestions(true);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = position.coords;
          // const latitude = position.coords.latitude;
          // const longitude = position.coords.longitude;
          setInput("Current Location");
          // setCoordinates(coordinates);
          setLocation(coordinates);
          console.log("Current Location:", coordinates);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to fetch location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSearch = async () => {
    try {
      const data = await fetchData(GET_PLACES, {
        latitude: location.latitude,
        longitude: location.longitude,
        radius: 5000,
        keyword: "gym",
      });
      setGyms(data);
    } catch (error) {
      console.error("Error fetching gyms:", error);
    }
  };
  return (
    <div className="flex space-x-2 max-w-2xl mx-auto mt-8">
      <div className="flex-1 flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-2">
        {/* <MapPin className="text-gray-400 w-5 h-5" /> */}
        <input
          type="text"
          name="location"
          value={input}
          onChange={onChangeHandler}
          placeholder="Current Location"
          className="bg-transparent text-white w-full focus:outline-none"
        />
        <button
          className="bg-white p-2 rounded-lg"
          onClick={handleCurrentLocation}
        >
          <img
            src="/marker.png"
            alt="marker"
            className="w-7 h-7 object-contain hover:scale-125"
          />
        </button>
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 bg-gray-800 text-white w-1/3 mt-10 rounded-lg top-52">
            {suggestions.map((suggestion) => (
              <p
                key={suggestion.place_id}
                className="px-4 py-2 hover:bg-gray-700 border-b cursor-pointer"
                onClick={() => {
                  setLocation(suggestion);
                  setInput(suggestion.description);
                  setShowSuggestions(false);
                  // console.log(location, suggestion);
                }}
              >
                {suggestion.description}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-2">
        {/* <Calendar className="text-gray-400 w-5 h-5" /> */}
        <input
          type="text"
          placeholder="Any Date"
          className="bg-transparent text-white w-32 focus:outline-none"
        />
      </div>
      <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-2">
        {/* <Clock className="text-gray-400 w-5 h-5" /> */}
        <input
          type="text"
          placeholder="Any Time"
          className="bg-transparent text-white w-32 focus:outline-none"
        />
      </div>
      <button
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
