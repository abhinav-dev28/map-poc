import express from "express";
import { getAutoComplete, getCoordinates } from "../controller/mapControlller";
// import { getAutoComplete, getCoordinates } from "../controller/mapController.ts";

const router = express.Router();

router.get("/get-coordinates", getCoordinates);
router.get("/get-autocomplete", getAutoComplete);

export default router;
