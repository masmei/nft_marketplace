DROP DATABASE IF EXISTS profiles_dev;
CREATE DATABASE profiles_dev;

\c profiles_dev;

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

-- psql -U postgres -f db/schema.sql
-- psql -U postgres -f db/seed.sql