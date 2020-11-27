const createMySQLConnection = require("../db");

const getIngredients = async (showPrice) => {
  const [rows] = await createMySQLConnection().then((conn) => {
    if (showPrice) {
      return conn.execute("SELECT `uuid`, `name`, `price`, `expiry_days` FROM `ingredients`");
    } else {
      return conn.execute("SELECT `uuid`, `name`, `expiry_days` FROM `ingredients`");
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

const getExpiryByUuid = async (uuid) => {
  const [rows] = await createMySQLConnection().then((conn) => {
    return conn.execute("SELECT `expiry_days` FROM `ingredients` WHERE `uuid` = ?", [
      uuid,
    ]);
  });
  return rows[0].expiry_days;
};

const getNameByUuid = async (uuid) => {
  const [rows] = await createMySQLConnection().then((conn) => {
    return conn.execute("SELECT `name` FROM `ingredients` WHERE `uuid` = ?", [
      uuid,
    ]);
  });
  return rows[0].name;
};

module.exports = { getIngredients, getPriceByUuid, getExpiryByUuid, getNameByUuid };
