CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    address TEXT NOT NULL,
    name TEXT,
    twitter TEXT,
    instagram TEXT,
    linkedin TEXT,
    picture TEXT,
    about TEXT
);