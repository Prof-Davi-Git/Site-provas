// VERSÃO DE TESTE — 15/09/2026
// O gabarito abaixo existe apenas para permitir testar a plataforma agora.
// Antes de usar com alunos, a correção será movida para Google Apps Script,
// evitando deixar as respostas corretas no código público do GitHub Pages.

const MODO_DEMO = true;
const LIMITE_OCORRENCIAS = 3;
const TEMPO_PROVA_SEGUNDOS = 10 * 60;

// ATUALIZAÇÃO 17/09/2026 — usuário exclusivo para testes locais.
// Este nome nunca deve ser enviado ao Apps Script, Forms ou resultados oficiais.
const ALUNO_TESTE_NOME = "ALUNO TESTE — NÃO REGISTRA";

function alunoEhTeste(nome = aluno) {
  return String(nome || "").trim() === ALUNO_TESTE_NOME;
}

const FORM_CONFIG = {
  url: "", // Ex.: https://docs.google.com/forms/d/e/SEU_ID/formResponse
  campos: {
    escola: "",
    nome: "",
    respostas: "",
    acertos: "",
    detalhes: "",
    ocorrencias: "",
    tempo: "",
    encerramento: ""
  }
};

// LISTAS DAS TURMAS.
// Os nomes enviados pelo professor serão adicionados nos arrays correspondentes.
const escolas = {
  "maria-vera": {
    nome: "EE Maria Vera Lombardi Siqueira",
    alunos: [
      "ANA LETICIA CAITANO DA SILVA",
      "ARTHUR ANDERSON GOMES BATISTA",
      "ARTHUR EMANUEL DA SILVA",
      "BRUS ALEX MANRRIQUE QUISPE",
      "GABRIEL ANGELO MARTINS",
      "GUILHERME FELICIANO DA SILVA",
      "GUILHERME RODRIGUES DA SILVA",
      "ISAIAS FERREIRA DA SILVA",
      "IVAN GABRIEL BORGES DOS SANTOS",
      "JESSICA ROSA GARCIA",
      "JUAN FERREIRA SANTOS",
      "KAIO REQUENA",
      "LETICIA DA SILVA RODRIGUES BRITO",
      "LETICIA SOUZA ARAUJO",
      "MARCELY CASTRO RODRIGUES",
      "MATEUS SHIMURA DE OLIVEIRA JESUS",
      "MAYARA MACEDO DOS SANTOS",
      "MIKAELA CARDOSO BONFIM",
      "MURILO RIBEIRO DE OLIVEIRA",
      "RICKELMY ARAUJO ESTANISLAU DE OLIVEIRA",
      "ROGER MOURA SANTOS",
      "RYAN GUILHERME DA SILVA MAGALHAES",
      "THIFANY PEREIRA VIEIRA",
      "VICTOR HUGO DE ALBUQUERQUE FEITOSA."
    ]
  },
  "joao-prado": {
    nome: "EE Professor João Prado Margarido",
    alunos: [
      "ALUNO TESTE — NÃO REGISTRA",
      "ANA BEATRIZ CORDEIRO DA ROCHA",
      "ANA BEATRIZ DA SILVA VIEIRA",
      "BEATRIZ CAMILI GOMES BARBOSA",
      "BEYONCE THAWANE DOS SANTOS",
      "DAVI LIMA SOUZA",
      "DIOGO ROCHA",
      "EDUARDO HENRIQUE PEREIRA DOS SANTOS",
      "EDUARDO LUIS DA SILVA",
      "GABRIEL FELIPE BRAGANTE",
      "GUILHERME DIAS COSTA",
      "GUSTAVO DA SILVA JACQUES",
      "HIKARO JOAO FERREIRA DA SILVA",
      "IZADORA DA SILVA NOGUEIRA",
      "JHONATAN ALESSANDRO RODRIGUES SOUZA",
      "KAIC ACHILLES SOUZA DE LIMA",
      "KATHELYN BRAGA LIMA",
      "LARISSA NUNES BELO",
      "LORANNY THAIMY SCHIRATO DA SILVA",
      "LUCAS OLIVEIRA CARDOSO",
      "LUIZ FELIPE RAMOS PAIXAO",
      "MARIA EDUARDA DOS SANTOS ESTRELA",
      "MATHEUS HENRIQUE RODRIGUES DE ARAUJO",
      "NAYOB APARECIDA SANTOS FONTANA",
      "PABLO HENRIQUE FERREIRA MARTINS ARAUJO",
      "PAULO DAVI PIRES ANDRADE",
      "PEDRO SILVA BARBOSA",
      "RAFAEL JUVENCIO DOS SANTOS",
      "RYAN LEANDRO SANTOS MATOS",
      "SAMUEL DOS SANTOS CAMARGO",
      "SAMUEL GOMES DOS SANTOS",
      "TIAGO FERREIRA DE MEDEIROS",
      "VICTOR EMANUEL DE ALMEIDA NASCIMENTO",
      "WENDEL MAGALHAES",
      "YURI JUNIO DE ANDRADE SOUZA"
    ]
  },
  "armando-gomes": {
    nome: "EE Professor Armando Gomes de Araujo",
    alunos: [
      "ANA CAROLINA DE SOUZA LIMA",
      "ANDREW MAURICIO CELESTINO ALVES",
      "BEATRIZ SANTANA PEREIRA",
      "BRENNO SESSO TEIXEIRA",
      "DANIELLE LAISE DA SILVA MELLO",
      "EDUARDO LUIZ DE OLIVEIRA NUNES",
      "FERNANDA MARTINS FERNANDES",
      "GIOVANNA ARAUJO MOREIRA",
      "GUSTAVO FELIX LINO",
      "GUSTAVO FERREIRA LIMA",
      "HELOISE BATISTA GUIMARAES",
      "HENRIQUE MIGUEL DA SILVA MARTINS DE MORAES",
      "HENRY KENJI OZAKI FRANCO",
      "ISAAC SANTOS OLIVEIRA",
      "ISABELLA VITORIA ROCHA SANTOS",
      "LAURO MIGUEL GOMES DOS SANTOS",
      "LORRAYNE BARBOSA PINHEIRO",
      "LUCAS BARBOSA SANTOS",
      "LUIS FERNANDO BARBOSA MUNIZ",
      "LUIZ HENRIQUE DA SILVA FERREIRA",
      "LUIZ VICTOR FERNANDES CAETANO",
      "MARCELLO DE CASTRO HENRIQUES BIROLLI",
      "MARCOS VINICIUS AGNELO MOREIRA",
      "MATHEUS VINICIUS DA SILVA",
      "MICAELLY FIGUEREDO DE ABREU",
      "MIGUEL CARVALHO DA SILVA",
      "MIGUEL HENRIQUE OLIVEIRA GUEDES",
      "MIKAELA FERNANDA MOURA RODRIGUES",
      "MURILLO HENRIQUE DE SOUZA",
      "MURILO DA SILVA COSTA",
      "MURILO RANGEL SILVEIRA",
      "NATAN SILVA DE LIMA",
      "NICOLAS CORREIA DA SILVA",
      "PABLO RAMIREZ DA SILVA DE JESUS",
      "PEDRO GABRIEL SANTOS RIBEIRO",
      "PYETRO HENRIQUE SIQUEIRA RODRIGUES",
      "SOPHIA AMARANTE DO CARMO",
      "SOPHIA SANT ANA CASTILHO",
      "THIAGO VARELA DUARTE",
      "LISANDRO FERREIRA SANTOS DA SILVA",
      "PEDRO HENRIQUE SANTOS",
      "VITOR ERNESTO SILVA DO NASCIMENTO"
    ]
  }
};

