-- db/schema.sql
DROP DATABASE IF EXISTS drippy_db;
CREATE DATABASE drippy_db;

\c drippy_db;


CREATE TABLE users (
    id SERIAL PRIMARY KEY ,
    uid VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    username VARCHAR(100) UNIQUE,
    photo VARCHAR(2048),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- Type table
CREATE TABLE type (
    type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL
);

-- Material table
CREATE TABLE material (
    material_id SERIAL PRIMARY KEY,
    material_name VARCHAR(50) NOT NULL
);

-- TemperatureRange table
CREATE TABLE temperature_range (
    temperature_range_id SERIAL PRIMARY KEY,
    temperature_range_name VARCHAR(50) NOT NULL,
    min_temp INT,
    max_temp INT
);

-- Humidity table
CREATE TABLE humidity (
    humidity_id SERIAL PRIMARY KEY,
    humidity_name VARCHAR(50) NOT NULL,
    min_humidity INT,
    max_humidity INT
);

-- Clothes table
CREATE TABLE clothes (
    clothes_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    color VARCHAR(50) NOT NULL,
    type_id INT NOT NULL,
    material_id INT NOT NULL,
    temperature_range_id INT NOT NULL,
    humidity_id INT NOT NULL,
    waterproof BOOLEAN,
    prompt TEXT,
    image_base64 TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES type(type_id),
    FOREIGN KEY (material_id) REFERENCES material(material_id),
    FOREIGN KEY (temperature_range_id) REFERENCES temperature_range(temperature_range_id),
    FOREIGN KEY (humidity_id) REFERENCES humidity(humidity_id)
);

-- Locations table
CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    x_coordinate FLOAT NOT NULL,
    y_coordinate FLOAT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);