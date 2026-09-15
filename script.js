// VERSÃO DE TESTE — 15/09/2026
// O gabarito abaixo existe apenas para permitir testar a plataforma agora.
// Antes de usar com alunos, a correção será movida para Google Apps Script,
// evitando deixar as respostas corretas no código público do GitHub Pages.

const MODO_DEMO = true;
const LIMITE_OCORRENCIAS = 3;
const TEMPO_PROVA_SEGUNDOS = 10 * 60;

const FORM_CONFIG = {
  url: "", // Ex.: https://docs.google.com/forms/d/e/SEU_ID/formResponse
  campos: {
    nome: "",
    respostas: "",
    acertos: "",
    detalhes: "",
    ocorrencias: "",
    tempo: "",
    encerramento: ""
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

let aluno = "";
let indiceAtual = 0;
let respostas = {};
let ocorrencias = [];
let segundosRestantes = TEMPO_PROVA_SEGUNDOS;
let timer = null;
let provaAtiva = false;
let finalizando = false;
let inicioTimestamp = null;
let ultimaOcorrenciaTimestamp = 0;

const $ = (seletor) => document.querySelector(seletor);
const telas = document.querySelectorAll(".tela");

function mostrarTela(id) {
  telas.forEach(t => t.classList.remove("ativa"));
  $(id).classList.add("ativa");
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
  try {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
    }
  } catch (e) {
    // Alguns navegadores ou políticas escolares podem impedir tela cheia.
  }
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
  $("#alternativas").innerHTML = questao.alternativas.map((texto, i) => `
    <label class="alternativa ${respostas[questao.id] === i ? "selecionada" : ""}">
      <input type="radio" name="resposta" value="${i}" ${respostas[questao.id] === i ? "checked" : ""}>
      <span class="letra">${letras[i]}</span>
      <span>${texto}</span>
    </label>
  `).join("");

  document.querySelectorAll('.alternativa input').forEach(input => {
    input.addEventListener('change', () => {
      respostas[questao.id] = Number(input.value);
      document.querySelectorAll('.alternativa').forEach(el => el.classList.remove('selecionada'));
      input.closest('.alternativa').classList.add('selecionada');
    });
  });
}

async function iniciarProva() {
  const nome = $("#nome-aluno").value.trim().replace(/\s+/g, " ");
  if (nome.length < 5 || !nome.includes(" ")) {
    $("#erro-nome").textContent = "Digite seu nome completo para iniciar.";
    return;
  }

  aluno = nome;
  $("#erro-nome").textContent = "";
  $("#nome-exibicao").textContent = aluno;
  mostrarTela("#tela-prova");
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

function registrarOcorrencia(tipo) {
  if (!provaAtiva || finalizando) return;

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
    finalizarProva(`Limite de ${LIMITE_OCORRENCIAS} ocorrências atingido`);
    return;
  }

  $("#modal-contador").textContent = `Ocorrência ${ocorrencias.length} de ${LIMITE_OCORRENCIAS}`;
  $("#modal-detalhe").textContent = `Registrada na questão ${numeroQuestao}.`;
  $("#modal-ocorrencia").classList.add("ativo");
  $("#modal-ocorrencia").setAttribute("aria-hidden", "false");
}

async function continuarProva() {
  $("#modal-ocorrencia").classList.remove("ativo");
  $("#modal-ocorrencia").setAttribute("aria-hidden", "true");
  await entrarTelaCheia();
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
    : "Versão de teste: resultado calculado normalmente. O envio ao Google Forms ainda não foi configurado.";

  if (motivo.includes("Limite")) {
    $("#resultado-titulo").textContent = "Prova encerrada automaticamente";
    $("#resultado-icone").textContent = "!";
  }

  mostrarTela("#tela-resultado");
}

// Monitoramento do modo de prova.
document.addEventListener("visibilitychange", () => {
  if (document.hidden) registrarOcorrencia("Aba ou janela ocultada");
});

window.addEventListener("blur", () => registrarOcorrencia("Janela perdeu o foco"));

document.addEventListener("fullscreenchange", () => {
  if (provaAtiva && !document.fullscreenElement) registrarOcorrencia("Saiu da tela cheia");
});

// Dificulta ações comuns durante a prova. Isso não substitui um navegador seguro.
document.addEventListener("contextmenu", e => {
  if (provaAtiva) e.preventDefault();
});
["copy", "cut", "paste"].forEach(evento => {
  document.addEventListener(evento, e => {
    if (provaAtiva) e.preventDefault();
  });
});
document.addEventListener("keydown", e => {
  if (!provaAtiva) return;
  const tecla = e.key.toLowerCase();
  if ((e.ctrlKey || e.metaKey) && ["c", "v", "x", "u", "p"].includes(tecla)) e.preventDefault();
});

$("#btn-iniciar").addEventListener("click", iniciarProva);
$("#btn-proxima").addEventListener("click", proximaQuestao);
$("#btn-continuar").addEventListener("click", continuarProva);
$("#nome-aluno").addEventListener("keydown", e => {
  if (e.key === "Enter") iniciarProva();
});