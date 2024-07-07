const queries = {
  findContentById: `SELECT * FROM content WHERE content_id = $1;`,
  createNewContent: `INSERT INTO content (title, description, file_url, price, sold, buyer_id, creator_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING content_id;`,
  updateContentById: `UPDATE content
  SET title = $1, description = $2, file_url = $3, price = $4, creator_id =$5
  WHERE content_id = $6;`,
  deleteContentById: `DELETE FROM content WHERE content_id = $1;`,
  findAllCreators: `SELECT 
  aesthete_user.name AS name,
  creator.creator_id AS creator_id, 
  creator.bio AS bio, 
  creator.profile_image AS profile_image, 
  json_agg(
    json_build_object(
      'title', content.title, 
      'file_url', content.file_url,
      'content_id', content.content_id,
      'description', content.description,
      'price', content.price,
      'sold', content.sold
    )
  ) as content
FROM 
  creator
LEFT JOIN 
  aesthete_user ON creator.user_id = aesthete_user.user_id
LEFT JOIN 
  content ON creator.creator_id = content.creator_id
GROUP BY 
  creator.creator_id, aesthete_user.name, creator.bio, creator.profile_image;

`,
  createNewCreator: `INSERT INTO creator (username, name, email, password, profile_image, bio, cover_image)
  VALUES ($1, $2, $3, $4, $5, $6, $7);`,
  findCreatorById: `SELECT 
  creator.creator_id AS creator_id,
  creator.profile_image AS profile_image,
  creator.cover_image AS cover_image,
  creator.bio AS bio,
  aesthete_user.user_id AS user_id,
  aesthete_user.username AS username,
  aesthete_user.name AS name,
  aesthete_user.email AS email
FROM 
  creator
INNER JOIN 
  aesthete_user ON creator.user_id = aesthete_user.user_id
WHERE 
  creator.creator_id = $1;
`,
  findAllContentBycreator_id: `SELECT * FROM content WHERE creator_id = $1;`,
  createNewBuyer: null,
};

module.exports = queries;