// RECUPERAÇÃO DE PROVA E MONITORAMENTO DE CONEXÃO
// Salva a tentativa no navegador e permite continuar no mesmo dispositivo/navegador.

const CHAVE_TENTATIVA = "site-provas:tentativa-ativa:v1";
const INTERVALO_HEARTBEAT_MS = 30000;

let prazoFinalRecuperacao = null;
let conexaoEventos = [];
let conexaoOffline = false;
let heartbeatTimer = null;

function agoraISO() {
  return new Date().toISOString();
}

function formatarDataHoraLocal(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  } catch (e) {
    return "";
  }
}

function lerTentativaSalva() {
  try {
    const bruto = localStorage.getItem(CHAVE_TENTATIVA);
    if (!bruto) return null;
    const dados = JSON.parse(bruto);
    return dados && dados.ativa ? dados : null;
  } catch (e) {
    return null;
  }
}

function salvarEstadoProva() {
  if (!provaAtiva || !aluno || finalizando) return;

  try {
    const dados = {
      versao: 1,
      ativa: true,
      escolaId,
      escolaNome,
      avaliacaoId: typeof avaliacaoIdAtual !== "undefined" ? avaliacaoIdAtual : "",
      provaId: typeof PROVA_ID_ATUAL !== "undefined" ? PROVA_ID_ATUAL : "",
      aluno,
      alunoSelecionado,
      indiceAtual,
      respostas,
      ocorrencias,
      inicioTimestamp,
      prazoFinal: prazoFinalRecuperacao,
      segundosRestantes,
      ordemQuestoes: questoes.map(q => q.id),
      conexaoEventos,
      conexaoOffline,
      salvoEm: Date.now()
    };
    localStorage.setItem(CHAVE_TENTATIVA, JSON.stringify(dados));
  } catch (e) {
    // Se o armazenamento local estiver bloqueado, a prova continua funcionando.
  }
}

function encerrarBackupLocal() {
  try {
    localStorage.removeItem(CHAVE_TENTATIVA);
  } catch (e) {}
  prazoFinalRecuperacao = null;
}

function reorganizarQuestoes(ordemIds) {
  if (!Array.isArray(ordemIds) || !ordemIds.length) return;
  const mapa = new Map(questoes.map(q => [q.id, q]));
  const ordenadas = ordemIds.map(id => mapa.get(id)).filter(Boolean);
  const extras = questoes.filter(q => !ordemIds.includes(q.id));
  if (ordenadas.length) questoes.splice(0, questoes.length, ...ordenadas, ...extras);
}

function criarInterfaceRecuperacao() {
  if (document.querySelector("#barra-conexao")) return;

  const estilo = document.createElement("style");
  estilo.textContent = `
    #barra-conexao{position:fixed;top:0;left:0;right:0;z-index:2000;padding:9px 16px;text-align:center;font:600 14px/1.35 "Segoe UI",Arial,sans-serif;display:none;border-bottom:1px solid rgba(0,0,0,.12)}
    #barra-conexao.offline{display:block;background:#fff2cc;color:#6d5200}
    #barra-conexao.online{display:block;background:#e7f5ec;color:#155d36}
    #modal-recuperacao{display:none;position:fixed;inset:0;z-index:2500;background:rgba(20,28,38,.78);align-items:center;justify-content:center;padding:20px}
    #modal-recuperacao.ativo{display:flex}
    #modal-recuperacao .recuperacao-card{width:min(520px,100%);background:#fff;border:1px solid #cfd5dc;border-top:4px solid #173f6b;border-radius:8px;padding:28px;box-shadow:0 12px 35px rgba(0,0,0,.22)}
    #modal-recuperacao h2{margin:0 0 10px;font-size:1.45rem}
    #modal-recuperacao p{color:#4f5965;line-height:1.55}
    #modal-recuperacao .dados-recuperacao{background:#f5f6f7;border:1px solid #dde2e7;border-radius:5px;padding:13px 15px;margin:16px 0;font-size:.94rem;line-height:1.6}
    #modal-recuperacao button{width:100%;border:0;border-radius:5px;padding:13px 18px;background:#173f6b;color:#fff;font-weight:700;font-size:1rem;cursor:pointer}
    #info-conexao-resultado{margin-top:14px;padding:12px 14px;border:1px solid #dde2e7;border-radius:5px;background:#f8f9fa;color:#4f5965;font-size:.92rem}
  `;
  document.head.appendChild(estilo);

  const barra = document.createElement("div");
  barra.id = "barra-conexao";
  barra.setAttribute("role", "status");
  barra.setAttribute("aria-live", "polite");
  document.body.appendChild(barra);

  const modal = document.createElement("div");
  modal.id = "modal-recuperacao";
  modal.innerHTML = `
    <div class="recuperacao-card">
      <h2>Prova em andamento encontrada</h2>
      <p>Esta tentativa foi salva neste computador. Para evitar perda de respostas ou reinício do tempo, a prova deve continuar de onde parou.</p>
      <div id="dados-recuperacao" class="dados-recuperacao"></div>
      <button id="btn-retomar-prova" type="button">Continuar prova</button>
    </div>
  `;
  document.body.appendChild(modal);
  document.querySelector("#btn-retomar-prova").addEventListener("click", retomarTentativa);
}

