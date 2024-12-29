import React from "react";
import MapCard from "./MapCard";
import GetDirections from "./GetDirection";

const GymPage = () => {
  const userLocation = { lat: 26.8467, lng: 80.9462 }; // Example: Lucknow coordinates
  const gymLocation = { lat: 25.6541, lng: 83.5576 }; // Example: Gym coordinates
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="p-6 space-y-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Gym Name</h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-yellow-500 text-lg">5.0</span>
              <span>(378)</span>
              <span className="text-sm text-gray-400">Open until 10:00 PM</span>
              <span>•</span>
              <span className="text-gray-400">Business Bay, Dubai</span>
              <GetDirections
                userLocation={userLocation}
                gymLocation={gymLocation}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button className="bg-gray-800 p-2 rounded-lg">❤️</button>
            <button className="bg-gray-800 p-2 rounded-lg">Share</button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-3 border gap-4">
          <img
            src="https://via.placeholder.com/500"
            alt="Main"
            className="col-span-2 rounded-lg"
          />
          <div className="flex flex-col gap-4">
            <img
              src="https://via.placeholder.com/150"
              alt="1"
              className="rounded-lg"
            />
            <img
              src="https://via.placeholder.com/150"
              alt="2"
              className="rounded-lg"
            />
            <div className="relative">
              <img
                src="https://via.placeholder.com/150"
                alt="3"
                className="rounded-lg"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                16 Images
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* About Section */}
          <div className="col-span-2 space-y-4">
            <div>
              <h2 className="text-2xl font-bold">About</h2>
              <p className="text-gray-400 mt-2">
                Experienced fitness coach dedicated to helping individuals
                achieve their health and wellness goals. Passionate about
                motivating clients and empowering them to lead active and
                balanced lifestyles.
              </p>
            </div>
            {/* Map */}
            <div className="rounded-lg overflow-hidden">
              <MapCard
                latitude={26.678564919338367}
                longitude={80.98047818562385}
              />
            </div>
            {/* Services */}
            <div className="flex gap-4">
              <span className="px-4 py-2 bg-gray-800 rounded-full">Yoga</span>
              <span className="px-4 py-2 bg-gray-800 rounded-full">Gym</span>
              <span className="px-4 py-2 bg-gray-800 rounded-full">Zumba</span>
            </div>
          </div>

          {/* Booking Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Book your session</h2>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg">Cardio Session</h3>
                <p className="text-gray-400">Sat, 8 June</p>
                <p className="text-gray-400">03:00 AM - 04:00 AM</p>
                <p className="text-orange-500 mt-2">₹450 (15% OFF)</p>
                <button className="w-full bg-orange-500 py-2 rounded-lg mt-4">
                  Book Now
                </button>
              </div>
              {/* Repeat for other sessions */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GymPage;
