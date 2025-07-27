-- Connect to psql with user postgres (psql -U postgres) and execute the following commands
CREATE ROLE db_user WITH LOGIN PASSWORD 'password';

ALTER ROLE db_user WITH CREATEDB;

-- Quit the current psql session (\q), then reconnect with new user (psql -d postgres -U db_user)
-- Then, execute the following command
CREATE DATABASE personal_budget;

-- Connect to the personal_budget db (\c personal_budget) and execute the following commands
CREATE TABLE envelope (
  id serial PRIMARY KEY,
  name varchar(200) UNIQUE NOT NULL,
  budget double precision NOT NULL CHECK (budget > 0)
);

CREATE TABLE transaction (
  id serial PRIMARY KEY,
  date date NOT NULL,
  amount double precision NOT NULL CHECK (amount > 0),
  recipient varhcar(200) NOT NULL,
  envelope_id int REFERENCES envelope (id)
);
