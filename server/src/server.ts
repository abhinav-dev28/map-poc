import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router/mapRouter";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4500;
export const GOOGLE_MAPS_API = process.env.GOOGLE_MAPS_API;

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Server");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
