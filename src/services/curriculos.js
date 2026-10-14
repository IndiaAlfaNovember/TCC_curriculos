
import curriculosIniciais from "@/mocks/curriculos";

const CHAVE = "curriculos";

// READ: lista todos os currículos.
export function listarCurriculos() {
  if (typeof window === "undefined") {
    return [];
  }

  const dadosSalvos = localStorage.getItem(CHAVE);

  if (dadosSalvos === null) {
    localStorage.setItem(
      CHAVE,
      JSON.stringify(curriculosIniciais)
    );

    return curriculosIniciais;
  }

  try {
    return JSON.parse(dadosSalvos);
  } catch {
    localStorage.setItem(
      CHAVE,
      JSON.stringify(curriculosIniciais)
    );

    return curriculosIniciais;
  }
}

// Salva a lista atualizada no navegador.
function salvarLista(curriculos) {
  localStorage.setItem(CHAVE, JSON.stringify(curriculos));
}

// CREATE: cria um novo currículo.
export function criarCurriculo(dados) {
  const curriculos = listarCurriculos();

  const novoCurriculo = {
    ...dados,
    id: crypto.randomUUID(),
  };

  salvarLista([...curriculos, novoCurriculo]);

  return novoCurriculo;
}

// READ: busca um currículo pelo ID.
export function buscarCurriculo(id) {
  return (
    listarCurriculos().find(
      (curriculo) => String(curriculo.id) === String(id)
    ) ?? null
  );
}

// UPDATE: atualiza um currículo existente.
export function atualizarCurriculo(id, dados) {
  const curriculos = listarCurriculos();

  const existe = curriculos.some(
    (curriculo) => String(curriculo.id) === String(id)
  );

  if (!existe) {
    throw new Error("Currículo não encontrado.");
  }

  const curriculosAtualizados = curriculos.map((curriculo) =>
    String(curriculo.id) === String(id)
      ? { ...curriculo, ...dados, id: curriculo.id }
      : curriculo
  );

  salvarLista(curriculosAtualizados);

  return buscarCurriculo(id);
}

// DELETE: exclui um currículo.
export function excluirCurriculo(id) {
  const curriculos = listarCurriculos();

  const curriculosAtualizados = curriculos.filter(
    (curriculo) => String(curriculo.id) !== String(id)
  );

  if (curriculosAtualizados.length === curriculos.length) {
    return false;
  }

  salvarLista(curriculosAtualizados);

  return true;
}
