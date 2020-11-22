const createMySQLConnection = require("../db");

const getIngredients = async () => {
  const [rows] = await createMySQLConnection().then((conn) => {
    return conn.execute("SELECT `uuid`, `name`, `price` FROM `ingredients`");
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
