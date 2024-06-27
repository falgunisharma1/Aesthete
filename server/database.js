const { Pool } = require("pg");

const pool = new Pool({
  user: "falgunisharma",
  password: "harsh",
  host: "localhost",
  port: 5432,
  database: "aesthete"
});

// const createTblQry = `CREATE TABLE buyers (
//   buyerId SERIAL PRIMARY KEY,
//   username VARCHAR(100) NOT NULL UNIQUE,
//   name VARCHAR(100) NOT NULL,
//   email VARCHAR(100) NOT NULL UNIQUE,
//   password VARCHAR(500) NOT NULL
// );`

// pool
//   .query(createTblQry)
//   .then((response) => {
//     console.log(response);
//     console.log("buyer table created");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = pool;
