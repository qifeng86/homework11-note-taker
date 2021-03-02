// DEPENDENCIES
const path = require("path");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

module.exports = function (app) {

  // ================================================================================
  // ROUTER
  // The below points our server to a series of "route" files.
  // These routes give our server a "map" of how to respond when users visit or request data from various URLs.
  // ================================================================================


  // GET `/notes` - return the `notes.html` file.
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });



  // GET `/api/notes` - read the `db.json` file and return all saved notes as JSON.
  app.get("/api/notes", function (req, res) {

    async function getFile() {
      try {
        const data = await readFile((path.join(__dirname, "../db/db.json")), 'utf8');
        res.json(JSON.parse(data))
      } catch (err) {
        console.log('Error', err);
      }
    }
    getFile();

  });


  // GET `*` - return the `index.html` file
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};