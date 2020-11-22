const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

module.exports = async (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(morgan("tiny"));

  // Health-check endpoint
  app.get("/status", (req, res) => {
    res.status(200).end();
  });

  return app;
};
