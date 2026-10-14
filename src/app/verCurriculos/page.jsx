
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  listarCurriculos,
  excluirCurriculo,
} from "@/services/curriculos";

export default function VerCurriculos() {
  const [curriculos, setCurriculos] = useState([]);

  useEffect(() => {
    setCurriculos(listarCurriculos());
  }, []);

  function removerCurriculo(id) {
    const confirmou = window.confirm(
      "Deseja realmente excluir este currículo?"
    );

    if (!confirmou) return;

    const removido = excluirCurriculo(id);

    if (removido) {
      setCurriculos(listarCurriculos());
    }
  }

  return (
    <main>
      <h1>Currículos cadastrados</h1>

      <Link href="/adicionar">
        Adicionar currículo
      </Link>

      {curriculos.length === 0 ? (
        <p>Nenhum currículo cadastrado.</p>
      ) : (
        curriculos.map((curriculo) => (
          <article
            key={curriculo.id}
            className="mb-4 rounded border p-4"
          >
            <h2>{curriculo.nome}</h2>
            <p>{curriculo.contato}</p>
            <p>{curriculo.objetivo}</p>

            <Link
              href={`/verCurriculos/${curriculo.id}/editar`}
            >
              Editar
            </Link>

            <button
              type="button"
              onClick={() => removerCurriculo(curriculo.id)}
              className="ml-4"
            >
              Excluir
            </button>
          </article>
        ))
      )}
    </main>
  );
}
