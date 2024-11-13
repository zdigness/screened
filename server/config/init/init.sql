CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    director VARCHAR(255),
    genre_1 VARCHAR(255),
    genre_2 VARCHAR(255),
    actor VARCHAR(255),
    release_date VARCHAR(4),
    average_rating FLOAT,
    reviewer_name VARCHAR(255),
    review_rating FLOAT,
    review_text TEXT,
    poster_url VARCHAR(255),
    game_date DATE
);

-- Import data from the CSV file
COPY movies (name, director, genre_1, genre_2, actor, release_date, average_rating, reviewer_name, review_rating, review_text, poster_url, game_date)
FROM '/docker-entrypoint-initdb.d/movies_data.csv'
DELIMITER ','
CSV HEADER;
