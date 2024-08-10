const { Client } = require("pg");

require("dotenv").config();

//Create and populate usernames table

const SQL = `
CREATE TYPE obj_class AS ENUM ('safe', 'mild', 'hazard', 'biohazard', 'pandora');
CREATE TYPE ent_class AS ENUM ('safe', 'euclid', 'keter');
CREATE TYPE ent_status AS ENUM ('deceased','alive','unknown', 'shifted');

CREATE TABLE IF NOT EXISTS scientists (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255),
  department VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS para_entities (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  manager_id INTEGER,
  name VARCHAR(255),
  description TEXT,
  entity_class ent_class,
  status ent_status,
  discover_date DATE,
  CONSTRAINT fk_manager
      FOREIGN KEY(manager_id) 
        REFERENCES scientists(id)
);

CREATE TABLE IF NOT EXISTS para_objects (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  manager_id INTEGER,
  name VARCHAR(255),
  description TEXT,
  object_class obj_class,
  discover_date DATE,
  CONSTRAINT fk_manager
      FOREIGN KEY(manager_id) 
        REFERENCES scientists(id)
);
`;

const sqlData = `

  INSERT INTO scientists (name, department) VALUES ('John', 'Engineering');

  INSERT INTO para_entities (manager_id,name,description,entity_class,status,discover_date)
  VALUES ((SELECT id FROM scientists WHERE name='John'), 'Alnon-Sigma', 'Water based anamoly exibiting psychic abilities', 'euclid', 'alive', '1978-2-16');

  INSERT INTO para_objects (manager_id,name,description,object_class,discover_date)
  VALUES ((SELECT id FROM scientists WHERE name='John'), 'Light cube', 'A photonic cube of unknown origin, seemingly defies the law of physics', 'safe', '1997-1-28');

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTION_URI,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
