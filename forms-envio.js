// ENVIO RESILIENTE AO GOOGLE FORMS — 16/09/2026
// Mantém uma fila local e tenta reenviar automaticamente quando a internet voltar.

const CHAVE_ENVIOS_PENDENTES = "site-provas:envios-pendentes:v1";

function lerEnviosPendentes() {
  try {
    const bruto = localStorage.getItem(CHAVE_ENVIOS_PENDENTES);
    const lista = bruto ? JSON.parse(bruto) : [];
    return Array.isArray(lista) ? lista : [];
  } catch (e) {
    return [];
  }
}

function salvarEnviosPendentes(lista) {
  try {
    localStorage.setItem(CHAVE_ENVIOS_PENDENTES, JSON.stringify(lista));
  } catch (e) {}
}

function removerEnvioPendente(id) {
  const lista = lerEnviosPendentes().filter(item => item.id !== id);
  salvarEnviosPendentes(lista);
}

function atualizarStatusEnvio(texto) {
  const status = document.querySelector("#status-envio");
  if (status) status.textContent = texto;
}

function criarPayloadForms(item) {
  const params = new URLSearchParams();
  const c = item.campos;
  const d = item.dados;

  params.set(c.escola, d.escola || "");
  params.set(c.nome, d.nome || "");
  params.set(c.respostas, d.respostas || "");
  params.set(c.acertos, d.acertos || "");
  params.set(c.detalhes, d.detalhes || "");
  params.set(c.ocorrencias, d.ocorrencias || "");
  params.set(c.tempo, d.tempo || "");
  params.set(c.encerramento, d.encerramento || "");

  return params;
}

async function tentarEnviarItemForms(item, mostrarStatus = true) {
  try {
    if (!navigator.onLine) throw new Error("offline");

    const resposta = await fetch(item.url, {
      method: "POST",
      mode: "no-cors",
      cache: "no-store",
      keepalive: true,
      body: criarPayloadForms(item)
    });

    // Em modo no-cors o navegador devolve uma resposta opaca. Se a Promise
    // resolveu, a requisição foi entregue à rede sem erro de transporte.
    removerEnvioPendente(item.id);
    if (mostrarStatus) atualizarStatusEnvio("Prova finalizada e enviada ao professor.");
    return true;
  } catch (e) {
    if (mostrarStatus) {
      atualizarStatusEnvio("Resultado salvo neste computador. O envio ao professor será tentado novamente quando a internet voltar.");
    }
    return false;
  }
}

async function reenviarPendentes() {
  if (!navigator.onLine) return;
  const pendentes = lerEnviosPendentes();
  for (const item of pendentes) {
    await tentarEnviarItemForms(item, false);
  }
}

// Substitui o envio antigo por um envio com fila local e retry automático.
enviarParaForms = function (dados) {
  if (typeof aplicarConfigFormsDaEscola === "function") {
    aplicarConfigFormsDaEscola();
  }

  if (!formularioConfigurado()) return false;

  const item = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    url: FORM_CONFIG.url,
    campos: { ...FORM_CONFIG.campos },
    dados: { ...dados },
    criadoEm: new Date().toISOString()
  };

  const fila = lerEnviosPendentes();
  fila.push(item);
  salvarEnviosPendentes(fila);

  // Não bloqueia a tela final. O envio acontece em paralelo.
  tentarEnviarItemForms(item, true);
  return true;
};

window.addEventListener("online", reenviarPendentes);
window.addEventListener("pageshow", reenviarPendentes);
setTimeout(reenviarPendentes, 1500);
