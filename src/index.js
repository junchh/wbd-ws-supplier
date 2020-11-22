const express = require("express");
const mysql = require("mysql2/promise");
const loaders = require("./loaders");
const connection = require("./db");

loaders(express()).then(async (app) => {
  app.use("/api", require("./routes"));

  app.post("/addtransaction", async (req, res) => {
    let amount = req.body.amount;

    for (const item of req.body.ingredients) {
      const qty = item.quantity;
      const uuid = item.uuid;

      const [
        rows,
      ] = await connection.execute(
        "SELECT `price` FROM `ingredients` WHERE `uuid` = ?",
        [uuid]
      );

      const totalPrice = qty * rows[0].price;

      amount -= totalPrice;
    }

    if (amount >= 0) {
      const result = { status: "success", amount: amount };

      res.json(result);
    } else {
      const result = { status: "failed", needed_amount: -1 * amount };

      res.json(result);
    }
  });

  app.listen(process.env.PORT, async () => {
    console.log(
      `Supplier's Web Service is up and running on port ${process.env.PORT}.`
    );

    // connection = await mysql.createConnection({
    //   host: "localhost",
    //   user: "root",
    //   database: "ws-supplier",
    //   password: "123",
    // });
  });
});
