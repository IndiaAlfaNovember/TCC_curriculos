
import { obterContaAtual } from "@/services/auth";

async function requisicao(url, opcoes = {}) {
  const resposta = await fetch(url, {
    ...opcoes,
    headers: {
      "Content-Type": "application/json",
      ...opcoes.headers,
    },
  });

  const resultado = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      resultado.erro || "Ocorreu um erro na operação."
    );
  }

  return resultado;
}

// Lista todos os currículos.
export function listarCurriculos() {
  return requisicao("/api/curriculos");
}

// Lista os currículos do usuário conectado.
export async function listarMeusCurriculos() {
  const conta = obterContaAtual();

  if (!conta) {
    return [];
  }

  const curriculos = await listarCurriculos();

  return curriculos.filter(
    (curriculo) => curriculo.donoId === conta.id
  );
}

// Lista os currículos públicos de outras contas.
export async function listarCurriculosPublicos() {
  const conta = obterContaAtual();

  if (!conta) {
    return [];
  }

  const curriculos = await listarCurriculos();

  return curriculos.filter(
    (curriculo) => curriculo.donoId !== conta.id
  );
}

// Busca um currículo pelo ID.
export async function buscarCurriculo(id) {
  const curriculos = await listarCurriculos();

  return (
    curriculos.find(
      (curriculo) => String(curriculo.id) === String(id)
    ) ?? null
  );
}

// Cria um currículo.
export async function criarCurriculo(dados) {
  const conta = obterContaAtual();

  if (!conta) {
    throw new Error("Entre na sua conta antes de criar um currículo.");
  }

  return requisicao("/api/curriculos", {
    method: "POST",
    body: JSON.stringify({
      ...dados,
      donoId: conta.id,
    }),
  });
}

// Atualiza um currículo próprio.
export async function atualizarCurriculo(id, dados) {
  const conta = obterContaAtual();

  if (!conta) {
    throw new Error("Entre na sua conta.");
  }

  const curriculo = await buscarCurriculo(id);

  if (!curriculo || curriculo.donoId !== conta.id) {
    throw new Error("Você não pode editar este currículo.");
  }

  return requisicao(
    `/api/curriculos/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      body: JSON.stringify(dados),
    }
  );
}

// Exclui um currículo próprio.
export async function excluirCurriculo(id) {
  const conta = obterContaAtual();

  if (!conta) {
    throw new Error("Entre na sua conta.");
  }

  const curriculo = await buscarCurriculo(id);

  if (!curriculo || curriculo.donoId !== conta.id) {
    throw new Error("Você não pode excluir este currículo.");
  }

  return requisicao(
    `/api/curriculos/${encodeURIComponent(id)}`,
    { method: "DELETE" }
  );
}
