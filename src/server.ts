import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import * as db from "./db/db.js";
import RouterNotes from "./routes/RoutesNotes.js";

export const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/note", RouterNotes);

app.get("/", (_req, _res) => {
  db.connection();
  _res.send("you are in home...");
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
