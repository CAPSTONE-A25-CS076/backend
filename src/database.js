const dotenv = require("dotenv");
const postgres = require("postgres");

dotenv.config();

const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
});

module.exports = sql;
