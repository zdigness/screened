CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    director VARCHAR(255),
    average_rating FLOAT,
    reviewer_name VARCHAR(255),
    review_rating FLOAT,
    review_text TEXT,
    game_date DATE
);

-- Import data from the CSV file
COPY movies (name, director, average_rating, reviewer_name, review_rating, review_text, game_date)
FROM '/docker-entrypoint-initdb.d/movies_data.csv'
DELIMITER ','
CSV HEADER;
