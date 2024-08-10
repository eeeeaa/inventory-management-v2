const pool = require("./dbInit");

exports.getAllObjects = async () => {
  const { rows } = await pool.query(`
        SELECT scientists.name AS Manager, para_objects.*  
        FROM para_objects
        JOIN scientists
        ON scientists.id = para_objects.manager_id
        `);
  return rows;
};
