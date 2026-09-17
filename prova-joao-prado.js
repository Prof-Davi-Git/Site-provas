// AVALIAÇÕES POR ESCOLA — ATUALIZAÇÃO 17/09/2026
// João Prado: Front-End + Mobile. Maria Vera: duas avaliações de 20 questões.
const TEMPO_JOAO_PRADO_SEGUNDOS = 60 * 60;
const TEMPO_MARIA_VERA_SEGUNDOS = 40 * 60;

const AVALIACOES_MARIA_VERA = {
  versionamento: {
    provaId: "maria-vera-versionamento-mensageria-3b-2026-v1",
    titulo: "Avaliação de Versionamento de Código e Sistemas de Mensageria",
    info: "A prova possui 20 questões, do nível fácil ao difícil. Tempo máximo: 40 minutos. A ordem das questões é personalizada para cada aluno e o material de Versionamento pode ser consultado.",
    material: "versionamento",
    obterQuestoes: () => QUESTOES_VERSIONAMENTO
  },
  banco: {
    provaId: "maria-vera-banco-de-dados-3b-2026-v1",
    titulo: "Avaliação de Banco de Dados",
    info: "A prova possui 20 questões, do nível fácil ao difícil. Tempo máximo: 40 minutos. A ordem das questões é personalizada para cada aluno e o material de Banco de Dados pode ser consultado.",
    material: "banco",
    obterQuestoes: () => QUESTOES_BANCO_DADOS
  }
};

let avaliacaoIdAtual = "";
let questoesBaseAvaliacao = [];
let ordemPreparadaParaAluno = "";

