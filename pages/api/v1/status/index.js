//import database from "../../../../infra/database.js";

function status(request, response) {
  response
    .status(200)
    .json({ chave: "Alunos do curso.dev são pessoas a cima da média" });
}

export default status;
