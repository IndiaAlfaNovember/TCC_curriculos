
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FormularioCurriculo from "@/components/FormularioCurriculo";
import { listarMeusCurriculos } from "@/services/curriculos";

export default function EditarCurriculo() {
  const { id } = useParams();
  const router = useRouter();

  const [curriculo, setCurriculo] = useState(null);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    async function carregarCurriculo() {
      try {
        const meusCurriculos = await listarMeusCurriculos();

        const encontrado = meusCurriculos.find(
          (item) => String(item.id) === String(id)
        );

        if (!encontrado) {
          router.replace("/adicionar");
          return;
        }

        setCurriculo(encontrado);
      } catch (erro) {
        console.error("Erro ao carregar currículo:", erro);
        router.replace("/adicionar");
      } finally {
        setCarregado(true);
      }
    }

    carregarCurriculo();
  }, [id, router]);

  if (!carregado) {
    return <p>Carregando currículo...</p>;
  }

  if (!curriculo) {
    return null;
  }

  return (
    <main className="max-w-lg mx-auto">
      <h1>Editar currículo</h1>

      <FormularioCurriculo
        curriculoInicial={curriculo}
        onSalvo={() => router.push("/adicionar")}
      />
    </main>
  );
}
