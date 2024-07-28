-- you do not need to seed users
-- you should run 'npm run db:init' to initialize the database
-- start your front and backends
-- instead now you should create users with firebase that will register also to your backend
-- when seeding other fields in other tables and you need the foreign key of user Id, retrieve the userIds from looking on postico or using psql
-- SELECT * from users 
-- manually place the id into your INSERT INTO values

-- db/seed.sql

\c drippy_db;

-- Insert initial data into the users table
INSERT INTO users (uid, email, username, photo, created_at, updated_at)
VALUES 
    ('SH4DtzZfODOmpwAIqwEUOXqHdWt2', 'firstemail@gmail.com', 'first_user', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('SH4DtzZfODOmpwAIqwEUOXqHdWt2', 'fakeemail@gmail.com', 'second_user', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('IeERyMSGueavSqJioTrRpCYuMBo1', 'thirdemail@gmai.com', 'third_user', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert initial data into the type table
INSERT INTO type (type_name)
VALUES 
    ('T-shirt'),
    ('Jacket'),
    ('Sweater'),
    ('Shorts'),
    ('Pants'),
    ('Tank-Top'),
    ('Sandals'),
    ('Sneakers'),
    ('Boots'),
    ('Heels');

-- Insert initial data into the material table
INSERT INTO material (material_name)
VALUES 
    ('Cotton'),
    ('Polyester'),
    ('Wool'),
    ('Silk'),
    ('Denim'),
    ('Leather'),
    ('Latex'),
    ('Rubber'),
    ('Canvas');

-- Insert initial data into the temperature_range table
INSERT INTO temperature_range (temperature_range_name, min_temp, max_temp)
VALUES 
    ('Very Cold', -50, 0),
    ('Cold', 1, 50),
    ('Mild', 51, 70),
    ('Warm', 71, 140);

-- Insert initial data into the humidity table
INSERT INTO humidity (humidity_name, min_humidity, max_humidity)
VALUES 
    ('Very Low', 0, 20),
    ('Low', 21, 40),
    ('Medium', 41, 60),
    ('High', 61, 80),
    ('Very High', 81, 100);

-- Insert initial data into the clothes table
-- Please make sure to replace the `user_id` with actual IDs from the users table
INSERT INTO clothes (user_id, color, type_id, material_id, temperature_range_id, humidity_id, waterproof, prompt, image_base64, image_url, created_at, updated_at)
VALUES 
    (1, 'Red', 1, 1, 4, 4, false, 'Casual', '', 'https://m.media-amazon.com/images/I/519FWa0m3VL._AC_UY1000_.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'Blue', 2, 3, 2, 2, true, 'Business Casual', '', 'https://content.moss.co.uk/images/extraextralarge/966766291_08.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Green', 3, 2, 3, 3, false, 'Work', '', 'https://m.media-amazon.com/images/I/7185SCyt1HL._AC_UF894,1000_QL80_.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 'Black', 4, 4, 4, 4, true, 'Casual', '', 'https://joliexnoire.com/cdn/shop/products/all-over-print-mens-athletic-long-shorts-white-back-60bb31149612d_2048x.jpg?v=1622880540', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'White', 5, 5, 2, 2, false, 'Business Casual', '', 'https://assets.vogue.com/photos/64b6dd96a358cf0a7f61232a/3:4/w_748%2Cc_limit/Layer_8.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Yellow', 1, 2, 4, 4, false, 'Casual', '', 'https://i5.walmartimages.com/asr/97596a9a-8b5f-4321-b402-e29926abc76e.76ab83a4b1a504ffe5c2d6f85565ed6e.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Purple', 4, 3, 3, 3, true, 'Casual', '', 'https://jeevyboi.com/cdn/shop/products/all-over-print-mens-athletic-long-shorts-white-back-62663aa54a719_1200x1200.jpg?v=1650866862', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Brown', 1, 1, 4, 4, false, 'Casual', '', 'https://m.media-amazon.com/images/I/B1F9XqluwtS._CLa%7C2140%2C2000%7C41nrSYX63LL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Green', 3, 2, 3, 3, false, 'Work', '', 'https://n.nordstrommedia.com/id/sr3/939259e3-a993-438d-b78c-14acba499d7b.jpeg?h=365&w=240&dpr=2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Yellow', 1, 2, 4, 4, false, 'Casual', '', 'https://upstyle365.com/wp-content/uploads/2021/06/3.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Red', 4, 3, 3, 3, true, 'Casual', '', 'https://m.media-amazon.com/images/I/51AWKhIKDSL.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Orange', 1, 1, 4, 4, false, 'Casual', '', 'https://imgs.michaels.com/MAM/assets/1/5E3C12034D34434F8A9BAAFDDF0F8E1B/img/C12A32A5CBED468E8E68558359E6E17C/D566810S_1.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Orange', 2, 3, 2, 2, true, 'Business Casual', '', 'https://www.benditcycling.com/assets/images/Unisex%20Lightweight%20Windbreaker%20Full-Zip%20Jacket%20-%20Safety%20Orange%20-%20Front.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Pink', 5, 2, 3, 3, false, 'Casual', '', 'https://i.ebayimg.com/images/g/yioAAOSwIRxiuaAl/s-l1200.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Gray', 3, 4, 3, 3, true, 'Work', '', 'https://us.benetton.com/dw/image/v2/BBSF_PRD/on/demandware.static/-/Sites-ucb-master/default/dw84ad6556/images/Full_PDP_h/Benetton_24P_1002U1G34_507_BS_Full_PDP_h.jpg?sw=960&sh=1280', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Beige', 4, 5, 4, 4, false, 'Casual', '', 'https://www.code-zero.com/uploads/media/9c/a1/73/1659626001/club-shorts-beige-water-resistant.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Turquoise', 2, 1, 2, 2, true, 'Casual', '', 'https://static1.squarespace.com/static/5d11fd45b9e7020001a6a368/5d15e401602dfa000190cddd/63574d13bd5978258f040004/1720092006159/TA_blouson_blue_7.jpg?format=1500w', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Maroon', 1, 3, 3, 3, false, 'Work', '', 'https://bonnershirts.com/cdn/shop/products/maroon-bonner-premium.jpg?v=1679292429&width=1445', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Teal', 5, 4, 2, 2, true, 'Business Casual', '', 'https://cdn.torrid.com/i/torrid/12543822_00709_flat?$pdp_hero_desktop_main$', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Olive', 2, 2, 2, 2, false, 'Casual', '', 'https://thebrowneyedgirl.boutique/cdn/shop/products/WJC872_COLOR_36.jpg?v=1579914525&width=1024', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Lime', 4, 5, 4, 4, true, 'Casual', '', 'https://www.boykinspanielrescue.org/uploads/8/0/0/9/80095336/s386190172175268773_p1007_i2_w1000.jpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Cyan', 3, 3, 2, 2, false, 'Business Casual', '', 'https://www.stussy.com/cdn/shop/files/117241_CYAN_2_f78e7737-1a22-4c65-94d2-d445c81a00fa.jpg?v=1718205736&width=1920', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Indigo', 2, 4, 2, 2, true, 'Business Casual', '', 'https://badbowl.us/cdn/shop/files/1_dec4a7f6-15c5-40b7-9f88-fef72e4609fe.jpg?v=1712733401', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Violet', 3, 1, 3, 3, false, 'Work', '', 'https://target.scene7.com/is/image/Target/GUEST_3fd39473-3168-41a5-a7ad-d91ee62bfff5?wid=488&hei=488&fmt=pjpeg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Gray', 4, 2, 4, 4, true, 'Casual', '', 'https://i5.walmartimages.com/seo/Womens-Track-Shorts-Shorts-Sporty-Drawstring-Waist-High-Waist-Light-Grey-M_059afd1f-369b-44fd-81c7-9d20d7bfe930.a986d54629effc049358d7b834bd3906.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Beige', 5, 3, 2, 2, false, 'Work', '', 'https://i.ebayimg.com/images/g/7JUAAOSwa8Vk1iFM/s-l1600.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Tan', 1, 4, 4, 4, true, 'Casual', '', 'https://m.media-amazon.com/images/I/61t13XusCCL._AC_UY1000_.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Charcoal', 2, 5, 2, 2, false, 'Business Casual', '', 'https://www.billioncreation.com/wp-content/uploads/2014/11/DICKIES-TJ15-Lined-Eisenhower-Charcoal-Jacket-Front.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Mint', 3, 1, 2, 2, true, 'Casual', '', 'https://www.jcrew.com/s7-img-facade/L1276_KA6119?hei=2000&crop=0,0,1600,0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Lavender', 4, 2, 4, 4, false, 'Casual', '', 'https://m.media-amazon.com/images/I/81qjJCQefTL._AC_UY1000_.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Coral', 5, 3, 2, 2, true, 'Casual', '', 'https://cdn11.bigcommerce.com/s-wlu989/images/stencil/1280x1280/products/309/643/a20791a146bb3f1e8ed45c_l__73878.1419553731.jpg?c=2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Cream', 1, 4, 4, 4, false, 'Work', '', 'https://www.majorthreads.com/cdn/shop/files/MajorThreadsGhost0328220201_2000x_b77a49fe-769a-4e53-80b5-9af2cd7d4545_5000x.jpg?v=1682966657', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Rose', 2, 5, 2, 2, true, 'Business Casual', '', 'https://i.etsystatic.com/18858649/r/il/b02fb9/2509988537/il_570xN.2509988537_f6te.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Aqua', 3, 2, 2, 2, false, 'Casual', '', 'https://adsumnyc.com/cdn/shop/files/SS240871-4.jpg?v=1706045850', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Insert initial data into the locations table
-- Please make sure to replace the `user_id` with actual IDs from the users table
INSERT INTO locations (user_id, name, x_coordinate, y_coordinate)
VALUES 
    (1, 'Home', 40.712776, -74.005974),
    (2, 'Work', 34.052235, -118.243683),
    (3, 'Gym', 41.878113, -87.629799),
    (3, 'Park', 37.774929, -122.419418),
    (3, 'Beach', 25.761680, -80.191790);
