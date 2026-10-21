
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import FormularioCurriculo from "@/components/FormularioCurriculo";
import {
  listarMeusCurriculos,
  excluirCurriculo,
} from "@/services/curriculos";

export default function AdicionarCurriculo() {
  const [curriculos, setCurriculos] = useState([]);

  const carregarCurriculos = useCallback(() => {
    setCurriculos(listarMeusCurriculos());
  }, []);

  useEffect(() => {
    carregarCurriculos();
  }, [carregarCurriculos]);

  function removerCurriculo(id) {
    if (!window.confirm("Deseja excluir este currículo?")) {
      return;
    }

    try {
      excluirCurriculo(id);
      carregarCurriculos();
    } catch (erro) {
      alert(erro.message);
    }
  }

  return (
    <main className="space-y-8">
      <section>
        <h1>Adicionar currículo</h1>

        <FormularioCurriculo onSalvo={carregarCurriculos} />
      </section>

      <section>
        <h2>Meus currículos</h2>

        {curriculos.length === 0 ? (
          <p>Você ainda não criou nenhum currículo.</p>
        ) : (
          curriculos.map((curriculo) => (
            <article
              key={curriculo.id}
              className="mb-4 rounded border p-4"
            >
              <h3>{curriculo.nome}</h3>
              <p>{curriculo.objetivo}</p>

              <Link
                href={`/verCurriculos/${curriculo.id}/editar`}
              >
                Editar
              </Link>

              <button
                type="button"
                className="ml-4"
                onClick={() => removerCurriculo(curriculo.id)}
              >
                Excluir
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
