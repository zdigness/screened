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

-- users --
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_id TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

-- games --
CREATE TABLE IF NOT EXISTS games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    guesses TEXT[] NOT NULL,  -- Stores up to 4 guesses in an array
    correct_movie TEXT NOT NULL,
    was_correct BOOLEAN NOT NULL,
    guesses_taken INT NOT NULL CHECK (guesses_taken BETWEEN 1 AND 4),
    completed_at TIMESTAMP DEFAULT now()
);


-- stats --
CREATE TABLE IF NOT EXISTS stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    total_games INT DEFAULT 0,
    wins INT DEFAULT 0,
    streak INT DEFAULT 0,
    best_streak INT DEFAULT 0,
    last_played TIMESTAMP DEFAULT now()
);

-- Import data from the CSV file
COPY movies (name, director, genre_1, genre_2, actor, release_date, average_rating, reviewer_name, review_rating, review_text, poster_url, game_date)
FROM '/docker-entrypoint-initdb.d/test_data.csv'
DELIMITER ','
CSV HEADER;
