import { Request, Response, NextFunction } from "express";
import * as db from "../db/db.js";
import { Note } from "../types/interfaces.js";
import noteModel from "../models/noteSchema.js";

export const createNote = async (req: Request, res: Response) => {
  try {
    await db.connection().catch((error) => {
      console.error(error);
      return res
        .status(500)
        .json({ code: 1, description: "db connection has failed" });
    });
    if (!req.body.content)
      return res
        .status(400)
        .json({ code: 3, description: "One or more fields is missing" });

    const date: string = new Date().toLocaleDateString();
    const time: string = new Date().toLocaleTimeString();
    const data: Note = {
      content: req.body.content,
      creationDate: date,
      creationTime: time,
    };

    await noteModel.create(data).catch((error) => {
      console.error(error);
      res.status(500).json({ code: 4, description: "Invalid query" });
    });

    res.status(200).json({ message: "Note creation succesfull" });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ code: 2, description: "Internal error" });
    }
  } finally {
    db.disconnect()
      .then(() => {
        console.info("db disconnection has failed");
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    await db.connection().catch((error) => {
      console.error(error);
      return res
        .status(500)
        .json({ code: 1, description: "db connection has failed" });
    });
    const notes: Object[] = await noteModel.find(req.query).exec();
    res.status(200).json(notes);
  } catch (error) {
    console.error(error as Error);
    if (error instanceof Error && error.name === "CastError") {
      res.status(400).json({ code: 4, description: "Invalid query" });
    } else {
      res.status(500).json({ code: 2, description: "Internal error" });
    }
  } finally {
    db.disconnect()
      .then(() => {
        console.info("db disconnection has failed");
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