const questoes = [
  {
    id: "q1",
    texto: "Qual comando é utilizado no MySQL para visualizar os bancos de dados disponíveis?",
    alternativas: ["SHOW TABLES", "SHOW DATABASES", "LIST DATABASES", "SELECT DATABASES"]
  },
  {
    id: "q2",
    texto: "No Git, qual é a função principal de um commit?",
    alternativas: ["Apagar o repositório", "Registrar uma versão das alterações", "Criar automaticamente um site", "Instalar o GitHub"]
  },
  {
    id: "q3",
    texto: "Em uma rede IPv4 com máscara /27, quantos endereços podem ser usados por hosts?",
    alternativas: ["14", "30", "62", "126"]
  },
  {
    id: "q4",
    texto: "Qual é o principal objetivo de um wireframe?",
    alternativas: ["Organizar os elementos da interface", "Criar o banco de dados", "Publicar o aplicativo", "Testar a velocidade da internet"]
  },
  {
    id: "q5",
    texto: "Em JavaScript, qual declaração é usada quando uma variável não deve receber um novo valor depois de criada?",
    alternativas: ["var", "let", "const", "value"]
  }
];

// GABARITO TEMPORÁRIO DA DEMONSTRAÇÃO.
const gabaritoDemo = { q1: 1, q2: 1, q3: 1, q4: 0, q5: 2 };

