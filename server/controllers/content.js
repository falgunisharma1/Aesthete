const express = require('express')
const router = express.Router()
const pool = require('../database'); 
const queries = require('../queries');



// GET route to retrieve a content by content_id

router.get('/:id', async (req, res)=>{
  const content_id = req.params.id;

  try{
    const contentResult = await pool.query(queries.findContentById, [content_id]);

    if (contentResult.rows.length === 0) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    const content = contentResult.rows[0]
    console.log(content)

    res.json({
      content_id: content.content_id,
      title: content.title,
      description: content.description,
      file_url: content.file_url,
      creator_id: content.creator_id,
      price: content.price,
      sold: content.sold,
      buyer_id: content.buyer_id
    })
  }catch{(err)
      console.log(err)
  }
})


//Create New Content:

router.post("/new/:creator_id", async (req, res) => {
  const { title, description, file_url, price, sold, buyer_id, creator_id } = req.body;

  try {
    const newContentQuery = await pool.query(queries.createNewContent, [
      title,
      description,
      file_url,
      price || 0.0,
      sold || false,
      buyer_id || null,
      creator_id
    ]);
  
    res.json({
      message: 'Content created successfully',
      content_id: newContentQuery.rows[0].content_id
    });
  } catch (err) {
    console.error('Error creating content:', err);
    res.status(500).send('Server Error');
  }
});


//Update Content:

router.put('/update/:id', async (req, res)=>{
  const content_id = req.params.id;
  const { title, description, file_url, price, creator_id} = req.body;
  try{
    await pool.query(queries.updateContentById, [
      title,
      description,
      file_url,
      price || 0.0,
      creator_id,
      content_id
    ]);

    console.log("done")

    res.json({
      message:"content updated"
    })
  }catch(err){
    console.log(err)
  }
})


//Delete content

router.delete('/delete/:id', async (req, res) => {
  const content_id = req.params.id;

  try {
    const result = await pool.query(queries.deleteContentById, [content_id]);

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