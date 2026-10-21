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
    const meusCurriculos = listarMeusCurriculos();

    setCurriculo(
      meusCurriculos.find(
        (item) => String(item.id) === String(id)
      ) ?? null
    );

    setCarregado(true);
  }, [id]);
}