let escolaId = "";
let escolaNome = "";
let aluno = "";
let alunoSelecionado = "";
let indiceAtual = 0;
let respostas = {};
let ocorrencias = [];
let segundosRestantes = TEMPO_PROVA_SEGUNDOS;
let timer = null;
let provaAtiva = false;
let finalizando = false;
let inicioTimestamp = null;
let ultimaOcorrenciaTimestamp = 0;
let encerramentoSolicitado = false;

const $ = (seletor) => document.querySelector(seletor);
const telas = document.querySelectorAll(".tela");

function mostrarTela(id) {
  telas.forEach(t => t.classList.remove("ativa"));
  $(id).classList.add("ativa");
}

function normalizarTexto(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function atualizarAlunoSelecionado() {
  const caixa = $("#aluno-selecionado");
  if (!alunoSelecionado) {
    caixa.textContent = "";
    caixa.classList.add("oculto");
    return;
  }

  caixa.textContent = `Aluno selecionado: ${alunoSelecionado}`;
  caixa.classList.remove("oculto");
}

function selecionarAluno(nome) {
  alunoSelecionado = nome;
  $("#busca-aluno").value = nome;
  $("#erro-identificacao").textContent = "";
  atualizarAlunoSelecionado();
  renderizarAlunos("");
}

function renderizarAlunos(filtro = "") {
  const lista = $("#lista-alunos");
  lista.innerHTML = "";

  if (!escolaId || !escolas[escolaId]) return;

  const alunosDaEscola = [...escolas[escolaId].alunos].sort((a, b) =>
    a.localeCompare(b, "pt-BR", { sensitivity: "base" })
  );

  if (!alunosDaEscola.length) {
    const vazio = document.createElement("div");
    vazio.className = "lista-vazia";
    vazio.textContent = "A lista de alunos desta escola ainda será cadastrada.";
    lista.appendChild(vazio);
    return;
  }

  if (alunoSelecionado && $("#busca-aluno").value === alunoSelecionado && !filtro) {
    const trocar = document.createElement("button");
    trocar.type = "button";
    trocar.className = "aluno-opcao";
    trocar.textContent = "Trocar aluno selecionado";
    trocar.addEventListener("click", () => {
      alunoSelecionado = "";
      $("#busca-aluno").value = "";
      atualizarAlunoSelecionado();
      renderizarAlunos("");
      $("#busca-aluno").focus();
    });
    lista.appendChild(trocar);
    return;
  }

  const filtroNormalizado = normalizarTexto(filtro);
  const encontrados = alunosDaEscola.filter(nome =>
    !filtroNormalizado || normalizarTexto(nome).includes(filtroNormalizado)
  );

  if (!encontrados.length) {
    const vazio = document.createElement("div");
    vazio.className = "lista-vazia";
    vazio.textContent = "Nenhum aluno encontrado com essa pesquisa.";
    lista.appendChild(vazio);
    return;
  }

  encontrados.forEach(nome => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "aluno-opcao";
    botao.textContent = nome;
    botao.setAttribute("role", "option");
    botao.addEventListener("click", () => selecionarAluno(nome));
    lista.appendChild(botao);
  });
}

function alterarEscola() {
  escolaId = $("#escola-aluno").value;
  escolaNome = escolaId && escolas[escolaId] ? escolas[escolaId].nome : "";
  alunoSelecionado = "";
  aluno = "";
  $("#busca-aluno").value = "";
  $("#erro-identificacao").textContent = "";
  atualizarAlunoSelecionado();

  if (!escolaId) {
    $("#seletor-aluno").classList.add("oculto");
    $("#lista-alunos").innerHTML = "";
    return;
  }

  $("#seletor-aluno").classList.remove("oculto");
  renderizarAlunos("");
}

function filtrarAlunos() {
  const busca = $("#busca-aluno").value;
  if (alunoSelecionado && busca !== alunoSelecionado) {
    alunoSelecionado = "";
    atualizarAlunoSelecionado();
  }
  renderizarAlunos(busca);
}