function hashDaChave(texto) {
  let hash = 2166136261;
  for (let i = 0; i < texto.length; i++) {
    hash ^= texto.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function geradorAleatorio(seed) {
  let estado = seed >>> 0;
  return function () {
    estado += 0x6D2B79F5;
    let valor = estado;
    valor = Math.imul(valor ^ (valor >>> 15), valor | 1);
    valor ^= valor + Math.imul(valor ^ (valor >>> 7), valor | 61);
    return ((valor ^ (valor >>> 14)) >>> 0) / 4294967296;
  };
}

function misturarQuestoes(lista, chave = "") {
  const copia = lista.map(questao => ({
    ...questao,
    alternativas: [...questao.alternativas]
  }));
  const aleatorio = chave ? geradorAleatorio(hashDaChave(chave)) : Math.random;

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(aleatorio() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function limparGabaritoAtivo() {
  Object.keys(gabaritoDemo).forEach(chave => delete gabaritoDemo[chave]);
}

function definirProvaIdAtual(id) {
  if (typeof PROVA_ID_ATUAL !== "undefined") {
    PROVA_ID_ATUAL = id;
  }
}

function configurarMateriais(tipos = []) {
  const botoes = [...document.querySelectorAll("[data-material]")];
  const rotulos = {
    front: "Front-End",
    mobile: "Mobile",
    versionamento: "Versionamento",
    banco: "Banco de Dados"
  };

  botoes.forEach((botao, indice) => {
    const tipo = tipos[indice];
    if (!tipo) {
      botao.hidden = true;
      botao.style.display = "none";
      return;
    }

    botao.dataset.material = tipo;
    botao.textContent = rotulos[tipo];
    botao.hidden = false;
    botao.style.display = "";
  });
}

function aplicarQuestoes(lista, incluirGabaritoLocal) {
  limparGabaritoAtivo();
  questoesBaseAvaliacao = lista.map(({ correta, nivel, ...questao }) => ({
    ...questao,
    alternativas: [...questao.alternativas]
  }));

  if (incluirGabaritoLocal) {
    lista.forEach(questao => {
      gabaritoDemo[questao.id] = questao.correta;
    });
  }

  questoes.splice(0, questoes.length, ...questoesBaseAvaliacao);
  indiceAtual = 0;
  respostas = {};
  ordemPreparadaParaAluno = "";
}

function atualizarInterfaceProva(tituloTexto, infoTexto, segundos) {
  segundosRestantes = segundos;

  tempoUtilizado = function () {
    return Math.max(0, segundos - segundosRestantes);
  };

  const titulo = document.querySelector("#titulo-avaliacao");
  if (titulo) titulo.textContent = tituloTexto;

  const info = document.querySelector("#info-prova");
  if (info) info.textContent = infoTexto;

  const cronometro = document.querySelector("#cronometro");
  if (cronometro) cronometro.textContent = formatarTempo(segundos);

  const numeroQuestao = document.querySelector("#numero-questao");
  if (numeroQuestao) numeroQuestao.textContent = `Questão 1 de ${questoes.length}`;

  const percentual = document.querySelector("#percentual-progresso");
  if (percentual) percentual.textContent = questoes.length ? `${Math.round(100 / questoes.length)}%` : "0%";

  const barra = document.querySelector("#barra-progresso");
  if (barra) barra.style.width = questoes.length ? `${100 / questoes.length}%` : "0%";

  const totalAcertos = document.querySelector("#total-acertos");
  if (totalAcertos) totalAcertos.textContent = questoes.length ? `—/${questoes.length}` : "—";
}

function carregarProvaJoaoPrado() {
  avaliacaoIdAtual = "joao-prado-front-mobile";
  definirProvaIdAtual("joao-prado-frontend-mobile-3b-2026-v1");
  aplicarQuestoes([...QUESTOES_FRONTEND, ...QUESTOES_MOBILE], false);
  configurarMateriais(["front", "mobile"]);
  atualizarInterfaceProva(
    "Avaliação de Front-End e Mobile",
    "A prova possui 40 questões de Front-End e Mobile, misturadas entre si. Tempo máximo: 60 minutos. A ordem das questões é personalizada para cada aluno e os materiais podem ser consultados.",
    TEMPO_JOAO_PRADO_SEGUNDOS
  );
}

function carregarProvaMariaVera(id) {
  const config = AVALIACOES_MARIA_VERA[id];
  avaliacaoIdAtual = config ? id : "";
  definirProvaIdAtual(config ? config.provaId : "");

  if (!config) {
    limparGabaritoAtivo();
    questoesBaseAvaliacao = [];
    questoes.splice(0, questoes.length);
    configurarMateriais([]);
    atualizarInterfaceProva(
      "Avaliações da EE Maria Vera Lombardi Siqueira",
      "Selecione a avaliação de Versionamento/Mensageria ou Banco de Dados.",
      TEMPO_MARIA_VERA_SEGUNDOS
    );
    return;
  }

  aplicarQuestoes(config.obterQuestoes(), true);
  configurarMateriais([config.material]);
  atualizarInterfaceProva(config.titulo, config.info, TEMPO_MARIA_VERA_SEGUNDOS);
}

function prepararProvaParaAluno(escolaSelecionada, nomeAluno) {
  if (!questoesBaseAvaliacao.length || !nomeAluno) return;

  const chave = `${PROVA_ID_ATUAL}|${escolaSelecionada}|${normalizarTexto(nomeAluno)}`;
  if (ordemPreparadaParaAluno === chave) return;

  const personalizadas = misturarQuestoes(questoesBaseAvaliacao, chave);
  questoes.splice(0, questoes.length, ...personalizadas);
  indiceAtual = 0;
  respostas = {};
  ordemPreparadaParaAluno = chave;
}

function atualizarProvaDaEscola() {
  const escolaSelecionada = document.querySelector("#escola-aluno")?.value || "";
  const seletorAvaliacao = document.querySelector("#seletor-avaliacao");
  const campoAvaliacao = document.querySelector("#avaliacao-aluno");

  ordemPreparadaParaAluno = "";

  if (escolaSelecionada === "joao-prado") {
    seletorAvaliacao?.classList.add("oculto");
    if (campoAvaliacao) campoAvaliacao.value = "";
    carregarProvaJoaoPrado();
    return;
  }

  if (escolaSelecionada === "maria-vera") {
    seletorAvaliacao?.classList.remove("oculto");
    carregarProvaMariaVera(campoAvaliacao?.value || "");
    return;
  }

  seletorAvaliacao?.classList.add("oculto");
  if (campoAvaliacao) campoAvaliacao.value = "";
  avaliacaoIdAtual = "";
  definirProvaIdAtual("");
  limparGabaritoAtivo();
  questoesBaseAvaliacao = [];
  questoes.splice(0, questoes.length);
  configurarMateriais([]);

  const titulo = document.querySelector("#titulo-avaliacao");
  if (titulo) titulo.textContent = "Avaliação Online";

  const info = document.querySelector("#info-prova");
  if (info) {
    info.textContent = escolaSelecionada
      ? "A avaliação desta escola ainda não foi cadastrada."
      : "Selecione sua escola e seu nome para carregar a avaliação disponível.";
  }
}

document.querySelector("#avaliacao-aluno")?.addEventListener("change", event => {
  carregarProvaMariaVera(event.target.value);
  const erro = document.querySelector("#erro-identificacao");
  if (erro) erro.textContent = "";
  if (typeof atualizarAvisoSegundaTentativa === "function") {
    setTimeout(atualizarAvisoSegundaTentativa, 0);
  }
});

document.querySelector("#escola-aluno")?.addEventListener("change", atualizarProvaDaEscola);

document.querySelector("#btn-iniciar")?.addEventListener("click", function (evento) {
  const escolaSelecionada = document.querySelector("#escola-aluno")?.value || "";
  const avaliacaoSelecionada = document.querySelector("#avaliacao-aluno")?.value || "";

  if (escolaSelecionada === "maria-vera" && !AVALIACOES_MARIA_VERA[avaliacaoSelecionada]) {
    evento.preventDefault();
    evento.stopImmediatePropagation();
    const erro = document.querySelector("#erro-identificacao");
    if (erro) erro.textContent = "Selecione qual avaliação será realizada.";
    return;
  }

  if (escolaSelecionada && !["joao-prado", "maria-vera"].includes(escolaSelecionada)) {
    evento.preventDefault();
    evento.stopImmediatePropagation();
    const erro = document.querySelector("#erro-identificacao");
    if (erro) erro.textContent = "A avaliação desta escola ainda não foi cadastrada.";
  }
}, true);
