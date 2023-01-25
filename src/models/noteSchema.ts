import mongoose from "mongoose";
import { Note } from "../types/interfaces.js";
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  creationDate: {
    type: String,
    required: true,
  },
  creationTime: {
    type: String,
    required: true,
  },
});

const noteModel = mongoose.model<Note>("Note", noteSchema);

export default noteModel;
