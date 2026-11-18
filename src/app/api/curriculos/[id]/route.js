
import { NextResponse } from "next/server";
import {
  lerCurriculos,
  salvarCurriculos,
} from "@/lib/curriculosBlob";

export const runtime = "nodejs";

// PUT: atualizar currículo
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const dados = await request.json();

    const curriculos = await lerCurriculos();

    const indice = curriculos.findIndex(
      (curriculo) => String(curriculo.id) === String(id)
    );

    if (indice === -1) {
      return NextResponse.json(
        { erro: "Currículo não encontrado." },
        { status: 404 }
      );
    }

    const atualizado = {
      ...curriculos[indice],
      ...dados,
      id: curriculos[indice].id,
      donoId: curriculos[indice].donoId,
    };

    curriculos[indice] = atualizado;

    await salvarCurriculos(curriculos);

    return NextResponse.json(atualizado);
  } catch (erro) {
    console.error("Erro ao atualizar currículo:", erro);

    return NextResponse.json(
      { erro: "Não foi possível atualizar o currículo." },
      { status: 500 }
    );
  }
}

// DELETE: excluir currículo
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const curriculos = await lerCurriculos();

    const existe = curriculos.some(
      (curriculo) => String(curriculo.id) === String(id)
    );

    if (!existe) {
      return NextResponse.json(
        { erro: "Currículo não encontrado." },
        { status: 404 }
      );
    }

    const restantes = curriculos.filter(
      (curriculo) => String(curriculo.id) !== String(id)
    );

    await salvarCurriculos(restantes);

    return NextResponse.json({ sucesso: true });
  } catch (erro) {
    console.error("Erro ao excluir currículo:", erro);

    return NextResponse.json(
      { erro: "Não foi possível excluir o currículo." },
      { status: 500 }
    );
  }
}
