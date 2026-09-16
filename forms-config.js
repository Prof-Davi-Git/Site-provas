// CONFIGURAÇÃO DO GOOGLE FORMS POR ESCOLA — 16/09/2026
// Cada escola terá seu próprio formulário de recebimento.
// O aluno não abre o Forms: o site envia os dados em segundo plano.

const FORM_CONFIGS_POR_ESCOLA = {
  "joao-prado": {
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdIxIfTylgd-x42tcxuVskMczAxvXjk8TU4pssFgyp7K88TrQ/formResponse",
    campos: {
      escola: "entry.1040989446",
      nome: "entry.1909483103",
      respostas: "entry.1519667597",
      acertos: "entry.1079224075",
      detalhes: "entry.307968804",
      ocorrencias: "entry.307524154",
      tempo: "entry.1401625991",
      encerramento: "entry.1522914777"
    }
  },

  // Os formulários abaixo serão configurados quando o professor enviar
  // os respectivos links pré-preenchidos.
  "maria-vera": null,
  "armando-gomes": null
};

function limparConfigFormsAtiva() {
  FORM_CONFIG.url = "";
  Object.keys(FORM_CONFIG.campos).forEach(chave => {
    FORM_CONFIG.campos[chave] = "";
  });
}

function aplicarConfigFormsDaEscola(escolaSelecionada) {
  limparConfigFormsAtiva();

  const id = escolaSelecionada ||
    (typeof escolaId !== "undefined" ? escolaId : "") ||
    document.querySelector("#escola-aluno")?.value ||
    "";

  const config = FORM_CONFIGS_POR_ESCOLA[id];
  if (!config) return false;

  FORM_CONFIG.url = config.url;
  Object.assign(FORM_CONFIG.campos, config.campos);
  return true;
}

// Troca automaticamente o formulário quando o aluno escolhe a escola.
document.querySelector("#escola-aluno")?.addEventListener("change", event => {
  aplicarConfigFormsDaEscola(event.target.value);
});

// Garante a configuração correta também ao recuperar uma prova salva,
// mesmo quando a seleção da escola é restaurada pelo JavaScript.
const formularioConfiguradoOriginal = formularioConfigurado;
formularioConfigurado = function () {
  aplicarConfigFormsDaEscola();
  return formularioConfiguradoOriginal();
};

// Nenhum Forms fica ativo antes de a escola ser definida.
limparConfigFormsAtiva();
