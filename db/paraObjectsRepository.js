const pool = require("./dbInit");

const classes = ["safe", "mild", "hazard", "biohazard", "pandora"];

exports.getObjectClasses = () => {
  return classes;
};

exports.getAllObjects = async () => {
  const { rows } = await pool.query(`
        SELECT scientists.name AS Manager, para_objects.*  
        FROM para_objects
        JOIN scientists
        ON scientists.id = para_objects.manager_id
        `);
  return rows;
};

exports.getObject = async (id) => {
  const { rows } = await pool.query(
    `
      SELECT * 
      FROM para_objects
      WHERE id = $1
    `,
    [id]
  );
  return rows[0];
};

exports.insertObject = async ({
  name,
  object_class,
  discover_date,
  manager_id,
  description,
}) => {
  await pool.query(
    `
    INSERT INTO para_objects (name, object_class, discover_date, manager_id, description) 
    VALUES ($1, $2, $3, $4, $5)`,
    [name, object_class, discover_date, manager_id, description]
  );
};

exports.updateObject = async ({
  id,
  name,
  object_class,
  discover_date,
  manager_id,
  description,
}) => {
  await pool.query(
    `
      UPDATE para_objects
      SET name = $1, object_class = $2, discover_date = $3, manager_id = $4, description = $5
      WHERE id = $6
    `,
    [name, object_class, discover_date, manager_id, description, id]
  );
};
