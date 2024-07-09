const express = require("express");
const router = express.Router();
const pool = require("../database");
const queries = require("../queries");
const bcrypt = require("bcrypt");

const userSessions = {};

// Buyer Sign-up
router.post("/signup", async (req, res) => {
  const { username, password, name, email } = req.body;

  try {
    const { rows: existingUsers } = await pool.query(
      queries.getUserByUserName,
      [username]
    );
    if (existingUsers.length > 0) {
      return res.status(400).send({
        message: "User already exists. Try again with different credentials",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows: newUser } = await pool.query(queries.addUser, [
      username,
      hashedPassword,
      name,
      email,
    ]);

    const userId = newUser[0].user_id;
    console.log("hello", newUser);

    const { rows: buyerRows } = await pool.query(queries.addBuyer, [userId]);

    console.log(buyerRows);
    if (buyerRows.length > 0) {
      newUser[0].buyer_id = buyerRows[0].buyer_id;

      return res.status(201).send({
        message: "User created successfully",
        user: newUser[0],
      });
    } else {
      throw new Error("Failed to add buyer entry");
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({
      message: "An error occurred while creating the account.",
    });
  }
});

//Login buyer
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const { rows: users } = await pool.query(queries.getUserByUserName, [
      username,
    ]);

    if (users.length === 0) {
      return res.status(400).send({ message: "User does not exist." });
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .send({ Login: false, message: "Incorrect password" });
    }

    const { rows: buyerRows } = await pool.query(queries.getBuyerByUserId, [
      user.user_id,
    ]);

    console.log(buyerRows);
    const buyer_id = buyerRows[0].buyer_id;
    userSessions[user.user_id] = {
      buyer_id,
      user_id: user.user_id,
    };

    return res.status(200).send({
      Loign: true,
      user: {
        user_id: user.user_id,
        username: user.username,
        name: user.name,
        email: user.email,
        buyer_id: buyer_id,
      },
      buyer_id: buyer_id,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ message: "An error occurred during login." });
  }
});

function logoutHandler() {
  const userId = "";
  delete userSessions[userId];
}



// Apply the middleware to the /all route
router.get("/all", async (req, res) => {
  if(userSessions);
  try {
    const creatorResult = await pool.query(queries.findAllCreators);

    if (creatorResult.rows.length === 0) {
      return res.status(404).json({ message: "No Creators found" });
    }

    res.json({ valid: true, creatorResult: creatorResult.rows });
  } catch (err) {
    console.error("Error fetching creators:", err);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
