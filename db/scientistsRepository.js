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
    GROUP BY scientists.id
    `);
  return rows;
};
