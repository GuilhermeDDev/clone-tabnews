import database from "infra/database.js";

async function status(request, response) {
  //data da requisição API
  const updateAt = new Date().toISOString();
  // versão do banco
  const postgresV = await database.query("SHOW server_version;");
  const postgresVV = postgresV.rows[0].server_version;
  //  conections ativas
  const postgresConexoesAtual = await database.query(
    "select count(*) from pg_stat_activity;",
  );

  const postgresConectionsC = postgresConexoesAtual.rows[0].count;
  // max conections
  const postgresConexoesMaxima = await database.query("SHOW max_connections;");
  const postgresMaxConections = postgresConexoesMaxima.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const openedConnections = await database.query(
    {
      text: "SELECT * FROM pg_stat_activity where datname = $1;",
      values: [databaseName],
    }, //"SELECT * FROM pg_stat_activity where datname = 'salame_db';",
  );
  const opened_connections = openedConnections.rows.length;

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        postgres_version: postgresVV,
        postgres_conection_curently: parseInt(postgresConectionsC),
        postgres_conection_max: parseInt(postgresMaxConections),
        opened_connections: opened_connections,
      },
    },
  });
}

export default status;
