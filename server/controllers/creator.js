const express = require('express')
const router = express.Router()
const pool = require('../database'); 
const queries = require('../queries');


//GET route to retrieve all the creators

router.get("/all", async (req, res) => {
  try {
    const creatorResult = await pool.query(queries.findAllCreators);
    
    if (creatorResult.rows.length === 0) {
      return res.status(404).json({ message: 'No Creators found' });
    }

    res.json(creatorResult.rows);
  } catch (err) {
    console.error('Error fetching creators:', err);
    res.status(500).send('Server Error');
  }

});


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


//POST route for updating the creator info 

module.exports = router;
