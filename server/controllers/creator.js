const express = require('express')
const router = express.Router()
const pool = require('../database'); 
const queries = require('../queries');

// GET route to retrieve a creator by ID and list all their content
router.get('/:id', async (req, res) => {
  const creatorId = req.params.id;

  try {
    
    const creatorResult = await pool.query(queries.findCreatorById, [creatorId]);

    if (creatorResult.rows.length === 0) {
      return res.status(404).json({ message: 'Creator not found' });
    }

    const creator = creatorResult.rows[0];

   
    const contentResult = await pool.query(queries.findAllContentByCreatorId, [creatorId]);

    const content = contentResult.rows;

    res.json({
      creator: {
        username: creator.username,
        name: creator.name,
        email: creator.email,
        profileImage: creator.profileImage,
        bio: creator.bio,
        coverImage: creator.coverImage
      },
      content: content
    });
  } catch (error) {
    console.error('Error retrieving creator and content:', error);
    res.status(500).send('Server Error');
  }
});


//POST route for updating the creator info 

module.exports = router;
