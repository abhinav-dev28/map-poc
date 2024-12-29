import React from "react";
import { Link } from "react-router-dom";

const GymCard = ({ gym }) => {
  const handleBook = () => {
    console.log(gym.placeId);
  };
  return (
    <div className="relative bg-slate-800 rounded-lg overflow-hidden shadow-md text-white">
      <img
        src={gym.image}
        alt={gym.name}
        className="w-full h-48 object-cover"
      />
      <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white">
        {/* <Heart className="w-5 h-5 text-gray-600" /> */}
      </button>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{gym.name}</h3>
            <div className="flex items-center space-x-1 text-sm text-white">
              {/* <MapPin className="w-4 h-4" /> */}
              <span>{gym.address}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">⚡</span>
            <span className="font-semibold">{gym?.rating}</span>
            <span>({gym?.reviewCount})</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm">Opens at {gym?.isOpen}</div>
          <Link
            to={`/gym/${gym.placeId}`}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleBook}
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GymCard;
