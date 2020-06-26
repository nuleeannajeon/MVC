DROP DATABASE IF EXISTS actors_db;

CREATE DATABASE actors_db;

USE actors_db;

CREATE TABLE actor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    coolness_points INT,
    attitude VARCHAR(64)
);

INSERT INTO actor (name,coolness_points,attitude) VALUES (Anna, 10, 'energetic');
INSERT INTO actor (name,coolness_points,attitude) VALUES (Alex, 9, 'calm');
INSERT INTO actor (name,coolness_points,attitude) VALUES (Haley, 8, 'joyful');

SELECT * FROM actor;