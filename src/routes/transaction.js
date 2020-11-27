const { getPriceByUuid, getExpiryByUuid } = require("../services/ingredient");

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
      balance -= qty * price;

      if (balance < 0) {
        throw new Error("Insufficient balance");
      } else {
        const expiryDate = new Date();
        const expiryDays = await getExpiryByUuid(uuid);
        expiryDate.setDate(
          expiryDate.getDate() + expiryDays
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
