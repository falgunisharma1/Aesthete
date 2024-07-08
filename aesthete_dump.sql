--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Homebrew)
-- Dumped by pg_dump version 14.12 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: aesthete_user; Type: TABLE; Schema: public; Owner: falgunisharma
--

CREATE TABLE public.aesthete_user (
    user_id integer NOT NULL,
    username character varying(100) NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(500) NOT NULL
);


ALTER TABLE public.aesthete_user OWNER TO falgunisharma;

--
-- Name: buyer; Type: TABLE; Schema: public; Owner: falgunisharma
--

CREATE TABLE public.buyer (
    buyer_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.buyer OWNER TO falgunisharma;

--
-- Name: buyers_buyerid_seq; Type: SEQUENCE; Schema: public; Owner: falgunisharma
--

CREATE SEQUENCE public.buyers_buyerid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.buyers_buyerid_seq OWNER TO falgunisharma;

--
-- Name: buyers_buyerid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: falgunisharma
--

ALTER SEQUENCE public.buyers_buyerid_seq OWNED BY public.buyer.buyer_id;


--
-- Name: content; Type: TABLE; Schema: public; Owner: falgunisharma
--

CREATE TABLE public.content (
    content_id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    file_url character varying(255) NOT NULL,
    creator_id integer NOT NULL,
    price numeric DEFAULT 0.0 NOT NULL,
    sold boolean DEFAULT false,
    buyer_id integer
);


ALTER TABLE public.content OWNER TO falgunisharma;

--
-- Name: content_contentid_seq; Type: SEQUENCE; Schema: public; Owner: falgunisharma
--

CREATE SEQUENCE public.content_contentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.content_contentid_seq OWNER TO falgunisharma;

--
-- Name: content_contentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: falgunisharma
--

ALTER SEQUENCE public.content_contentid_seq OWNED BY public.content.content_id;


--
-- Name: creator; Type: TABLE; Schema: public; Owner: falgunisharma
--

CREATE TABLE public.creator (
    creator_id integer NOT NULL,
    profile_image text,
    cover_image text,
    bio text,
    user_id integer
);


ALTER TABLE public.creator OWNER TO falgunisharma;

--
-- Name: creator_creatorid_seq; Type: SEQUENCE; Schema: public; Owner: falgunisharma
--

CREATE SEQUENCE public.creator_creatorid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.creator_creatorid_seq OWNER TO falgunisharma;

--
-- Name: creator_creatorid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: falgunisharma
--

ALTER SEQUENCE public.creator_creatorid_seq OWNED BY public.creator.creator_id;


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: falgunisharma
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO falgunisharma;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: falgunisharma
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.aesthete_user.user_id;


--
-- Name: aesthete_user user_id; Type: DEFAULT; Schema: public; Owner: falgunisharma
--

ALTER TABLE ONLY public.aesthete_user ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: buyer buyer_id; Type: DEFAULT; Schema: public; Owner: falgunisharma
--

ALTER TABLE ONLY public.buyer ALTER COLUMN buyer_id SET DEFAULT nextval('public.buyers_buyerid_seq'::regclass);


--
-- Name: content content_id; Type: DEFAULT; Schema: public; Owner: falgunisharma
--

ALTER TABLE ONLY public.content ALTER COLUMN content_id SET DEFAULT nextval('public.content_contentid_seq'::regclass);


--
-- Name: creator creator_id; Type: DEFAULT; Schema: public; Owner: falgunisharma
--

ALTER TABLE ONLY public.creator ALTER COLUMN creator_id SET DEFAULT nextval('public.creator_creatorid_seq'::regclass);


--
-- Data for Name: aesthete_user; Type: TABLE DATA; Schema: public; Owner: falgunisharma
--

COPY public.aesthete_user (user_id, username, name, email, password) FROM stdin;
2	alice_smith	Alice Smith	alice.smith@example.com	$2a$10$bjrGtLE521/ZvnTwSZSF0eTWp70ThcFsgZzsn93Hptgot3E8d.ZH6
3	bob_jones	Bob Jones	bob.jones@example.com	$2a$10$trrhPbtwmV9bJS3AAlzFteWpWb.w2d2F4v.gH9AkC8Pg1h2EXVMYG
4	carol_adams	Carol Adams	carol.adams@example.com	$2a$10$lwlazF4V0PTdiHjhNqKhNu7se0S3CB9Llc0cbrJJDhV4iDaQRkrFy
5	david_wilson	David Wilson	david.wilson@example.com	$2a$10$C9L1iImWkIf9ciMPPJiF8OCEWGwq9cUpHyS3aCsEMQORX9DKuScHS
6	emma_brown	Emma Brown	emma.brown@example.com	$2a$10$JbsaXEt.1jMgVBc7bSwq9OYOS4LVUhU0cXTxfLoTGIM28NhSF4NXO
7	john_doe	John Doe	john.doe@example.com	password
\.


--
-- Data for Name: buyer; Type: TABLE DATA; Schema: public; Owner: falgunisharma
--

COPY public.buyer (buyer_id, user_id) FROM stdin;
1	7
\.


--
-- Data for Name: content; Type: TABLE DATA; Schema: public; Owner: falgunisharma
--

COPY public.content (content_id, title, description, file_url, creator_id, price, sold, buyer_id) FROM stdin;
5	City lights	A stunning view of city lights at night.	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvV5BlWLTu_kAen7hdqXAoun3s_yZ8JzW0oQ&s	1	15	f	\N
6	Forest trail	A peaceful trail through a dense forest.	https://assets.onlineartlessons.com/uploads/20180115095732/forestfinal.jpg	2	12	f	\N
7	Mountain stream	A crystal-clear stream flowing through the mountains.	https://img.cdn-pictorem.com/uploads/collection/F/FC10PRO8PMR/900_xzendor7_Mountain%20Stream%20in%20the%20Moonlight%20by%20Austrian%20Painter%20Albert%20Rieger%20(1834%20-%201905)_02_TXTRZRCVNS(100,2,BR,INV)_FRAME.jpg	2	18	f	\N
10	Portrait of a woman	A detailed portrait of a woman in black and white.	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsD0MuSFglLjS26PWcv1Cwg2YKYr69_9kApA&s	4	80	f	\N
14	Lovers	Emotions felt in Love	https://st3.depositphotos.com/13516094/19167/i/1600/depositphotos_191671926-stock-illustration-love-abstract.jpg	4	40	f	\N
12	Dreamscape	An illustration of a surreal dreamscape filled with whimsical elements.	https://www.erinhanson.com/content/inventoryimages/Erin-Hanson-Dreamscape-1.jpg	5	22	f	\N
9	Jupiter Night sky abstract	A mesmerizing view of the night sky filled with stars.	https://images.nightcafe.studio/jobs/VMeFNNrbXFkFmOFo81jL/VMeFNNrbXFkFmOFo81jL.jpg?tr=w-1600,c-at_max	3	25	f	\N
24	Colors around us	An abstract art piece with vibrant colors.	https://pixune.com/wp-content/uploads/2023/11/DALL%C2%B7E-2023-11-30-12.59.03-A-whimsical-and-colorful-illustration-of-an-artist-surrounded-by-a-whirlwind-of-various-art-styles-and-influences.-The-artist-a-middle-aged-Caucasian-1030x589.webp	3	55	f	\N
13	Enchanted Forest	A colorful illustration of an enchanted forest with mythical creatures.	https://img.artpal.com/82/633-20-11-20-14-53-17m.jpg	5	50	f	\N
25	Waves	Rushing towards you like the feeling of first love.	https://images.theconversation.com/files/296052/original/file-20191008-128681-ngzwqb.jpg?ixlib=rb-4.1.0&rect=15%2C20%2C929%2C926&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip	2	50	f	\N
11	Abstract art	An abstract art piece with vibrant colors.	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6dct2JOXVB4fdrncjsr3121yXCxqEY84Ygw&s	4	40	f	\N
4	Sunset over the mountains	A beautiful sunset captured over the serene mountains.	https://i.etsystatic.com/5003433/r/il/470c56/3618795988/il_570xN.3618795988_9pvq.jpg	1	40	f	\N
8	Urban exploration	An adventure through an abandoned urban area.	https://images.squarespace-cdn.com/content/v1/5d39cd6c27d1530001dafe7c/1566588319275-66LMRAHLN7RGA4O5S9MW/Phun_Factory_web.jpg	3	50	f	\N
\.


--
-- Data for Name: creator; Type: TABLE DATA; Schema: public; Owner: falgunisharma
--

COPY public.creator (creator_id, profile_image, cover_image, bio, user_id) FROM stdin;
1	https://images.squarespace-cdn.com/content/v1/6213069cc62e8c6048531bae/d1c1cfe6-4d2f-47b8-b135-9ad327e8b6ca/Fadilah+Karim%2C+%E2%80%98Sticker+Book-Random+Things%E2%80%98%2C+2022%2C+oil+on+linen%2C+152+x+122cm.+Image+courtesy+of+the+artist+and+Gajah+Gallery.		An aspiring artist and designer.	2
2	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8VqqLL3MBXjSvd21_95Qr3GSuLWc6uN0rBA&s		A passionate photographer capturing moments.	3
3	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEaW4ArZdpl-VZymKOnVxqtzRotLVoYeAtow&s		A storyteller through writing and visual arts.	4
4	https://cdn.openart.ai/stable_diffusion/bcb75248470dfa267778cfd2f402f146b8e17ad2_2000x2000.webp		A filmmaker exploring new narratives.	5
5	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjk0G3VdJyNmjdASoWxiefGCJF81TFAslhug&s		An illustrator bringing imagination to life.	6
\.


--
-- Name: buyers_buyerid_seq; Type: SEQUENCE SET; Schema: public; Owner: falgunisharma
--

SELECT pg_catalog.setval('public.buyers_buyerid_seq', 1, true);


--
-- Name: content_contentid_seq; Type: SEQUENCE SET; Schema: public; Owner: falgunisharma
--

SELECT pg_catalog.setval('public.content_contentid_seq', 31, true);


--
-- Name: creator_creatorid_seq; Type: SEQUENCE SET; Schema: public; Owner: falgunisharma
--

SELECT pg_catalog.setval('public.creator_creatorid_seq', 5, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: falgunisharma
--

SELECT pg_catalog.setval('public.users_user_id_seq', 7, true);


--
-- Name: buyer buyer_user_id_key; Type: CONSTRAINT; Schema: public; Owner: falgunisharma
--

ALTER TABLE ONLY public.buyer
    ADD CONSTRAINT buyer_user_id_key UNIQUE (user_id);


--
-- Name: buyer buyers_pkey; Type: CONSTRAINT; Schema: public; Owner: falgunisharma
--

ALTER TABLE ONLY public.buyer
    ADD CONSTRAINT buyers_pkey PRIMARY KEY (buyer_id);


--
-- Name: content content_pkey; Type: CONSTRAINT; Schema: public; Owner: falgunisharma
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_pkey PRIMARY KEY (content_id);


--
-- Name: creator creator_pkey; Type: CONSTRAINT; Schema: public; Owner: falgunisharma
--

ALTER TABLE ONLY public.creator
    ADD CONSTRAINT creator_pkey PRIMARY KEY (creator_id);


--
-- Name: aesthete_user users_email_key; Type: CONSTRAINT; Schema: public; Owner: falgunisharma
--

ALTER TABLE ONLY public.aesthete_user
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: aesthete_user users_pkey; Type: CONSTRAINT; Schema: public; Owner: falgunisharma
--

ALTER TABLE ONLY public.aesthete_user
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: aesthete_user users_username_key; Type: CONSTRAINT; Schema: public; Owner: falgunisharma
--

ALTER TABLE ONLY public.aesthete_user
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: content content_creatorid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: falgunisharma
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_creatorid_fkey FOREIGN KEY (creator_id) REFERENCES public.creator(creator_id);


--
-- PostgreSQL database dump complete
--