function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60).toString().padStart(2, "0");
  const seg = Math.max(0, segundos % 60).toString().padStart(2, "0");
  return `${min}:${seg}`;
}

function tempoUtilizado() {
  return Math.max(0, TEMPO_PROVA_SEGUNDOS - segundosRestantes);
}

function iniciarCronometro() {
  $("#cronometro").textContent = formatarTempo(segundosRestantes);
  timer = setInterval(() => {
    segundosRestantes--;
    $("#cronometro").textContent = formatarTempo(segundosRestantes);
    if (segundosRestantes <= 0) finalizarProva("Tempo esgotado");
  }, 1000);
}

async function entrarTelaCheia() {
  if (document.fullscreenElement) return true;
  if (!document.documentElement.requestFullscreen) return false;

  if (solicitacaoTelaCheiaEmAndamento) {
    try {
      return await solicitacaoTelaCheiaEmAndamento;
    } catch (e) {
      return false;
    }
  }

  solicitacaoTelaCheiaEmAndamento = (async () => {
    try {
      await document.documentElement.requestFullscreen();
      return Boolean(document.fullscreenElement);
    } catch (e) {
      return false;
    } finally {
      setTimeout(() => {
        solicitacaoTelaCheiaEmAndamento = null;
      }, 120);
    }
  })();

  return await solicitacaoTelaCheiaEmAndamento;
}

function renderizarQuestao() {
  const questao = questoes[indiceAtual];
  const numero = indiceAtual + 1;
  const percentual = Math.round((numero / questoes.length) * 100);

  $("#numero-questao").textContent = `Questão ${numero} de ${questoes.length}`;
  $("#percentual-progresso").textContent = `${percentual}%`;
  $("#barra-progresso").style.width = `${percentual}%`;
  $("#texto-questao").textContent = questao.texto;
  $("#mensagem-resposta").textContent = "";
  $("#btn-proxima").textContent = numero === questoes.length ? "Finalizar e enviar" : "Próxima questão";

  const letras = ["A", "B", "C", "D", "E"];
  const ordemAlternativas = Array.isArray(questao.ordemAlternativas)
    ? questao.ordemAlternativas
    : questao.alternativas.map((_, indice) => indice);

  $("#alternativas").innerHTML = questao.alternativas.map((texto, i) => {
    const indiceOriginal = ordemAlternativas[i];
    const selecionada = respostas[questao.id] === indiceOriginal;
    return `
    <label class="alternativa ${selecionada ? "selecionada" : ""}">
      <input type="radio" name="resposta" value="${indiceOriginal}" ${selecionada ? "checked" : ""}>
      <span class="letra">${letras[i]}</span>
      <span>${texto}</span>
    </label>
  `;
  }).join("");

  document.querySelectorAll('.alternativa input').forEach(input => {
    input.addEventListener('change', () => {
      respostas[questao.id] = Number(input.value);
      document.querySelectorAll('.alternativa').forEach(el => el.classList.remove('selecionada'));
      input.closest('.alternativa').classList.add('selecionada');
    });
  });

  document.dispatchEvent(new CustomEvent("questao:renderizada", {
    detail: { id: questao.id }
  }));
}

async function iniciarProva() {
  if (!escolaId || !escolas[escolaId]) {
    $("#erro-identificacao").textContent = "Selecione sua escola para continuar.";
    return;
  }

  if (!alunoSelecionado || !escolas[escolaId].alunos.includes(alunoSelecionado)) {
    $("#erro-identificacao").textContent = "Pesquise e selecione seu nome na lista da turma.";
    return;
  }

  if (typeof prepararProvaParaAluno === "function") {
    prepararProvaParaAluno(escolaId, alunoSelecionado);
  }

  aluno = alunoSelecionado;
  escolaNome = escolas[escolaId].nome;
  $("#erro-identificacao").textContent = "";
  $("#nome-exibicao").textContent = aluno;
  $("#escola-exibicao").textContent = escolaNome;
  mostrarTela("#tela-prova");
  encerramentoSolicitado = false;
  provaAtiva = true;
  inicioTimestamp = Date.now();
  renderizarQuestao();
  iniciarCronometro();
  await entrarTelaCheia();
}

function proximaQuestao() {
  const questao = questoes[indiceAtual];
  if (respostas[questao.id] === undefined) {
    $("#mensagem-resposta").textContent = "Selecione uma alternativa antes de continuar.";
    return;
  }

  if (indiceAtual === questoes.length - 1) {
    finalizarProva("Concluída pelo aluno");
    return;
  }

  indiceAtual++;
  renderizarQuestao();
}

