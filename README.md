# Aesthete


App link: https://aesthete1.netlify.app/buyer/login


Technology used:

<h3 align="left">Connect with me:</h3>
<p align="left">
</p>
<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.figma.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://heroku.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> </p>

<h2>Description</h2>
Aesthete is an platform for creators to portray their art and get financially rewarded for it and for the art afficionados to have a seemless buying process. It provides functionality for setting up your online shop, creating new lisiting, updating and removing the pre-existing ones. Aim of this project is to bring global creators on this platform and give them equal opportunity to list their pieces and for buyers to explore works of artist all around the world.

<h2>Wireframe</h2>
Access the wireframe from initial stages of this project: https://www.figma.com/design/Uc3ORMtuysLsxasHx6sVVA/Aesthete.io?node-id=0-1&t=Gy20FM0f4uafsNz3-0

<h2>User Stories:</h2>
In this specific scenario there are two users, buyer and creator.

As a buyer,

<li>One should be able to sign-in, sign-up and log out.</li>
<li>One should be able to view a list of all the shops from different creators</li>
<li>One should be able to view specific shop and be able to go to my cart after choosing an art to buy. </li>

As a Creator,

<li>One should be able to sign-in, sign-up (setup a shop) and log out.</li>
<li>One should be able to view my shop</li>
<li>One should be able to create new content listing, update the existing one and delete one when needed. </li>

<h2>Entity Relationship</h2>
![Entity Relationship Diagram](/client/public/Screen%20Shot%202024-07-09%20at%2011.46.46%20AM.png)

<h3>1. Primary Keys and Relationships:</h3>
<li>Each table has a primary key (creator_id for creator, content_id for content, buyer_id for buyer, and user_id for aesthete_user) .</li>
<li>The content table references the creator table through a foreign key relationship (content.creator_id > creator.creator_id), indicating that each piece of content is associated with a creator.</li>

<h3>2. User Identification and Authentication:</h3>
<li>The aesthete_user table stores user credentials (username, name, email, password) for authentication and user management purposes.</li>
<li>aesthete_user.user_id serves as the primary key and links to other tables (e.g., creator.user_id, buyer.user_id) to identify the users associated with creators and buyers.</li>

<h3>3. Content Management:</h3>
<li>The content table includes essential attributes such as title, description, price, file_url, and sold status, which are crucial for managing and displaying content created by users (creator_id).</li>

<h3>4. Profile Management for Creators:</h3>
<li>The creator table allows creators to manage their profile (profile_image, cover_image, bio) alongside their primary identification (creator_id and user_id), facilitating a customizable and descriptive profile for each creator.</li>

<h3>5. Buyer-Content Relationship:</h3>
<li>The buyer table establishes a relationship between buyers and users (user_id), enabling the association of users as buyers who interact with content (content.buyer_id), potentially tracking purchases or interests.</li>

<h2>Unsolved technical problems</h2>
<li>Authentication has been the most challenging of all. Saving info in backend session was creating a lot of problems for me, found some hacks from online resources but eventually had to resolve to saving info in front-end session</li>
<li>Bet management was my initial goal but state management was quite complex, considering I was trying to do it from both creator as well as buyer perspective.</li>
<li>Cart is yet to be completed but has figured out the payment gateway method. Will be conituining with the development to achieve that.</li>
<li>Routes segregation and access was quite complex in this project as there are two kinds of users.</li>

<h2>Future features:</h2>
<li>Completing the cart development and set up payment gateway</li>
<li>Focusing on re-building the components structure for better state management before jumping in the bid management</li>
<li>Have a backend specific auth</li>
<li>Add more features on app like a page for favs from buyers portal, able to have a buyer profile page, edit functionality and deleteing prrofiles. Same for creators</li>
