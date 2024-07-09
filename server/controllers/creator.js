const express = require('express')
const router = express.Router()
const pool = require('../database'); 
const queries = require('../queries');
const bcrypt = require("bcrypt");


// //GET route to retrieve all the creators

// router.get("/all", async (req, res) => {
//   try {
//     const creatorResult = await pool.query(queries.findAllCreators);
    
//     if (creatorResult.rows.length === 0) {
//       return res.status(404).json({ message: 'No Creators found' });
//     }

//     res.json(creatorResult.rows);
//     console.log(creatorResult.rows)
//   } catch (err) {
//     console.error('Error fetching creators:', err);
//     res.status(500).send('Server Error');
//   }

// });


// GET route to retrieve a creator by ID and list all their content
router.get('/:id', async (req, res) => {
  const creator_id = req.params.id;

  try {
    
    const creatorResult = await pool.query(queries.findCreatorById, [creator_id]);

    if (creatorResult.rows.length === 0) {
      return res.status(404).json({ message: 'Creator not found' });
    }

    const creator = creatorResult.rows[0];
    console.log(creator)

   
    const contentResult = await pool.query(queries.findAllContentBycreator_id, [creator_id]);

    const content = contentResult.rows;

    res.json({
        username: creator.username,
        name: creator.name,
        email: creator.email,
        profile_image: creator.profile_image,
        bio: creator.bio,
        cover_image: creator.cover_image,
        content: content
    });
  } catch (error) {
    console.error('Error retrieving creator and content:', error);
    res.status(500).send('Server Error');
  }
});

// Sign-up route for creator
router.post('/signup', async (req, res) => {
  const { username, password, name, email, profile_image, cover_image, bio } = req.body;

  try {
   
    const { rows: existingUsers } = await pool.query(queries.getUserByUserName, [username]);
    if (existingUsers.length > 0) {
      return res.status(400).send({ message: 'Username already exists. Please choose a different username.' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const { rows: newUser } = await pool.query(queries.addUser, [username, hashedPassword, name, email]);

    
    if (newUser.length > 0) {
      const user_id = newUser[0].user_id;

      // Insert the new creator into the creator table
      const { rows: newCreator } = await pool.query(queries.createNewCreator, [user_id, profile_image, cover_image, bio]);

      if (newCreator.length > 0) {
        const creatorId = newCreator[0].creator_id;

        // Return the successful response
        return res.status(201).send({
          message: 'Creator account created successfully',
          user: {
            creator_id: creatorId,
            username: username,
            name: name,
            email: email,
            profile_image: profile_image,
            cover_image: cover_image,
            bio: bio,
            user_id:user_id
          },
        });
      } else {
        throw new Error('Creator creation failed.');
      }
    } else {
      throw new Error('User creation failed.');
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send({ message: 'An error occurred while creating the account.' });
  }
});


// Login route for creator
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const { rows: users } = await pool.query(queries.getUserByUserName, [username]);

    if (users.length === 0) {
      return res.status(400).send({ message: 'User does not exist.' });
    }

    const user = users[0];
    console.log(user)

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({ Loign: false });
    }

    // Retrieve creator details by user_id
    const { rows: creatorRows } = await pool.query(queries.findCreatorByUserId, [user.user_id]);
    const creator = creatorRows[0];
    console.log(creator)

    if (creator) {
      // Store creator_id in session
      req.session.creator_id = creator.creator_id;

      return res.status(200).send({
        Loign: true,
        user: {
          creator_id: creator.creator_id,
          user_id: creator.user_id,
          username: user.username,
          name: user.name,
          email: user.email,
          profile_image: creator.profile_image,
          cover_image: creator.cover_image,
          bio: creator.bio,
        },
        creator_id: req.session.creator_id,
      });
    } else {
      return res.status(404).send({ message: 'Creator profile not found.' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send({ message: 'An error occurred during login.' });
  }
});

module.exports = router;