function mostrarEncerramentoImediato(motivo) {
  provaAtiva = false;
  clearInterval(timer);

  $("#modal-ocorrencia").classList.remove("ativo");
  $("#modal-ocorrencia").setAttribute("aria-hidden", "true");

  $("#resultado-aluno").textContent = aluno;
  $("#resultado-escola").textContent = escolaNome;
  $("#resultado-titulo").textContent = "Prova encerrada automaticamente";
  $("#resultado-icone").textContent = "!";
  $("#total-acertos").textContent = "Aguardando";
  $("#tempo-final").textContent = formatarTempo(tempoUtilizado());
  $("#saidas-final").textContent = ocorrencias.length;
  $("#lista-resultado").innerHTML =
    '<div class="resultado-item"><span>O limite de ocorrências foi atingido. A prova está sendo finalizada.</span></div>';
  $("#status-envio").textContent =
    "Enviando o resultado ao professor. Não feche esta página.";

  mostrarTela("#tela-resultado");
}

function registrarOcorrencia(tipo) {
  if (!provaAtiva || finalizando || encerramentoSolicitado) return;

  const agora = Date.now();
  if (agora - ultimaOcorrenciaTimestamp < 1200) return;
  ultimaOcorrenciaTimestamp = agora;

  const numeroQuestao = indiceAtual + 1;
  ocorrencias.push({
    tipo,
    questao: numeroQuestao,
    momento: formatarTempo(tempoUtilizado())
  });

  $("#contador-saidas").textContent = `${ocorrencias.length}/${LIMITE_OCORRENCIAS}`;

  if (ocorrencias.length >= LIMITE_OCORRENCIAS) {
    const motivo = `Limite de ${LIMITE_OCORRENCIAS} ocorrências atingido`;

    // Bloqueia a prova imediatamente antes de qualquer operação assíncrona.
    encerramentoSolicitado = true;
    mostrarEncerramentoImediato(motivo);

    Promise.resolve()
      .then(() => finalizarProva(motivo))
      .catch(() => {
        $("#total-acertos").textContent = "Pendente";
        $("#lista-resultado").innerHTML =
          '<div class="resultado-item"><span>O resultado ficou salvo neste computador e será enviado quando a conexão voltar.</span></div>';
        $("#status-envio").textContent =
          "Não foi possível concluir o envio agora. Mantenha esta página aberta ou reconecte a internet.";
      });
    return;
  }

  $("#modal-contador").textContent = `Ocorrência ${ocorrencias.length} de ${LIMITE_OCORRENCIAS}`;
  $("#modal-detalhe").textContent = `Registrada na questão ${numeroQuestao}.`;
  $("#modal-ocorrencia").classList.add("ativo");
  $("#modal-ocorrencia").setAttribute("aria-hidden", "false");
}

async function continuarProva() {
  if (!provaAtiva || finalizando || encerramentoSolicitado) return;

  const modal = $("#modal-ocorrencia");
  const detalhe = $("#modal-detalhe");
  const botao = $("#btn-continuar");

  if (document.fullscreenElement) {
    modal.classList.remove("ativo");
    modal.setAttribute("aria-hidden", "true");
    aguardandoRetornoTelaCheia = false;
    return;
  }

  aguardandoRetornoTelaCheia = true;
  botao.disabled = true;
  botao.textContent = "Voltando para tela cheia...";

  const entrou = await entrarTelaCheia();

  if (entrou && document.fullscreenElement) {
    aguardandoRetornoTelaCheia = false;
    modal.classList.remove("ativo");
    modal.setAttribute("aria-hidden", "true");
    botao.disabled = false;
    botao.textContent = "Continuar prova";
    return;
  }

  aguardandoRetornoTelaCheia = false;
  modal.classList.add("ativo");
  modal.setAttribute("aria-hidden", "false");
  detalhe.textContent = "A tela cheia não foi ativada. Clique novamente para continuar a prova.";
  botao.disabled = false;
  botao.textContent = "Voltar para tela cheia";
}

function corrigirDemo() {
  let acertos = 0;
  const detalhes = questoes.map((q, i) => {
    const correta = respostas[q.id] === gabaritoDemo[q.id];
    if (correta) acertos++;
    return { numero: i + 1, correta };
  });
  return { acertos, detalhes };
}

