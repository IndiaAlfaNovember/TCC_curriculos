
"use client";

import { useState } from "react";
import {
  criarCurriculo,
  atualizarCurriculo,
} from "@/services/curriculos";

const dadosVazios = {
  nome: "",
  contato: "",
  objetivo: "",
  formacao: "",
  experiencia: "",
  habilidades: "",
};

export default function FormularioCurriculo({
  curriculoInicial = null,
  onSalvo,
}) {
  const [dados, setDados] = useState(() => ({
    ...dadosVazios,
    ...curriculoInicial,
  }));

  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setDados((atuais) => ({
      ...atuais,
      [name]: value,
    }));
  }

  function enviarFormulario(evento) {
    evento.preventDefault();

    try {
      if (curriculoInicial?.id) {
        atualizarCurriculo(curriculoInicial.id, dados);
      } else {
        criarCurriculo(dados);
      }

      setDados({ ...dadosVazios });

      alert("Currículo salvo com sucesso!");
      onSalvo?.();
    } catch (erro) {
      alert(erro.message);
    }
  }

  return (
    <form onSubmit={enviarFormulario}>
      <h2>
        {curriculoInicial ? "Editar currículo" : "Criar currículo"}
      </h2>

      <div>
        <label htmlFor="nome">Nome completo</label>
        <input
          id="nome"
          name="nome"
          value={dados.nome}
          onChange={atualizarCampo}
          required
          className="border-x-4 border-y-2 border-slate-100 bg-slate-200"
        />
      </div>

      <div>
        <label htmlFor="contato">Contato</label>
        <input
          id="contato"
          name="contato"
          value={dados.contato}
          onChange={atualizarCampo}
          required
          className="border-x-4 border-y-2 border-slate-100 bg-slate-200"
        />
      </div>

      <div>
        <label htmlFor="objetivo">Objetivo profissional</label>
        <textarea
          id="objetivo"
          name="objetivo"
          value={dados.objetivo}
          onChange={atualizarCampo}
          required
          className="border-x-4 border-y-2 border-slate-100 bg-slate-200"
        />
      </div>

      <div>
        <label htmlFor="formacao">Formação acadêmica</label>
        <textarea
          id="formacao"
          name="formacao"
          value={dados.formacao}
          onChange={atualizarCampo}
          required
          className="border-x-4 border-y-2 border-slate-100 bg-slate-200"
        />
      </div>

      <div>
        <label htmlFor="experiencia">Experiência profissional</label>
        <textarea
          id="experiencia"
          name="experiencia"
          value={dados.experiencia}
          onChange={atualizarCampo}
          className="border-x-4 border-y-2 border-slate-100 bg-slate-200"
        />
      </div>

      <div>
        <label htmlFor="habilidades">Habilidades</label>
        <textarea
          id="habilidades"
          name="habilidades"
          value={dados.habilidades}
          onChange={atualizarCampo}
          className="border-x-4 border-y-2 border-slate-100 bg-slate-200"
        />
      </div>

      <button type="submit">
        {curriculoInicial ? "Salvar alterações" : "Criar currículo"}
      </button>
    </form>
  );
}
