const pool = require("./dbInit");

exports.getAllEntities = async () => {
  const { rows } = await pool.query(`
          SELECT scientists.name AS Manager, para_entities.*  
          FROM para_entities
          JOIN scientists
          ON scientists.id = para_entities.manager_id
          `);
  return rows;
};

exports.getEntity = async (id) => {
  const { rows } = await pool.query(
    `
      SELECT * 
      FROM para_entities
      WHERE id = $1
    `,
    [id]
  );
  return rows[0];
};

exports.insertEntity = async ({
  name,
  entity_class,
  ent_status,
  discover_date,
  manager_id,
  description,
}) => {
  await pool.query(
    `
    INSERT INTO para_entities (name, entity_class, status, discover_date, manager_id, description) 
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [name, entity_class, ent_status, discover_date, manager_id, description]
  );
};

exports.updateEntity = async ({
  id,
  name,
  entity_class,
  ent_status,
  discover_date,
  manager_id,
  description,
}) => {
  await pool.query(
    `
      UPDATE para_entities
      SET name = $1, entity_class = $2, status = $3, discover_date = $4, manager_id = $5, description = $6
      WHERE id = $7
    `,
    [name, entity_class, ent_status, discover_date, manager_id, description, id]
  );
};
