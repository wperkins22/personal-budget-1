CREATE TABLE envelope (
  id serial PRIMARY KEY,
  name varchar(200) UNIQUE NOT NULL,
  budget double precision NOT NULL CHECK (budget > 0)
);

CREATE TABLE transaction (
  id serial PRIMARY KEY,
  envelope_id int REFERENCES envelope (id),
  timestamp timestamp NOT NULL,
  amount double precision NOT NULL CHECK (amount > 0)
);

CREATE TABLE transfer (
  id serial PRIMARY KEY,
  from_envelope_id int REFERENCES envelope (id),
  to_envelope_id int REFERENCES envelope (id),
  timestamp timestamp NOT NULL,
  amount double precision NOT NULL CHECK (amount > 0)
);
