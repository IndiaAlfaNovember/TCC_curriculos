"use client";
import { useState } from "react";

export default function FormularioCurriculo() {
  const [dados, setDados] = useState({
    nome: "",
    contato: "",
    objetivo: "",
    formacao: "",
    experiencia: "",
    habilidades: "",
  });

  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setDados({
      ...dados,
      [name]: value,
    });
  }

  function enviarFormulario(evento) {
    evento.preventDefault();

    console.log(dados);

    alert("Currículo salvo com sucesso!");
  }

  return (
    <form onSubmit={enviarFormulario}>
      <h2>Crie seu Currículo</h2>

      <div>
        <label>Nome Completo</label>
        <input
          type="text"
          name="nome"
          value={dados.nome}
          onChange={atualizarCampo}
          required
          className="border-x-4 border-y-2 border-slate-100 bg-slate-200"
        />
      </div>

      <div>
        <label>Contato</label>
        <input
          type="text"
          name="contato"
          value={dados.contato}
          onChange={atualizarCampo}
          required
          className="border-x-4 border-y-2 border-slate-100 bg-slate-200"
        />
      </div>

      <div>
        <label>Objetivo Profissional</label>
        <textarea
          name="objetivo"
          value={dados.objetivo}
          onChange={atualizarCampo}
          required
          className="border-x-4 border-y-2 border-slate-100 bg-slate-200"
        />
      </div>

      <div>
        <label>Formação Acadêmica</label>
        <textarea
          name="formacao"
          value={dados.formacao}
          onChange={atualizarCampo}
          required
          className="border-x-4 border-y-2 border-slate-100 bg-slate-200"
        />
      </div>

      <div>
        <label>Experiência Profissional</label>
        <textarea
          name="experiencia"
          value={dados.experiencia}
          onChange={atualizarCampo}
          className="border-x-4 border-y-2 border-slate-100 bg-slate-200"
        />
      </div>

      <div>
        <label>Habilidades</label>
        <textarea
          name="habilidades"
          value={dados.habilidades}
          onChange={atualizarCampo}
          className="border-x-4 border-y-2 border-slate-100 bg-slate-200"
        />
      </div>

      <button type="submit">
        Gerar Currículo
      </button>
    </form>
  );
}