function letrasRespostas() {
  const letras = ["A", "B", "C", "D", "E"];
  return questoes.map(q => `${q.id.toUpperCase()}: ${respostas[q.id] === undefined ? "Sem resposta" : letras[respostas[q.id]]}`).join(" | ");
}

function detalhesTexto(detalhes) {
  return detalhes.map(item => `Q${item.numero}: ${item.correta ? "Acertou" : "Errou"}`).join(" | ");
}

function ocorrenciasTexto() {
  if (!ocorrencias.length) return "Nenhuma";
  return ocorrencias.map((o, i) => `${i + 1}) ${o.tipo} - Q${o.questao} - ${o.momento}`).join(" | ");
}

function formularioConfigurado() {
  return Boolean(FORM_CONFIG.url && Object.values(FORM_CONFIG.campos).every(Boolean));
}

function enviarParaForms(dados) {
  if (!formularioConfigurado()) return false;

  const form = document.createElement("form");
  form.method = "POST";
  form.action = FORM_CONFIG.url;
  form.target = "envio-forms";
  form.style.display = "none";

  const adicionar = (nome, valor) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = nome;
    input.value = valor;
    form.appendChild(input);
  };

  adicionar(FORM_CONFIG.campos.escola, dados.escola);
  adicionar(FORM_CONFIG.campos.nome, dados.nome);
  adicionar(FORM_CONFIG.campos.respostas, dados.respostas);
  adicionar(FORM_CONFIG.campos.acertos, dados.acertos);
  adicionar(FORM_CONFIG.campos.detalhes, dados.detalhes);
  adicionar(FORM_CONFIG.campos.ocorrencias, dados.ocorrencias);
  adicionar(FORM_CONFIG.campos.tempo, dados.tempo);
  adicionar(FORM_CONFIG.campos.encerramento, dados.encerramento);

  document.body.appendChild(form);
  form.submit();
  setTimeout(() => form.remove(), 1500);
  return true;
}

async function finalizarProvaTesteLocal(motivo) {
  if (finalizando) return;

  finalizando = true;
  encerramentoSolicitado = true;
  provaAtiva = false;
  clearInterval(timer);

  $("#modal-ocorrencia").classList.remove("ativo");
  $("#modal-ocorrencia").setAttribute("aria-hidden", "true");

  if (document.fullscreenElement && document.exitFullscreen) {
    try { await document.exitFullscreen(); } catch (erro) {}
  }

  $("#resultado-aluno").textContent = ALUNO_TESTE_NOME;
  $("#resultado-escola").textContent = escolaNome;
  $("#resultado-titulo").textContent = motivo.includes("Limite")
    ? "Teste encerrado automaticamente"
    : "Teste finalizado";
  $("#resultado-icone").textContent = motivo.includes("Limite") ? "!" : "✓";
  $("#total-acertos").textContent = "—";
  $("#tempo-final").textContent = formatarTempo(tempoUtilizado());
  $("#saidas-final").textContent = ocorrencias.length;
  $("#lista-resultado").innerHTML =
    '<div class="resultado-item"><span>Modo de teste concluído. A correção e o resultado não são registrados.</span></div>';
  $("#status-envio").textContent =
    "Nenhuma informação deste teste foi enviada ao Apps Script, Google Forms ou resultados oficiais.";

  try { clearInterval(heartbeatTimer); } catch (erro) {}
  try { encerrarBackupLocal(); } catch (erro) {}

  mostrarTela("#tela-resultado");
}

