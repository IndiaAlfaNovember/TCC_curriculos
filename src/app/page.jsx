
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  criarConta,
  entrar,
  obterContaAtual,
  sair,
} from "@/services/auth";

export default function PaginaInicial() {
  const [conta, setConta] = useState(null);
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [modo, setModo] = useState("cadastro");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    setConta(obterContaAtual());
  }, []);

  function enviarFormulario(evento) {
    evento.preventDefault();
    setMensagem("");

    try {
      let usuario;

      if (modo === "cadastro") {
        usuario = criarConta(nome, senha);
      } else {
        usuario = entrar(nome, senha);
      }

      setConta(usuario);
      setNome("");
      setSenha("");
      setMensagem("Você entrou na sua conta.");
    } catch (erro) {
      setMensagem(erro.message);
    }
  }

  function trocarModo(novoModo) {
    setModo(novoModo);
    setMensagem("");
  }

  function fazerLogout() {
    sair();
    setConta(null);
    setMensagem("Você saiu da sua conta.");
  }

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-6">
      <h1 className="text-2xl font-bold">
        A melhor plataforma de currículos da Techers
      </h1>

      {!conta ? (
        <section className="space-y-4 rounded border p-6">
          <h2 className="text-xl font-semibold">
            {modo === "cadastro"
              ? "Criar conta"
              : "Entrar na conta"}
          </h2>

          <form
            onSubmit={enviarFormulario}
            className="space-y-4"
          >
            <div>
              <label htmlFor="nome">Nome de usuário</label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoComplete="username"
                required
                className="block w-full rounded border p-2"
              />
            </div>

            <div>
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete={
                  modo === "cadastro"
                    ? "new-password"
                    : "current-password"
                }
                required
                className="block w-full rounded border p-2"
              />
            </div>

            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              {modo === "cadastro"
                ? "Criar conta"
                : "Entrar"}
            </button>
          </form>

          <button
            type="button"
            onClick={() =>
              trocarModo(
                modo === "cadastro" ? "login" : "cadastro"
              )
            }
            className="underline"
          >
            {modo === "cadastro"
              ? "Já tenho uma conta"
              : "Quero criar uma conta"}
          </button>

          {mensagem && <p role="status">{mensagem}</p>}
        </section>
      ) : (
        <section className="space-y-3 rounded border p-6">
          <h2 className="text-xl font-semibold">
            Bem-vindo, {conta.nome}!
          </h2>

          <p>Você está conectado à sua conta.</p>

          <button
            type="button"
            onClick={fazerLogout}
            className="rounded border px-4 py-2"
          >
            Sair da conta
          </button>
        </section>
      )}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Navegação</h2>

        {conta ? (
          <>
            <Link
              href="/adicionar"
              className="block rounded bg-blue-600 p-3 text-center text-white"
            >
              Criar e gerenciar meus currículos
            </Link>

            <Link
              href="/verCurriculos"
              className="block rounded bg-blue-600 p-3 text-center text-white"
            >
              Ver currículos públicos
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              disabled
              className="block w-full cursor-not-allowed rounded bg-gray-300 p-3 text-gray-600"
            >
              Criar e gerenciar meus currículos — bloqueado
            </button>

            <button
              type="button"
              disabled
              className="block w-full cursor-not-allowed rounded bg-gray-300 p-3 text-gray-600"
            >
              Ver currículos públicos — bloqueado
            </button>

            <p>
              Crie uma conta ou entre para desbloquear a navegação.
            </p>
          </>
        )}
      </section>
    </main>
  );
}
