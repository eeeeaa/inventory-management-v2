const pool = require("./dbInit");

exports.getAllScientistData = async () => {
  const { rows } = await pool.query(`
    SELECT scientists.id, scientists.name, scientists.department, 
    COUNT(pe.id) AS managed_entities, COUNT(po.id) AS managed_objects
    FROM scientists
    LEFT JOIN para_entities AS pe
    ON scientists.id = pe.manager_id
    LEFT JOIN para_objects AS po
    ON scientists.id = po.manager_id
    GROUP BY scientists.id;
    `);
  return rows;
};

exports.getScientist = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT scientists.id, scientists.name, scientists.department
    FROM scientists
    WHERE scientists.id = $1;
    `,
    [id]
  );
  return rows[0];
};

exports.insertScientist = async ({ sci_name, department }) => {
  await pool.query(
    `INSERT INTO scientists (name, department) VALUES ($1,$2);`,
    [sci_name, department]
  );
};

exports.updateScientist = async ({ id, sci_name, department }) => {
  await pool.query(
    `
    UPDATE scientists
    SET name= $2, department= $3
    WHERE scientists.id = $1;
    `,
    [id, sci_name, department]
  );
};
