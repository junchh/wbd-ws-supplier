const express = require("express");
const loaders = require("./loaders");

loaders(express()).then(async (app) => {
  app.use("/api", require("./routes"));

  app.listen(process.env.PORT, async () => {
    console.log(
      `Supplier's Web Service is up and running on port ${process.env.PORT}.`
    );
  });
});
