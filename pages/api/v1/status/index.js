import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const postgresV = await database.query("SELECT version()");
  const postgresConexoesAtual = await database.query(
    "select count(*) from pg_stat_activity",
  );
  const postgresConexoesMaxima = await database.query("SHOW max_connections;");
  console.log(postgresConexoesAtual);
  response.status(200).json({
    update_at: updateAt,
    postgres_version: postgresV.rows,
    postgres_conection_curently: postgresConexoesAtual.rows,
    postgres_conection_max: postgresConexoesMaxima.rows,
  });
}

export default status;
