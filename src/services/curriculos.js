
import curriculosIniciais from "@/mocks/curriculos";

const CHAVE = "curriculos";
const USUARIO_ATUAL_ID = "usuario-atual";

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

function salvarLista(curriculos) {
  localStorage.setItem(CHAVE, JSON.stringify(curriculos));
}

// Lista somente os currículos criados pelo usuário atual.
export function listarMeusCurriculos() {
  return listarCurriculos().filter(
    (curriculo) => curriculo.donoId === USUARIO_ATUAL_ID
  );
}

// Lista os currículos públicos de outras pessoas.
export function listarCurriculosPublicos() {
  return listarCurriculos().filter(
    (curriculo) => curriculo.donoId !== USUARIO_ATUAL_ID
  );
}

// Busca um currículo pelo ID.
export function buscarCurriculo(id) {
  return (
    listarCurriculos().find(
      (curriculo) => String(curriculo.id) === String(id)
    ) ?? null
  );
}

// Cria um currículo pertencente ao usuário atual.
export function criarCurriculo(dados) {
  const curriculos = listarCurriculos();

  const novoCurriculo = {
    ...dados,
    id: crypto.randomUUID(),
    donoId: USUARIO_ATUAL_ID,
  };

  salvarLista([...curriculos, novoCurriculo]);

  return novoCurriculo;
}

// Verifica se o currículo pertence ao usuário atual.
function usuarioPodeGerenciar(curriculo) {
  return curriculo?.donoId === USUARIO_ATUAL_ID;
}

// Atualiza somente os próprios currículos.
export function atualizarCurriculo(id, dados) {
  const curriculos = listarCurriculos();
  const existente = buscarCurriculo(id);

  if (!usuarioPodeGerenciar(existente)) {
    throw new Error("Você não pode editar este currículo.");
  }

  const curriculosAtualizados = curriculos.map((curriculo) =>
    String(curriculo.id) === String(id)
      ? { ...curriculo, ...dados, id: curriculo.id, donoId: curriculo.donoId }
      : curriculo
  );

  salvarLista(curriculosAtualizados);

  return buscarCurriculo(id);
}

// Exclui somente os próprios currículos.
export function excluirCurriculo(id) {
  const curriculos = listarCurriculos();
  const existente = buscarCurriculo(id);

  if (!usuarioPodeGerenciar(existente)) {
    throw new Error("Você não pode excluir este currículo.");
  }

  salvarLista(
    curriculos.filter(
      (curriculo) => String(curriculo.id) !== String(id)
    )
  );

  return true;
}