function mostrarBarraConexao(tipo, texto, ocultarDepois = false) {
  const barra = document.querySelector("#barra-conexao");
  if (!barra) return;
  barra.className = tipo;
  barra.textContent = texto;

  if (ocultarDepois) {
    setTimeout(() => {
      if (!conexaoOffline) {
        barra.style.display = "none";
        barra.className = "";
      }
    }, 5000);
  } else {
    barra.style.display = "";
  }
}

function marcarOffline(origem = "Navegador") {
  if (!provaAtiva || finalizando || conexaoOffline) return;
  conexaoOffline = true;
  conexaoEventos.push({
    inicio: agoraISO(),
    fim: null,
    duracaoSegundos: null,
    origem
  });
  mostrarBarraConexao("offline", "Sem conexão com a internet. A prova continua funcionando e suas respostas seguem salvas neste computador.");
  salvarEstadoProva();
}

function marcarOnline(origem = "Navegador") {
  if (!provaAtiva || finalizando) return;
  if (!conexaoOffline) return;

  conexaoOffline = false;
  const aberto = [...conexaoEventos].reverse().find(item => !item.fim);
  if (aberto) {
    aberto.fim = agoraISO();
    aberto.duracaoSegundos = Math.max(0, Math.round((new Date(aberto.fim) - new Date(aberto.inicio)) / 1000));
    aberto.retorno = origem;
  }

  mostrarBarraConexao("online", "Conexão restabelecida. A tentativa continua normalmente.", true);
  salvarEstadoProva();
}

async function verificarInternetReal() {
  if (!provaAtiva || finalizando) return;

  if (!navigator.onLine) {
    marcarOffline("Evento offline do navegador");
    return;
  }

  try {
    const controlador = new AbortController();
    const limite = setTimeout(() => controlador.abort(), 6000);
    const resposta = await fetch(`./ping.txt?t=${Date.now()}`, {
      method: "GET",
      cache: "no-store",
      signal: controlador.signal
    });
    clearTimeout(limite);

    if (!resposta.ok) throw new Error("Falha de conexão");
    marcarOnline("Teste de conexão");
  } catch (e) {
    marcarOffline("Teste de conexão");
  }
}

function iniciarHeartbeat() {
  clearInterval(heartbeatTimer);
  verificarInternetReal();
  heartbeatTimer = setInterval(verificarInternetReal, INTERVALO_HEARTBEAT_MS);
}

function resumoConexaoTexto() {
  if (!conexaoEventos.length) return "Nenhuma perda de conexão registrada";

  return conexaoEventos.map((evento, i) => {
    const inicio = formatarDataHoraLocal(evento.inicio);
    const fim = evento.fim ? formatarDataHoraLocal(evento.fim) : "não restabelecida";
    const duracao = evento.duracaoSegundos == null ? "duração não concluída" : `${evento.duracaoSegundos}s`;
    return `${i + 1}) offline ${inicio} → ${fim} (${duracao})`;
  }).join(" | ");
}

