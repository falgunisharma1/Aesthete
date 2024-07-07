const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database.js");




app.use(express.json());
app.use(cors());
const bcrypt = require('bcryptjs');


// =======================================
//              CONTROLLERS
// =======================================



// Import Controllers
const creatorController = require('./controllers/creator');
// const buyerController = require('./controllers/buyer');
const contentController = require('./controllers/content');

// Use Controllers
app.use('/creator', creatorController);
// app.use('/buyer', buyerController);
app.use('/content', contentController);



// =======================================
//              SEED DATA
// =======================================

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

app.post("/newCreator", (req, res) => {
  const { username, name, email, password, profileImage, bio, coverImage } = req.body;

  console.log('Received request body:', req.body); 

  
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.error('Error generating salt:', err);
      return res.status(500).send('Server Error');
    }

    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).send('Server Error');
      }

     
      const insertSTMT = `
        INSERT INTO creator (username, name, email, password, profileImage, bio, coverImage)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `;
      const values = [username, name, email, hashedPassword, profileImage, bio, coverImage];

      // Execute the query using pool.query
      pool.query(insertSTMT, values)
        .then((response) => {
          console.log("Data saved in creator table");
          console.log(response);
          res.json("Response received: " + JSON.stringify(req.body));
        })
        .catch((err) => {
          console.error('Error executing query:', err);
          res.status(500).send('Server Error');
        });
    });
  });
});

app.post("/newContent", (req, res) => {
  const { title, description, fileUrl, creatorId, price, sold, buyerId } = req.body;

  console.log('Received request body:', req.body); 

  const insertSTMT = `
    INSERT INTO content (title, description, fileUrl, creatorId, price, sold, buyerId)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;
  const values = [title, description, fileUrl, creatorId, price || 0.0, sold || false, buyerId || null];

  pool.query(insertSTMT, values)
    .then((response) => {
      console.log("Data saved in content table");
      console.log(response);
      res.json("Response received: " + JSON.stringify(req.body));
    })
    .catch((err) => {
      console.error('Error executing query:', err);
      res.status(500).send('Server Error');
    });
});







app.listen(5000, () => {
  console.log("server started on port 5000");
});
