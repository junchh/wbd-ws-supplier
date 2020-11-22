const createMySQLConnection = require("../db");

const getIngredients = async () => {
  const [rows] = await createMySQLConnection().then((conn) => {
    return conn.execute("SELECT `uuid`, `name`, `price` FROM `ingredients`");
  });
  return rows;
};

module.exports = { getIngredients };