function atualizarResultadoConexao() {
  const tela = document.querySelector("#tela-resultado");
  if (!tela) return;

  let caixa = document.querySelector("#info-conexao-resultado");
  if (!caixa) {
    caixa = document.createElement("div");
    caixa.id = "info-conexao-resultado";
    const status = document.querySelector("#status-envio");
    if (status) status.before(caixa);
    else tela.appendChild(caixa);
  }

  caixa.textContent = conexaoEventos.length
    ? `Interrupções de internet registradas: ${conexaoEventos.length}. ${resumoConexaoTexto()}`
    : "Interrupções de internet registradas: nenhuma.";
}

function prepararModalRecuperacao(tentativa) {
  const modal = document.querySelector("#modal-recuperacao");
  const dados = document.querySelector("#dados-recuperacao");
  if (!modal || !dados) return;

  const numero = Math.min((tentativa.indiceAtual || 0) + 1, tentativa.ordemQuestoes?.length || questoes.length);
  const restante = tentativa.prazoFinal
    ? Math.max(0, Math.ceil((tentativa.prazoFinal - Date.now()) / 1000))
    : Math.max(0, tentativa.segundosRestantes || 0);

  dados.innerHTML = `
    <strong>${tentativa.aluno || "Aluno"}</strong><br>
    ${tentativa.escolaNome || ""}<br>
    Questão salva: ${numero} de ${tentativa.ordemQuestoes?.length || questoes.length}<br>
    Tempo restante agora: ${formatarTempo(restante)}
  `;

  modal.classList.add("ativo");
}

async function retomarTentativa() {
  const tentativa = lerTentativaSalva();
  if (!tentativa) {
    document.querySelector("#modal-recuperacao")?.classList.remove("ativo");
    return;
  }

  escolaId = tentativa.escolaId || "";
  escolaNome = tentativa.escolaNome || (escolas[escolaId]?.nome || "");
  aluno = tentativa.aluno || "";
  alunoSelecionado = tentativa.alunoSelecionado || aluno;
  indiceAtual = Math.max(0, Math.min(tentativa.indiceAtual || 0, questoes.length - 1));
  respostas = tentativa.respostas || {};
  ocorrencias = Array.isArray(tentativa.ocorrencias) ? tentativa.ocorrencias : [];
  inicioTimestamp = tentativa.inicioTimestamp || Date.now();
  prazoFinalRecuperacao = tentativa.prazoFinal || (Date.now() + Math.max(0, tentativa.segundosRestantes || 0) * 1000);
  segundosRestantes = Math.max(0, Math.ceil((prazoFinalRecuperacao - Date.now()) / 1000));
  conexaoEventos = Array.isArray(tentativa.conexaoEventos) ? tentativa.conexaoEventos : [];
  conexaoOffline = Boolean(tentativa.conexaoOffline);
  finalizando = false;

  const selectEscola = document.querySelector("#escola-aluno");
  if (selectEscola) selectEscola.value = escolaId;

  const selectAvaliacao = document.querySelector("#avaliacao-aluno");
  if (selectAvaliacao) selectAvaliacao.value = tentativa.avaliacaoId || "";

  if (typeof atualizarProvaDaEscola === "function") atualizarProvaDaEscola();
  if (tentativa.provaId && typeof PROVA_ID_ATUAL !== "undefined") PROVA_ID_ATUAL = tentativa.provaId;
  reorganizarQuestoes(tentativa.ordemQuestoes);

  if (typeof alterarEscola === "function") alterarEscola();

  // alterarEscola limpa a seleção, então restauramos depois.
  escolaId = tentativa.escolaId || "";
  escolaNome = tentativa.escolaNome || (escolas[escolaId]?.nome || "");
  aluno = tentativa.aluno || "";
  alunoSelecionado = tentativa.alunoSelecionado || aluno;

  const busca = document.querySelector("#busca-aluno");
  if (busca) busca.value = alunoSelecionado;
  if (typeof atualizarAlunoSelecionado === "function") atualizarAlunoSelecionado();

  document.querySelector("#nome-exibicao").textContent = aluno;
  document.querySelector("#escola-exibicao").textContent = escolaNome;
  document.querySelector("#contador-saidas").textContent = `${ocorrencias.length}/${LIMITE_OCORRENCIAS}`;

  document.querySelector("#modal-recuperacao")?.classList.remove("ativo");
  mostrarTela("#tela-prova");
  provaAtiva = true;
  renderizarQuestao();
  iniciarCronometro();
  iniciarHeartbeat();

  if (conexaoOffline) {
    mostrarBarraConexao("offline", "A tentativa foi recuperada. A conexão ainda está indisponível; as respostas continuam salvas localmente.");
  }

  await entrarTelaCheia();
  salvarEstadoProva();
}

