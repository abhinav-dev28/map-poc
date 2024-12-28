import React, { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const GET_SUGGESTION = "http://localhost:4000/api/get-autocomplete";

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
  };

  const handleSearch = () => {
    console.log(location);
  };
  return (
    <div className="flex space-x-2 max-w-2xl mx-auto mt-8">
      <div className="flex-1 flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-2">
        {/* <MapPin className="text-gray-400 w-5 h-5" /> */}
        <input
          type="text"
          name="location"
          onChange={onChangeHandler}
          placeholder="Current Location"
          className="bg-transparent text-white w-full focus:outline-none"
        />
        {suggestions.length > 0 && (
          <div className="absolute z-50 bg-gray-800 text-white w-1/3 mt-10 rounded-lg top-52">
            {suggestions.map((suggestion, index) => (
              <p
                key={index}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                // onClick={() => setLocation(suggestion.description)}
              >
                {suggestion}
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
