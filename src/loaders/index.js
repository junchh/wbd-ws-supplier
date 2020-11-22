const dotenv = require("dotenv");
dotenv.config();

const expressLoader = require("./expressLoader");
const databaseLoader = require("./databaseLoader");

module.exports = async (expressApp) => {
  const connection = await databaseLoader();
  const app = await expressLoader(expressApp);
  return { app, connection };
};
