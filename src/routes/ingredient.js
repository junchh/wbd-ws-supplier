const { getIngredients } = require("../services/ingredient");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const ingredients = await getIngredients();
  return res.json(ingredients);
});

module.exports = router;
