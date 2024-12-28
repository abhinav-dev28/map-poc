import axios from "axios";

export const getAddressCoordinates = async (
  address: string
): Promise<{
  ltd: number;
  lng: number;
}> => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    // if (response.data.status === "OK") {
    //   const location = response.data.results[0].geometry.location;
    //   return {
    //     ltd: location.lat,
    //     lng: location.lng,
    //   };
    // } else {
    //   throw new Error("Unable to fetch coordinates");
    // }
    console.log(response.data);
    return {
      ltd: 231,
      lng: 234,
    };
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
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const suggestions = response.data.predictions.map(
        (item: { description: string }) => item.description
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
