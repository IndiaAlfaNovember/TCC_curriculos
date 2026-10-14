
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FormularioCurriculo from "@/components/FormularioCurriculo";
import { buscarCurriculo } from "@/services/curriculos";

export default function EditarCurriculo() {
  const { id } = useParams();
  const router = useRouter();

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
    <main>
      <FormularioCurriculo
        key={curriculo.id}
        curriculoInicial={curriculo}
        onSalvo={() => router.push("/verCurriculos")}
      />
    </main>
  );
}
