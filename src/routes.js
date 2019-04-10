const express = require("express");
const multer = require("multer");
const configMulter = require("./config/multer");

const routes = express.Router();

const BoxController = require("./controllers/BoxController");
const FileController = require("./controllers/FileController");

routes.get("/", function(req, res) {
  res.send("Well Come Home");
});

routes.get("/boxes/:id", BoxController.show);

// routes.get("/box", (req, res) => {
//   return res.send("Hello Word");
// });

routes.post("/boxes", BoxController.store);

/**
 * .single("file"): onde 'file' é o nome do campo que o front terá que enviar.
 */
routes.post(
  "/boxes/:id/files",
  multer(configMulter).single("file"),
  FileController.store
);

module.exports = routes;
