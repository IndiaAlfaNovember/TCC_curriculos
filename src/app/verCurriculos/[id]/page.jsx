
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { buscarCurriculo } from "@/services/curriculos";

export default function DetalhesCurriculo() {
  const { id } = useParams();
  const [curriculo, setCurriculo] = useState(null);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    setCurriculo(buscarCurriculo(id));
    setCarregado(true);
  }, [id]);

  if (!carregado) {
    return <p>Carregando currículo...</p>;
  }

  if (!curriculo) {
    return <p>Currículo não encontrado.</p>;
  }

  return (
    <main className="space-y-4">
      <h1>{curriculo.nome}</h1>

      <section>
        <h2>Contato</h2>
        <p>{curriculo.contato}</p>
      </section>

      <section>
        <h2>Objetivo profissional</h2>
        <p>{curriculo.objetivo}</p>
      </section>

      <section>
        <h2>Formação acadêmica</h2>
        <p>{curriculo.formacao}</p>
      </section>

      <section>
        <h2>Experiência profissional</h2>
        <p>{curriculo.experiencia || "Não informado."}</p>
      </section>

      <section>
        <h2>Habilidades</h2>
        <p>{curriculo.habilidades || "Não informado."}</p>
      </section>

      <Link href="/verCurriculos">
        Voltar aos currículos
      </Link>
    </main>
  );
}
