const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database.js");

app.use(express.json());
app.use(cors());

app.post("/newbuyer", (req, res) => {
  const username = req.body["username"];
  const password = req.body["password"];
  const name = req.body["name"];
  const email = req.body["email"];

  console.log(username);
  console.log(name);
  console.log(email);
  console.log(password);

  const insertSTMT = `INSERT INTO buyers (username, name, email, password)
  VALUES ('${username}', '${name}', '${email}', '${password}');
  `;

  pool
    .query(insertSTMT)
    .then((response) => {
      console.log("data saved in buyer table");
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(req.body);
  res.json("response recieved: " + req.body);
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
