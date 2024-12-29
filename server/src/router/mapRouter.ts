import express from "express";
import {
  getAutoComplete,
  getCoordinates,
  getPlaces,
} from "../controller/mapControlller";

const router = express.Router();

router.get("/get-coordinates", getCoordinates);
router.get("/get-autocomplete", getAutoComplete);
router.get("/get-places", getPlaces);

export default router;
