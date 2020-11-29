const { getIngredients } = require("../services/ingredient");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const showPrice = req.query["show_price"] === "1";
  const ingredients = await getIngredients(showPrice);
  return res.json(ingredients);
});

module.exports = router;
