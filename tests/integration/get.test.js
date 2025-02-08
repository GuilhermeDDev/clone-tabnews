test("GET to /api/v1/status should return 200", async () => {
  //teste de fetch na API
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  // teste de data da requisição
  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();
  new Date(responseBody.update_at).toISOString();
  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdateAt);
  // teste de versão do banco
  expect(responseBody.dependencies.database.postgres_version).toEqual("16.6");
  // teste de numero de conexões ativas do banco
  expect(
    responseBody.dependencies.database.postgres_conection_curently,
  ).toBeDefined();
  // teste de numero maximo de conexões do banco
  expect(responseBody.dependencies.database.postgres_conection_max).toEqual(
    100,
  );
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
