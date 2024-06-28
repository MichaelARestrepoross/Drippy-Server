-- db/schema.sql
DROP DATABASE IF EXISTS drippy_db;
CREATE DATABASE drippy_db;

\c drippy_db;


CREATE TABLE users (
    id SERIAL PRIMARY KEY ,
    uid VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    username VARCHAR(100) UNIQUE,
    photo VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TABLE wardrobe (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     name VARCHAR(50) NOT NULL,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id)
-- );

-- CREATE TABLE clothes (
--     id SERIAL PRIMARY KEY,
--     wardrobe_id INT NOT NULL,
--     color VARCHAR(50) NOT NULL,
--     type VARCHAR(50) NOT NULL,
--     sub_type VARCHAR(50) NOT NULL,
--     weather_type_id INT NOT NULL,
--     material VARCHAR(50),
--     prompt TEXT,
--     image_base64 TEXT,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (wardrobe_id) REFERENCES wardrobe(id),
--     FOREIGN KEY (weather_type_id) REFERENCES weather(id)
-- );

-- CREATE TABLE weather (
--     id SERIAL PRIMARY KEY,
--     weather_type VARCHAR(50) NOT NULL
-- );
