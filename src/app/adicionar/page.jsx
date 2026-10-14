
"use client";

import { useRouter } from "next/navigation";
import FormularioCurriculo from "@/components/FormularioCurriculo";

export default function AdicionarCurriculo() {
  const router = useRouter();

  return (
    <FormularioCurriculo
      onSalvo={() => router.push("/verCurriculos")}
    />
  );
}