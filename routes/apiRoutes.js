// Set Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");


module.exports = function (app) {
  app.use(express.static(path.join(__dirname, "../public")));
  const allNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

  // POST `/api/notes` - receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
  app.post("/api/notes", function (req, res) {
    var newNote = req.body;

    //push new note to the notes history in db.json
    allNotes.push(newNote);

    //write the data to db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(allNotes));
    res.json(allNotes);
  });

  // DELETE `/api/notes/:id` - receive a query parameter containing the id of a note to delete.
  app.delete("/api/notes/:id", function (req, res) {

    // remove 1 element from the array at index of parameter id
    allNotes.splice(req.params.id, 1);

    //write the data to db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(allNotes));
    res.json(allNotes);
  });
};