// Finalização antiga mantida apenas como base de compatibilidade.
async function finalizarProva(motivo) {
  if (finalizando) return;
  finalizando = true;
  provaAtiva = false;
  clearInterval(timer);

  $("#modal-ocorrencia").classList.remove("ativo");

  if (document.fullscreenElement && document.exitFullscreen) {
    try { await document.exitFullscreen(); } catch (e) {}
  }

  const resultado = corrigirDemo();
  const tempo = formatarTempo(tempoUtilizado());

  $("#resultado-aluno").textContent = aluno;
  $("#resultado-escola").textContent = escolaNome;
  $("#total-acertos").textContent = `${resultado.acertos}/${questoes.length}`;
  $("#tempo-final").textContent = tempo;
  $("#saidas-final").textContent = ocorrencias.length;

  $("#lista-resultado").innerHTML = resultado.detalhes.map(item => `
    <div class="resultado-item ${item.correta ? "correta" : "errada"}">
      <span>Questão ${item.numero}</span>
      <span class="status">${item.correta ? "✓ Acertou" : "✕ Errou"}</span>
    </div>
  `).join("");

  const enviado = enviarParaForms({
    escola: escolaNome,
    nome: aluno,
    respostas: letrasRespostas(),
    acertos: `${resultado.acertos}/${questoes.length}`,
    detalhes: detalhesTexto(resultado.detalhes),
    ocorrencias: ocorrenciasTexto(),
    tempo,
    encerramento: motivo
  });

  $("#status-envio").textContent = enviado
    ? "Prova finalizada e enviada ao professor."
    : "Avaliação concluída neste dispositivo. O envio ao professor ainda não foi configurado para esta escola.";

  if (motivo.includes("Limite")) {
    $("#resultado-titulo").textContent = "Prova encerrada automaticamente";
    $("#resultado-icone").textContent = "!";
  }

  mostrarTela("#tela-resultado");
}


// ATUALIZAÇÃO 17/09/2026 — consulta autorizada em nova aba.
// O Canva recusa carregamento dentro de iframe. Enquanto o painel de material
// estiver ativo, a saída necessária para abrir os slides não gera ocorrência.
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) return;
  if (window.materialConsultaAberto === true) return;

  registrarOcorrencia("Aba ou janela ocultada");
});

window.addEventListener("blur", () => {
  if (window.materialConsultaAberto === true) return;
  setTimeout(() => {
    const visualizador = document.querySelector("#visualizador-material");
    if (window.materialInternoAberto === true && document.activeElement === visualizador) return;
    registrarOcorrencia("Janela perdeu o foco");
  }, 0);
});

// A abertura do material pode retirar a tela cheia. O botão "Voltar para a prova"
// solicita a tela cheia novamente antes de reativar o monitoramento.
function manterProvaBloqueadaForaDaTelaCheia() {
  if (!provaAtiva || finalizando || encerramentoSolicitado || document.fullscreenElement) return;

  const modal = $("#modal-ocorrencia");
  const detalhe = $("#modal-detalhe");
  const botao = $("#btn-continuar");

  modal.classList.add("ativo");
  modal.setAttribute("aria-hidden", "false");

  if (detalhe && !detalhe.textContent) {
    detalhe.textContent = "Retorne para tela cheia para continuar a prova.";
  }

  if (botao) {
    botao.disabled = false;
    if (!aguardandoRetornoTelaCheia) botao.textContent = "Voltar para tela cheia";
  }
}

document.addEventListener("fullscreenchange", () => {
  if (window.materialConsultaAberto === true) return;

  if (provaAtiva && !document.fullscreenElement) {
    registrarOcorrencia("Saiu da tela cheia");
    manterProvaBloqueadaForaDaTelaCheia();
    return;
  }

  if (provaAtiva && document.fullscreenElement && aguardandoRetornoTelaCheia) {
    const modal = $("#modal-ocorrencia");
    const botao = $("#btn-continuar");
    modal.classList.remove("ativo");
    modal.setAttribute("aria-hidden", "true");
    aguardandoRetornoTelaCheia = false;
    if (botao) {
      botao.disabled = false;
      botao.textContent = "Continuar prova";
    }
  }
});

document.addEventListener("fullscreenerror", () => {
  manterProvaBloqueadaForaDaTelaCheia();
});

// ATUALIZAÇÃO 17/09/2026 — restaura os controles removidos no último upload.
document.addEventListener("contextmenu", evento => {
  if (provaAtiva) evento.preventDefault();
});
["copy", "cut", "paste"].forEach(tipo => {
  document.addEventListener(tipo, evento => {
    if (provaAtiva) evento.preventDefault();
  });
});
document.addEventListener("keydown", evento => {
  if (!provaAtiva) return;
  const tecla = evento.key.toLowerCase();
  if ((evento.ctrlKey || evento.metaKey) && ["c", "v", "x", "u", "p"].includes(tecla)) {
    evento.preventDefault();
  }
});

$("#escola-aluno").addEventListener("change", alterarEscola);
$("#busca-aluno").addEventListener("input", filtrarAlunos);
$("#btn-iniciar").addEventListener("click", iniciarProva);
$("#btn-proxima").addEventListener("click", proximaQuestao);
$("#btn-continuar").addEventListener("click", continuarProva);
