import express from "express";
import {
  getAutoComplete,
  getCoordinates,
  getPlaceDetailsById,
  getPlacePhotoById,
  getPlaces,
} from "../controller/mapControlller";

const router = express.Router();

router.get("/get-coordinates", getCoordinates);
router.get("/get-autocomplete", getAutoComplete);
router.get("/get-places", getPlaces);
router.get("/get-placedetail", getPlaceDetailsById);
router.get("/get-placephoto", getPlacePhotoById);

export default router;
