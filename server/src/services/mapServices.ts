import axios from "axios";

export const getAddressCoordinates = async (
  address: string
): Promise<{
  latitude: string;
  longitude: string;
}> => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAutoCompleteSuggestions = async (
  input: string
): Promise<string[]> => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&components=country:in&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const suggestions = response.data.predictions.map(
        (item: { description: string; place_id: string }) => ({
          description: item.description,
          place_id: item.place_id,
        })
      );
      return suggestions;
    } else {
      throw new Error(`Error from API: ${response.data.status}`);
    }
  } catch (error: any) {
    console.error("Error fetching autocomplete suggestions:", error.message);
    throw new Error("Failed to fetch autocomplete suggestions.");
  }
};

export const getPhysicalActivityPlaces = async (
  latitude: string,
  longitude: string,
  radius: string,
  keyword: string
) => {
  const apiKey = process.env.GOOGLE_MAPS_API;

  //   Fetching Places based on coordinates
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=${encodeURIComponent(
    keyword
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const places = response.data.results.map((place: any) => ({
        name: place.name,
        placeId: place.place_id,
        address: place.vicinity || "Address not available",
        reviewCount: place.user_ratings_total || 0,
        rating: place.rating || "Rating not available",
        image: place.photos
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`
          : "No image available",
        isOpen:
          place.opening_hours?.open_now !== undefined
            ? place.opening_hours.open_now
              ? "Open now"
              : "Closed now"
            : "Opening hours not available",
      }));

      return places.length > 0 ? places : [];
    } else if (response.data.status === "ZERO_RESULTS") {
      return [];
    } else {
      throw new Error(`API Error: ${response.data.status}`);
    }
  } catch (error: any) {
    console.error("Error fetching places:", error.message);
    throw error;
  }
};
