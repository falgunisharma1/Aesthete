const express = require('express')
const router = express.Router()
const pool = require('../database'); 
const queries = require('../queries');



// GET route to retrieve a content by contentId

router.get('/:id', async (req, res)=>{
  const contentId = req.params.id;

  try{
    const contentResult = await pool.query(queries.findContentById, [contentId]);

    if (contentResult.rows.length === 0) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    const content = contentResult.rows[0]

    res.json({
      content:content
    })
  }catch{(err)
      console.log(err)
  }
})


//Create New Content:

router.post("/new", async (req, res) => {
  const { title, description, fileUrl, creatorId, price, sold, buyerId } = req.body;

  try {
    const newContentQuery = await pool.query(queries.createNewContent, [
      title,
      description,
      fileUrl,
      creatorId,
      price || 0.0,
      sold || false,
      buyerId || null
    ]);
  
    res.json({
      message: 'Content created successfully',
      contentId: newContentQuery.rows[0].contentId
    });
  } catch (err) {
    console.error('Error creating content:', err);
    res.status(500).send('Server Error');
  }
});


//Update Content:

router.put('/update/:id', async (req, res)=>{
  const contentId = req.params.id;
  const { title, description, fileUrl, creatorId, price, sold, buyerId } = req.body;
  try{
    await pool.query(queries.updateContentById, [
      title,
      description,
      fileUrl,
      creatorId,
      price || 0.0,
      sold || false,
      buyerId || null,
      contentId
    ]);

    res.json({
      message:"content updated"
    })
  }catch(err){
    console.log(err)
  }
})


//Delete content

router.delete('/:id', async (req, res) => {
  const contentId = req.params.id;

  try {
    const result = await pool.query(queries.deleteContentById, [contentId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json({ message: 'Content deleted successfully' });
  } catch (err) {
    console.error('Error deleting content:', err);
    res.status(500).send('Server Error');
  }
});



module.exports = router;