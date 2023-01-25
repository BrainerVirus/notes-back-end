import { describe, expect, test, vi } from "vitest";
import request from "supertest";
import { createNote } from "../controllers/notesController.js";
import { app as server } from "../server.js";

describe("POST Notes", () => {
  test("Should be a function", () => {
    expect(createNote).toBeTypeOf("function");
  });
  test("Creating a note should return a object", async () => {
    const response = await request(server)
      .post("/note/create")
      .set("Accept", "application/json")
      .send({
        content: "Testing note",
      })
      .expect(200);
    expect(response.body).toBeTypeOf("object");
  });
  test("Creating a note successfully should return a status 200", async () => {
    const response = await request(server)
      .post("/note/create")
      .set("Accept", "application/json")
      .send({
        content: "Testing note",
      })
      .expect(200);
    expect(response.body).toBeTypeOf("object");
  });
  test("Creating a note with wrong format should return status 500", async () => {
    const response = await request(server)
      .post("/note/create")
      .set("Accept", "application/json")
      .send({
        text: "Testing note",
        creation: new Date().toLocaleDateString,
      })
      .expect(400);
  });
  test("Posting without text data should return a the following json { code: 3, description: 'One or more fields is missing' }", async () => {
    const response = await request(server)
      .post("/note/create")
      .set("Accept", "application/json")
      .send({})
      .expect(400);
    expect(response.body).toBeTypeOf("object");
    expect(response.body).toEqual({
      code: 3,
      description: "One or more fields is missing",
    });
  });
});

describe("GET Notes", () => {
  test("Getting notes successfully should return object[] with status 200", async () => {
    const response = await request(server).get("/note/query").expect(200);
    expect(response.body);
  });
  test("Getting notes with query should return object[] with status 200", async () => {
    const response = await request(server)
      .get("/note/query?context='Testing note'")
      .expect(200);
    expect(response.body);
  });
  test("Getting notes with query should wrong query should return { code: 4, description: 'Invalid query' } with status 400", async () => {
    const response = await request(server)
      .get("/note/query?_id=test")
      .expect(400);
    expect(response.body).toBeTypeOf("object");
    expect(response.body).toEqual({ code: 4, description: "Invalid query" });
  });
});
