import { NextFunction, Response, Request } from "express";
import {
  getAddressCoordinates,
  getAutoCompleteSuggestions,
  getPhysicalActivityPlaces,
} from "../services/mapServices";

export const getCoordinates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   const { address } = req.query;
  const address = "Lucknow";

  try {
    const coordinates = await getAddressCoordinates(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "Coordinates not found" });
  }
};
export const getAutoComplete = async (req: Request, res: Response) => {
  const input: string = req.query.input as string;
  if (!input) {
    res.status(400).json({ error: "Input is required" });
  }
  try {
    const suggestions = await getAutoCompleteSuggestions(input);
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(404).json({ message: "Coordinates not found" });
  }
};
export const getPlaces = async (req: Request, res: Response) => {
  const {
    latitude,
    longitude,
    keyword,
    radius,
    address,
  }: {
    latitude?: string;
    longitude?: string;
    address?: string;
    radius: string;
    keyword: string;
  } = req.query as {
    latitude?: string;
    longitude?: string;
    address?: string;
    radius: string;
    keyword: string;
  };

  try {
    let lat, lng;

    // If address is provided, derive coordinates
    if (address) {
      const coordinates = await getAddressCoordinates(address);
      if (!coordinates) {
        res.status(400).json({ error: "Invalid address provided" });
      }
      lat = coordinates.latitude;
      lng = coordinates.longitude;
    } else {
      lat = latitude!;
      lng = longitude!;
    }

    // Check if either lat/lng or address-derived coordinates exist
    if (!lat || !lng) {
      res.status(400).json({
        error: "Latitude and Longitude or a valid address is required",
      });
    }

    // Check if required fields are missing
    if (!radius || !keyword) {
      res.status(400).json({ error: "Radius and keyword are required" });
    }

    // Fetch places
    const places = await getPhysicalActivityPlaces(lat, lng, radius, keyword);

    if (places.length === 0) {
      res.status(404).json({ message: "No places found" });
    }
    res.status(200).json(places);
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
