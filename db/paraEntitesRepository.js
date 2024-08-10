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
