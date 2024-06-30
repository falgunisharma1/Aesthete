

const queries = {
  findContentById: `SELECT * FROM content WHERE contentId = $1`,
  createNewContent:`INSERT INTO content (title, description, fileUrl, creatorId, price, sold, buyerId)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING contentId;`,
  updateContentById:`UPDATE content
  SET title = $1, description = $2, fileUrl = $3, creatorId = $4, price = $5, sold = $6, buyerId = $7
  WHERE contentId = $8`,
  deleteContentById: `DELETE FROM content WHERE contentId = $1;`,
  createNewCreator:`INSERT INTO creator (username, name, email, password, profileImage, bio, coverImage)
  VALUES ($1, $2, $3, $4, $5, $6, $7)`,
  findCreatorById: `SELECT * FROM creator WHERE creatorId = $1`,
  findAllContentByCreatorId: `SELECT title, fileUrl FROM content WHERE creatorId = $1`,
  createNewBuyer: null,
};

module.exports = queries
