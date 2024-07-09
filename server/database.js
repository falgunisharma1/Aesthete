const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {rejectUnauthorized: false},
  host: "c6sfjnr30ch74e.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com",
  user: "ude0j2j3i2l58j",
  password: "p1150c3eb427fc70afc5f5763d8bb3cf62428f2a62f0a5eea04ef9735e0269ec9",
  port: 5432,
  database: "d7snnsguvk94aq"
});




module.exports = pool;