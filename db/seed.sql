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
    ('Pants');

-- Insert initial data into the material table
INSERT INTO material (material_name)
VALUES 
    ('Cotton'),
    ('Polyester'),
    ('Wool'),
    ('Silk'),
    ('Denim');

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
    (1, 'Red', 1, 1, 4, 3, false, 'Comfortable for warm weather', '', 'https://example.com/image1.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'Blue', 2, 3, 2, 4, true, 'Perfect for cold weather', '', 'https://example.com/image2.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Green', 3, 2, 3, 2, false, 'Suitable for mild temperatures', '', 'https://example.com/image3.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 'Black', 4, 4, 1, 1, true, 'Great for very cold weather', '', 'https://example.com/image4.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'White', 5, 5, 1, 5, false, 'Ideal for hot and humid weather', '', 'https://example.com/image5.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Yellow', 1, 2, 4, 3, false, 'Bright and sunny day wear', '', 'https://example.com/image6.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Purple', 4, 3, 3, 4, true, 'Cool evenings outfit', '', 'https://m.media-amazon.com/images/I/51jSZUPcrRL._AC_UY1000_.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Brown', 1, 1, 2, 2, false, 'Casual daily wear', '', 'https://example.com/image8.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert initial data into the locations table
-- Please make sure to replace the `user_id` with actual IDs from the users table
INSERT INTO locations (user_id, name, x_coordinate, y_coordinate)
VALUES 
    (1, 'Home', 40.712776, -74.005974),
    (2, 'Work', 34.052235, -118.243683),
    (3, 'Gym', 41.878113, -87.629799),
    (3, 'Park', 37.774929, -122.419418),
    (3, 'Beach', 25.761680, -80.191790);
