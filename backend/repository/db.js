const { neon } = require("@neondatabase/serverless");
const { drizzle } = require("drizzle-orm/neon-http");
require('dotenv').config()

const connectionURL = process.env.NEON_DATABASE_URL;
const sql = neon(connectionURL);
const db = drizzle(sql);

module.exports = db