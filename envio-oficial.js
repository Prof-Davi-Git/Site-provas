// ENVIO OFICIAL AO FORMS — 16/09/2026
// O Apps Script passa a ser o responsável principal pelo envio ao Forms.
// Enquanto o servidor antigo não informar formsEnviado=true, o navegador
// mantém o envio anterior como fallback para não perder respostas.

if (typeof corrigirNoServidor === "function") {
  corrigirNoServidor = function (payload) {
    return chamarAppsScriptJSONP({
      acao: "corrigir",
      escola: payload.escolaId,
      aluno: payload.aluno,
      tentativaId: payload.tentativaId,
      respostas: JSON.stringify(payload.respostas),
      ordemQuestoes: JSON.stringify(payload.ordemQuestoes || []),
      temposQuestoes: JSON.stringify(payload.temposQuestoes || {}),
      ocorrencias: payload.ocorrencias,
      tempo: payload.tempo,
      motivo: payload.motivo
    }, 25000);
  };
}

if (typeof processarResultadoServidor === "function") {
  const processarResultadoServidorAntesDoEnvioOficial = processarResultadoServidor;

  processarResultadoServidor = async function (payload, resultado) {
    const envioOriginal = enviarParaForms;
    const servidorJaEnviouForms = Boolean(resultado && resultado.formsEnviado === true);

    if (servidorJaEnviouForms) {
      enviarParaForms = function () { return true; };
    }

    try {
      await processarResultadoServidorAntesDoEnvioOficial(payload, resultado);

      if (servidorJaEnviouForms) {
        const status = document.querySelector("#status-envio");
        if (status) {
          status.textContent = "Prova corrigida e recebida pelo professor com confirmação do servidor.";
        }
      }
    } finally {
      enviarParaForms = envioOriginal;
    }
  };
}
