
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { listarCurriculosPublicos } from "@/services/curriculos.js";

export default function VerCurriculos() {
  const [curriculos, setCurriculos] = useState([]);

useEffect(() => {
  async function carregar() {
    try {
      const lista = await listarCurriculosPublicos();
      setCurriculos(lista);
    } catch (erro) {
      console.error(erro);
    }
  }

  carregar();
}, []);

  return (
    <main>
      <h1>Currículos públicos</h1>

      {curriculos.length === 0 ? (
        <p>Nenhum currículo público disponível.</p>
      ) : (
        curriculos.map((curriculo) => (
          <Link
            key={curriculo.id}
            href={`/verCurriculos/${curriculo.id}`}
            className="mb-4 block rounded border p-4"
          >
            <h2>{curriculo.nome}</h2>
            <p>{curriculo.objetivo}</p>
            <span>Ver currículo completo</span>
          </Link>
        ))
      )}
    </main>
  );
}
