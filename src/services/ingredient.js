const createMySQLConnection = require("../db");

const getIngredients = async (showPrice) => {
  const [rows] = await createMySQLConnection().then((conn) => {
    if (showPrice) {
      return conn.execute("SELECT `uuid`, `name`, `price` FROM `ingredients`");
    } else {
      return conn.execute("SELECT `uuid`, `name` FROM `ingredients`");
    }
  });
  return rows;
};

const getPriceByUuid = async (uuid) => {
  const [rows] = await createMySQLConnection().then((conn) => {
    return conn.execute("SELECT `price` FROM `ingredients` WHERE `uuid` = ?", [
      uuid,
    ]);
  });
  return rows[0].price;
};

module.exports = { getIngredients, getPriceByUuid };
