// ENVIO OFICIAL AO FORMS — 16/09/2026
// Quando o Apps Script confirmar que ele próprio enviou a resposta ao Forms,
// impede um segundo envio pelo navegador. Enquanto o servidor antigo não
// informar formsEnviado=true, o envio do navegador continua como fallback.

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