// Cronômetro por horário real: fechar/recarregar a página não devolve tempo ao aluno.
const iniciarCronometroOriginal = iniciarCronometro;
iniciarCronometro = function () {
  clearInterval(timer);

  if (!prazoFinalRecuperacao) {
    prazoFinalRecuperacao = Date.now() + Math.max(0, segundosRestantes) * 1000;
  }

  const atualizar = () => {
    segundosRestantes = Math.max(0, Math.ceil((prazoFinalRecuperacao - Date.now()) / 1000));
    const cronometro = document.querySelector("#cronometro");
    if (cronometro) cronometro.textContent = formatarTempo(segundosRestantes);
    salvarEstadoProva();

    if (segundosRestantes <= 0) {
      clearInterval(timer);
      finalizarProva("Tempo esgotado");
    }
  };

  atualizar();
  timer = setInterval(atualizar, 1000);
  iniciarHeartbeat();
};

// Inclui as quedas de conexão no mesmo campo de relatório que já será enviado ao Forms.
const ocorrenciasTextoOriginal = ocorrenciasTexto;
ocorrenciasTexto = function () {
  return `${ocorrenciasTextoOriginal()} | CONEXÃO: ${resumoConexaoTexto()}`;
};

// Limpa a tentativa ativa apenas depois que a prova realmente termina.
const finalizarProvaOriginal = finalizarProva;
finalizarProva = async function (motivo) {
  if (finalizando) return;

  // Fecha uma queda de conexão em aberto apenas para registrar o estado até o encerramento.
  const aberto = [...conexaoEventos].reverse().find(item => !item.fim);
  if (aberto) {
    aberto.fim = agoraISO();
    aberto.duracaoSegundos = Math.max(0, Math.round((new Date(aberto.fim) - new Date(aberto.inicio)) / 1000));
    aberto.retorno = "Encerramento da prova";
  }

  await finalizarProvaOriginal(motivo);
  clearInterval(heartbeatTimer);
  atualizarResultadoConexao();
  encerrarBackupLocal();
};

// Autosave após ações importantes.
document.addEventListener("change", e => {
  if (provaAtiva && e.target?.name === "resposta") setTimeout(salvarEstadoProva, 0);
});

document.addEventListener("click", e => {
  if (provaAtiva && (e.target?.id === "btn-proxima" || e.target?.id === "btn-continuar")) {
    setTimeout(salvarEstadoProva, 0);
  }
});

document.addEventListener("visibilitychange", () => setTimeout(salvarEstadoProva, 0));
document.addEventListener("fullscreenchange", () => setTimeout(salvarEstadoProva, 0));
window.addEventListener("pagehide", salvarEstadoProva);
window.addEventListener("beforeunload", salvarEstadoProva);

// Queda de internet não conta como saída da prova.
window.addEventListener("offline", () => marcarOffline("Evento offline do navegador"));
window.addEventListener("online", () => verificarInternetReal());

// Registra o Service Worker para permitir que a página continue carregando offline.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js?v=20260917-9").catch(() => {});
  });
}

criarInterfaceRecuperacao();

const tentativaAoAbrir = lerTentativaSalva();
if (tentativaAoAbrir) {
  prepararModalRecuperacao(tentativaAoAbrir);
}
