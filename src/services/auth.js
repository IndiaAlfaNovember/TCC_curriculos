
const CHAVE_CONTAS = "contas";
const CHAVE_SESSAO = "sessao";

function listarContas() {
  return JSON.parse(localStorage.getItem(CHAVE_CONTAS) || "[]");
}

// Cria uma conta nova.
export function criarConta(nome, senha) {
  const contas = listarContas();

  const nomeNormalizado = nome.trim().toLowerCase();

  if (!nomeNormalizado || !senha) {
    throw new Error("Preencha o nome e a senha.");
  }

  const existe = contas.some(
    (conta) => conta.nome.toLowerCase() === nomeNormalizado
  );

  if (existe) {
    throw new Error("Esse nome de usuário já está cadastrado.");
  }

  const novaConta = {
    id: crypto.randomUUID(),
    nome: nome.trim(),
    senha,
  };

  localStorage.setItem(
    CHAVE_CONTAS,
    JSON.stringify([...contas, novaConta])
  );

  localStorage.setItem(
    CHAVE_SESSAO,
    JSON.stringify({
      id: novaConta.id,
      nome: novaConta.nome,
    })
  );

  return { id: novaConta.id, nome: novaConta.nome };
}

// Verifica as credenciais e inicia a sessão.
export function entrar(nome, senha) {
  const nomeNormalizado = nome.trim().toLowerCase();

  const conta = listarContas().find(
    (item) =>
      item.nome.toLowerCase() === nomeNormalizado &&
      item.senha === senha
  );

  if (!conta) {
    throw new Error("Nome de usuário ou senha incorretos.");
  }

  const sessao = {
    id: conta.id,
    nome: conta.nome,
  };

  localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));

  return sessao;
}

// Retorna a conta conectada.
export function obterContaAtual() {
  const sessao = localStorage.getItem(CHAVE_SESSAO);

  return sessao ? JSON.parse(sessao) : null;
}

// Encerra a sessão, sem excluir a conta ou os currículos.
export function sair() {
  localStorage.removeItem(CHAVE_SESSAO);
}
