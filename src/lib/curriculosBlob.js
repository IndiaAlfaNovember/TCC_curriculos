
import { get, put } from "@vercel/blob";

const CAMINHO = "dados/curriculos.json";

export async function lerCurriculos() {
  const resultado = await get(CAMINHO, {
    access: "private",
  });

  if (!resultado || resultado.statusCode !== 200) {
    return [];
  }

  const conteudo = await new Response(
    resultado.stream
  ).text();

  return JSON.parse(conteudo);
}

export async function salvarCurriculos(curriculos) {
  await put(
    CAMINHO,
    JSON.stringify(curriculos, null, 2),
    {
      access: "private",
      allowOverwrite: true,
      contentType: "application/json",
    }
  );
}
