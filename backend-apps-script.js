// BACKEND PRIVADO — GOOGLE APPS SCRIPT — TRÊS ESCOLAS
const APPS_SCRIPT_JOAO_PRADO = "https://script.google.com/macros/s/AKfycbyr_lU3SgzvkExYJFrsJChdJ72g9PZXBXPpJnT2N0CcSN3R_F2j4RoWZFzzYnf-aztT/exec";
const CHAVE_CORRECAO_PENDENTE = "site-provas:correcao-pendente:v1";

const iniciarProvaSemServidor = iniciarProva;
const finalizarProvaLocalAntesDoBackend = finalizarProva;
let consultaServidorEmAndamento = false;

function chamarAppsScriptJSONP(parametros, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const callback = `__prova_backend_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const params = new URLSearchParams({ ...parametros, callback });
    let concluido = false;

    const limpar = () => {
      if (concluido) return;
      concluido = true;
      clearTimeout(timer);
      try { delete window[callback]; } catch (e) { window[callback] = undefined; }
      script.remove();
    };

    window[callback] = dados => {
      limpar();
      resolve(dados);
    };

    script.onerror = () => {
      limpar();
      reject(new Error("Não foi possível acessar o servidor da prova."));
    };

    const timer = setTimeout(() => {
      limpar();
      reject(new Error("Tempo limite ao acessar o servidor da prova."));
    }, timeout);

    script.src = `${APPS_SCRIPT_JOAO_PRADO}?${params.toString()}`;
    document.head.appendChild(script);
  });
}

function tentativaIdAtual() {
  const inicio = inicioTimestamp || Date.now();
  const nome = normalizarTexto(aluno || alunoSelecionado || "aluno").replace(/\s+/g, "-");
  return `${PROVA_ID_ATUAL}-${inicio}-${nome}`;
}

function salvarCorrecaoPendente(payload) {
  try { localStorage.setItem(CHAVE_CORRECAO_PENDENTE, JSON.stringify(payload)); } catch (e) {}
}

function lerCorrecaoPendente() {
  try {
    const bruto = localStorage.getItem(CHAVE_CORRECAO_PENDENTE);
    return bruto ? JSON.parse(bruto) : null;
  } catch (e) {
    return null;
  }
}

function removerCorrecaoPendente() {
  try { localStorage.removeItem(CHAVE_CORRECAO_PENDENTE); } catch (e) {}
}

function registrarConclusaoLocalComDados(payload, motivo) {
  if (typeof alunoEhTeste === "function" && alunoEhTeste(payload?.aluno)) return;

  try {
    const dados = lerConclusoesLocais();
    dados[chaveConclusao(payload.escolaId, payload.aluno)] = {
      provaId: PROVA_ID_ATUAL,
      escolaId: payload.escolaId,
      escolaNome: payload.escolaNome,
      aluno: payload.aluno,
      concluidaEm: new Date().toISOString(),
      motivo: motivo || payload.motivo || "Prova finalizada"
    };
    localStorage.setItem(CHAVE_CONCLUIDAS, JSON.stringify(dados));
  } catch (e) {}
}

async function verificarAlunoNoServidor(nome, escolaSelecionada = "") {
  if (typeof alunoEhTeste === "function" && alunoEhTeste(nome)) {
    return { ok: true, bloqueado: false, modoTeste: true };
  }

  const escolaParaConsulta =
    escolaSelecionada ||
    document.querySelector("#escola-aluno")?.value ||
    (typeof escolaId !== "undefined" ? escolaId : "");

  return chamarAppsScriptJSONP({
    acao: "verificar",
    escola: escolaParaConsulta,
    aluno: nome
  });
}

async function validarAlunoSelecionadoServidor(nome) {
  const botao = document.querySelector("#btn-iniciar");
  const erro = document.querySelector("#erro-identificacao");
  const escolaSelecionada = document.querySelector("#escola-aluno")?.value || "";
  if (!botao || !erro || !nome || !["joao-prado", "maria-vera", "armando-gomes"].includes(escolaSelecionada)) return;

  if (typeof alunoEhTeste === "function" && alunoEhTeste(nome)) {
    erro.textContent = "Modo de teste: esta tentativa não será registrada.";
    botao.disabled = false;
    botao.removeAttribute("aria-disabled");
    return;
  }

  botao.disabled = true;
  erro.textContent = "Verificando se esta avaliação já foi realizada...";

  try {
    const resposta = await verificarAlunoNoServidor(nome, escolaSelecionada);
    if (!resposta?.ok) throw new Error(resposta?.erro || "Falha na validação.");

    if (resposta.bloqueado) {
      registrarConclusaoLocalComDados({
        escolaId: escolaSelecionada,
        escolaNome: escolas[escolaSelecionada].nome,
        aluno: nome,
        motivo: "Bloqueado pelo servidor"
      }, "Bloqueado pelo servidor");
      erro.textContent = "Esta avaliação já foi realizada por este aluno. Uma nova tentativa precisa ser liberada pelo professor.";
      botao.disabled = true;
      return;
    }

    // Se o professor liberou pelo Apps Script, remove um bloqueio local antigo.
    removerConclusaoLocal(escolaSelecionada, nome);
    erro.textContent = "";
    botao.disabled = false;
    botao.removeAttribute("aria-disabled");
  } catch (e) {
    if (alunoJaConcluiuLocal(escolaSelecionada, nome)) {
      atualizarAvisoSegundaTentativa();
    } else {
      erro.textContent = "Não foi possível validar a tentativa agora. Verifique a internet antes de iniciar.";
      botao.disabled = false;
    }
  }
}

const selecionarAlunoAntesDoServidor = selecionarAluno;
selecionarAluno = function (nome) {
  selecionarAlunoAntesDoServidor(nome);
  const escolaSelecionada = document.querySelector("#escola-aluno")?.value || "";
  if (["joao-prado", "maria-vera", "armando-gomes"].includes(escolaSelecionada)) {
    validarAlunoSelecionadoServidor(nome);
  }
};

async function validarInicioComServidor() {
  if (consultaServidorEmAndamento) return;

  const erro = document.querySelector("#erro-identificacao");
  const botao = document.querySelector("#btn-iniciar");
  const escolaSelecionada = document.querySelector("#escola-aluno")?.value || "";
  const nomeSelecionado = alunoSelecionado || "";

  if (!["joao-prado", "maria-vera", "armando-gomes"].includes(escolaSelecionada)) return;

  if (!nomeSelecionado || !escolas[escolaSelecionada].alunos.includes(nomeSelecionado)) {
    erro.textContent = "Pesquise e selecione seu nome na lista da turma.";
    return;
  }

  if (typeof alunoEhTeste === "function" && alunoEhTeste(nomeSelecionado)) {
    erro.textContent = "";
    botao.disabled = false;
    iniciarProvaSemServidor();
    return;
  }

  consultaServidorEmAndamento = true;
  botao.disabled = true;
  erro.textContent = "Validando sua tentativa...";

  try {
    const resposta = await verificarAlunoNoServidor(nomeSelecionado, escolaSelecionada);
    if (!resposta?.ok) throw new Error(resposta?.erro || "Falha na validação.");

    if (resposta.bloqueado) {
      registrarConclusaoLocalComDados({
        escolaId: escolaSelecionada,
        escolaNome: escolas[escolaSelecionada].nome,
        aluno: nomeSelecionado,
        motivo: "Bloqueado pelo servidor"
      }, "Bloqueado pelo servidor");
      erro.textContent = "Esta avaliação já foi realizada por este aluno. Uma nova tentativa precisa ser liberada pelo professor.";
      botao.disabled = true;
      return;
    }

    removerConclusaoLocal(escolaSelecionada, nomeSelecionado);
    erro.textContent = "";
    botao.disabled = false;
    iniciarProvaSemServidor();
  } catch (e) {
    erro.textContent = "Não foi possível confirmar sua tentativa no servidor. Verifique a conexão com a internet e tente novamente.";
    botao.disabled = false;
  } finally {
    consultaServidorEmAndamento = false;
  }
}

// Intercepta o início antes da função antiga do arquivo-base.
document.querySelector("#btn-iniciar")?.addEventListener("click", evento => {
  const escolaSelecionada = document.querySelector("#escola-aluno")?.value || "";
  if (!["joao-prado", "maria-vera", "armando-gomes"].includes(escolaSelecionada)) return;
  evento.preventDefault();
  evento.stopImmediatePropagation();
  validarInicioComServidor();
}, true);

function fecharConexaoAbertaServidor() {
  if (typeof conexaoEventos === "undefined") return;
  const aberto = [...conexaoEventos].reverse().find(item => !item.fim);
  if (!aberto) return;
  aberto.fim = new Date().toISOString();
  aberto.duracaoSegundos = Math.max(0, Math.round((new Date(aberto.fim) - new Date(aberto.inicio)) / 1000));
  aberto.retorno = "Encerramento da prova";
}

function montarPayloadServidor(motivo) {
  fecharConexaoAbertaServidor();
  return {
    escolaId,
    escolaNome,
    aluno,
    tentativaId: tentativaIdAtual(),
    respostas: { ...respostas },
    ordemQuestoes: questoes.map(q => q.id),
    temposQuestoes: typeof obterTemposQuestoes === "function" ? obterTemposQuestoes() : {},
    ocorrencias: ocorrenciasTexto(),
    tempo: formatarTempo(tempoUtilizado()),
    motivo,
    criadoEm: new Date().toISOString()
  };
}

async function corrigirNoServidor(payload) {
  return chamarAppsScriptJSONP({
    acao: "corrigir",
    escola: payload.escolaId,
    aluno: payload.aluno,
    tentativaId: payload.tentativaId,
    respostas: JSON.stringify(payload.respostas),
    ocorrencias: payload.ocorrencias,
    tempo: payload.tempo,
    motivo: payload.motivo
  }, 20000);
}

function letrasRespostasPayload(payload) {
  const letras = ["A", "B", "C", "D", "E"];
  return payload.ordemQuestoes.map(id => `${String(id).toUpperCase()}: ${payload.respostas[id] === undefined ? "Sem resposta" : letras[payload.respostas[id]]}`).join(" | ");
}

function detalhesServidorTexto(payload, detalhes) {
  return payload.ordemQuestoes.map((id, i) => `Q${i + 1}: ${detalhes[id] ? "Acertou" : "Errou"}`).join(" | ");
}

function renderizarResultadoServidor(payload, resultado) {
  const detalhes = resultado.detalhes || {};
  document.querySelector("#resultado-aluno").textContent = payload.aluno;
  document.querySelector("#resultado-escola").textContent = payload.escolaNome;
  document.querySelector("#total-acertos").textContent = `${resultado.acertos}/${resultado.total}`;
  document.querySelector("#tempo-final").textContent = payload.tempo;
  document.querySelector("#saidas-final").textContent = Array.isArray(ocorrencias) ? ocorrencias.length : 0;

  document.querySelector("#lista-resultado").innerHTML = payload.ordemQuestoes.map((id, i) => {
    const correta = Boolean(detalhes[id]);
    return `<div class="resultado-item ${correta ? "correta" : "errada"}"><span>Questão ${i + 1}</span><span class="status">${correta ? "✓ Acertou" : "✕ Errou"}</span></div>`;
  }).join("");

  if (payload.motivo.includes("Limite")) {
    document.querySelector("#resultado-titulo").textContent = "Prova encerrada automaticamente";
    document.querySelector("#resultado-icone").textContent = "!";
  } else {
    document.querySelector("#resultado-titulo").textContent = "Prova finalizada";
    document.querySelector("#resultado-icone").textContent = "✓";
  }

  mostrarTela("#tela-resultado");
}

function renderizarResultadoPendente(payload) {
  document.querySelector("#resultado-aluno").textContent = payload.aluno;
  document.querySelector("#resultado-escola").textContent = payload.escolaNome;
  document.querySelector("#total-acertos").textContent = "Pendente";
  document.querySelector("#tempo-final").textContent = payload.tempo;
  document.querySelector("#saidas-final").textContent = Array.isArray(ocorrencias) ? ocorrencias.length : 0;
  document.querySelector("#resultado-titulo").textContent = "Prova finalizada — aguardando envio";
  document.querySelector("#resultado-icone").textContent = "!";
  document.querySelector("#lista-resultado").innerHTML = '<div class="resultado-item"><span>A correção será concluída automaticamente quando a conexão com o servidor voltar.</span></div>';
  document.querySelector("#status-envio").textContent = "As respostas estão salvas neste computador e ainda não foram corrigidas pelo servidor.";
  mostrarTela("#tela-resultado");
}

function finalizarEstadoLocalServidor(payload) {
  try { clearInterval(heartbeatTimer); } catch (e) {}
  try { atualizarResultadoConexao(); } catch (e) {}
  try { encerrarBackupLocal(); } catch (e) {}
  registrarConclusaoLocalComDados(payload, payload.motivo);
}

async function processarResultadoServidor(payload, resultado) {
  if (!resultado?.ok) {
    if (resultado?.jaRealizou) {
      removerCorrecaoPendente();
      finalizarEstadoLocalServidor(payload);
      document.querySelector("#resultado-aluno").textContent = payload.aluno;
      document.querySelector("#resultado-escola").textContent = payload.escolaNome;
      document.querySelector("#resultado-titulo").textContent = "Tentativa não aceita";
      document.querySelector("#resultado-icone").textContent = "!";
      document.querySelector("#total-acertos").textContent = "—";
      document.querySelector("#tempo-final").textContent = payload.tempo;
      document.querySelector("#saidas-final").textContent = "—";
      document.querySelector("#lista-resultado").innerHTML = '<div class="resultado-item"><span>O servidor informou que este aluno já havia concluído esta avaliação.</span></div>';
      document.querySelector("#status-envio").textContent = "Nenhuma segunda tentativa foi registrada.";
      mostrarTela("#tela-resultado");
      return;
    }
    throw new Error(resultado?.erro || "O servidor não conseguiu corrigir a prova.");
  }

  removerCorrecaoPendente();
  renderizarResultadoServidor(payload, resultado);
  finalizarEstadoLocalServidor(payload);

  const detalhesTexto = detalhesServidorTexto(payload, resultado.detalhes || {});
  enviarParaForms({
    escola: payload.escolaNome,
    nome: payload.aluno,
    respostas: letrasRespostasPayload(payload),
    acertos: `${resultado.acertos}/${resultado.total}`,
    detalhes: detalhesTexto,
    ocorrencias: payload.ocorrencias,
    tempo: payload.tempo,
    encerramento: payload.motivo
  }, payload.escolaId);
}

finalizarProva = async function (motivo) {
  if (typeof alunoEhTeste === "function" && alunoEhTeste()) {
    await finalizarProvaTesteLocal(motivo);
    return;
  }

  if (!["joao-prado", "maria-vera", "armando-gomes"].includes(escolaId)) {
    await finalizarProvaLocalAntesDoBackend(motivo);
    if (typeof registrarConclusaoLocal === "function") registrarConclusaoLocal(motivo);
    return;
  }

  if (finalizando) return;
  finalizando = true;
  provaAtiva = false;
  clearInterval(timer);
  document.querySelector("#modal-ocorrencia")?.classList.remove("ativo");

  const payload = montarPayloadServidor(motivo);
  salvarCorrecaoPendente(payload);
  registrarConclusaoLocalComDados(payload, "Aguardando confirmação do servidor");

  if (document.fullscreenElement && document.exitFullscreen) {
    try { await document.exitFullscreen(); } catch (e) {}
  }

  try {
    const resultado = await corrigirNoServidor(payload);
    await processarResultadoServidor(payload, resultado);
  } catch (e) {
    renderizarResultadoPendente(payload);
    try { clearInterval(heartbeatTimer); } catch (erro) {}
    try { atualizarResultadoConexao(); } catch (erro) {}
    try { encerrarBackupLocal(); } catch (erro) {}
  }
};

async function processarCorrecaoPendente() {
  const payload = lerCorrecaoPendente();
  if (!payload || !navigator.onLine) return;
  try {
    const resultado = await corrigirNoServidor(payload);
    await processarResultadoServidor(payload, resultado);
  } catch (e) {
    // Mantém a fila local até a próxima tentativa de conexão.
  }
}

window.addEventListener("online", () => {
  processarCorrecaoPendente();
  const escolaSelecionada = document.querySelector("#escola-aluno")?.value || "";
  if (alunoSelecionado && ["joao-prado", "maria-vera", "armando-gomes"].includes(escolaSelecionada)) {
    validarAlunoSelecionadoServidor(alunoSelecionado);
  }
});
window.addEventListener("pageshow", processarCorrecaoPendente);
setTimeout(processarCorrecaoPendente, 1800);
