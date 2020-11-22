const { getIngredients, getPriceByUuid } = require("../services/ingredient");

const router = require("express").Router();

router.post("/", async (req, res) => {
  let { balance, ingredients } = req.body;

  console.log(ingredients);

  try {
    let ingredientsList = [];
    for (const item of ingredients) {
      const qty = item.quantity;
      const uuid = item.uuid;

      const price = await getPriceByUuid(uuid);
      console.log("ssss1", balance);
      balance -= qty * price;
      console.log("ssss2", balance);

      if (balance < 0) {
        throw new Error("Insufficient balance");
      } else {
        const expiryDate = new Date();
        expiryDate.setDate(
          expiryDate.getDate() + 30 + Math.floor(Math.random() * 10) - 5
        );
        ingredientsList.push({ ...item, expiryDate });
      }
    }

    const result = { success: true, balance, ingredientsList };
    return res.json(result);
  } catch (err) {
    const result = { success: false, message: err.stack };
    return res.status(400).json(result);
  }
});

module.exports = router;
