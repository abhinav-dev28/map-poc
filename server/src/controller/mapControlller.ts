import { NextFunction, Response, Request } from "express";
import {
  getAddressCoordinates,
  getAutoCompleteSuggestions,
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
