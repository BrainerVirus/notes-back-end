import express from "express";
import { createNote, getNotes } from "../controllers/notesController.js";

const RouterNotes = express.Router();

RouterNotes.post("/create", createNote);
RouterNotes.get("/query", getNotes);

export default RouterNotes;
