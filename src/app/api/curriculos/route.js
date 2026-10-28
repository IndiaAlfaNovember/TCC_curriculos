
import { NextResponse } from "next/server";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

const ARQUIVO = path.join(
  process.cwd(),
  "src",
  "data",
  "curriculos.json"
);

async function lerCurriculos() {
  const conteudo = await readFile(ARQUIVO, "utf8");
  return JSON.parse(conteudo);
}

async function salvarCurriculos(curriculos) {
  await writeFile(
    ARQUIVO,
    JSON.stringify(curriculos, null, 2),
    "utf8"
  );
}

// GET: listar currículos.
export async function GET() {
  try {
    const curriculos = await lerCurriculos();
    return NextResponse.json(curriculos);
  } catch (erro) {
    console.error("Erro ao ler currículos:", erro);

    return NextResponse.json(
      { erro: "Não foi possível carregar os currículos." },
      { status: 500 }
    );
  }
}

// POST: criar currículo.
export async function POST(request) {
  try {
    const dados = await request.json();

    if (!dados.nome || !dados.contato || !dados.donoId) {
      return NextResponse.json(
        { erro: "Nome, contato e proprietário são obrigatórios." },
        { status: 400 }
      );
    }

    const curriculos = await lerCurriculos();

    const novoCurriculo = {
      ...dados,
      id: randomUUID(),
    };

    curriculos.push(novoCurriculo);

    await salvarCurriculos(curriculos);

    return NextResponse.json(novoCurriculo, { status: 201 });
  } catch (erro) {
    console.error("Erro ao criar currículo:", erro);

    return NextResponse.json(
      { erro: "Não foi possível criar o currículo." },
      { status: 500 }
    );
  }
}
