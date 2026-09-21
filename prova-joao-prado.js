// AVALIAÇÕES POR ESCOLA — ATUALIZAÇÃO 21/09/2026
// João Prado: Front-End + Mobile. Maria Vera e Armando Gomes: provas únicas com 40 questões.
const TEMPO_JOAO_PRADO_SEGUNDOS = 30 * 60;
const TEMPO_MARIA_VERA_SEGUNDOS = 60 * 60;
const TEMPO_ARMANDO_GOMES_SEGUNDOS = 30 * 60;

const PROVA_MARIA_VERA = {
  provaId: "maria-vera-versionamento-mensageria-banco-3b-2026-v1",
  titulo: "Avaliação de Versionamento, Mensageria e Banco de Dados",
  info: "A prova possui 40 questões de Versionamento, Mensageria e Banco de Dados, misturadas entre si. Tempo máximo: 60 minutos. A ordem das questões é personalizada para cada aluno e os dois materiais podem ser consultados.",
  materiais: ["versionamento", "banco"],
  obterQuestoes: () => [...QUESTOES_VERSIONAMENTO, ...QUESTOES_BANCO_DADOS]
};

const PROVA_ARMANDO_GOMES = {
  provaId: "armando-gomes-carreiras-redes-3b-2026-v1",
  titulo: "Avaliação de Carreiras e Redes",
  info: "A prova possui 40 questões de Carreiras e Redes, misturadas entre si. Tempo máximo: 30 minutos. A ordem das questões e das alternativas é personalizada para cada aluno. Os dois materiais podem ser consultados ao lado da prova.",
  materiais: ["carreiras", "redes"],
  obterQuestoes: () => [...QUESTOES_CARREIRAS, ...QUESTOES_REDES]
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

function misturarAlternativasDaQuestao(questao, chave) {
  const pares = questao.alternativas.map((texto, indiceOriginal) => ({ texto, indiceOriginal }));
  const aleatorio = geradorAleatorio(hashDaChave(`${chave}|${questao.id}|alternativas`));

  for (let i = pares.length - 1; i > 0; i--) {
    const j = Math.floor(aleatorio() * (i + 1));
    [pares[i], pares[j]] = [pares[j], pares[i]];
  }

  return {
    ...questao,
    alternativas: pares.map(item => item.texto),
    ordemAlternativas: pares.map(item => item.indiceOriginal)
  };
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
    banco: "Banco de Dados",
    carreiras: "Carreiras",
    redes: "Redes"
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

function aplicarQuestoes(lista) {
  limparGabaritoAtivo();
  questoesBaseAvaliacao = lista.map(({ correta, nivel, ...questao }) => ({
    ...questao,
    alternativas: [...questao.alternativas]
  }));

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
  aplicarQuestoes([...QUESTOES_FRONTEND, ...QUESTOES_MOBILE]);
  configurarMateriais(["front", "mobile"]);
  atualizarInterfaceProva(
    "Avaliação de Front-End e Mobile",
    "A prova possui 40 questões de Front-End e Mobile, misturadas entre si. Tempo máximo: 30 minutos. A ordem das questões e das alternativas é personalizada para cada aluno. Os dois materiais podem ser consultados ao lado da prova.",
    TEMPO_JOAO_PRADO_SEGUNDOS
  );
}

function carregarProvaMariaVera() {
  avaliacaoIdAtual = "maria-vera-prova-unica";
  definirProvaIdAtual(PROVA_MARIA_VERA.provaId);
  aplicarQuestoes(PROVA_MARIA_VERA.obterQuestoes());
  configurarMateriais(PROVA_MARIA_VERA.materiais);
  atualizarInterfaceProva(
    PROVA_MARIA_VERA.titulo,
    PROVA_MARIA_VERA.info,
    TEMPO_MARIA_VERA_SEGUNDOS
  );
}

function carregarProvaArmandoGomes() {
  avaliacaoIdAtual = "armando-gomes-prova-unica";
  definirProvaIdAtual(PROVA_ARMANDO_GOMES.provaId);
  aplicarQuestoes(PROVA_ARMANDO_GOMES.obterQuestoes());
  configurarMateriais(PROVA_ARMANDO_GOMES.materiais);
  atualizarInterfaceProva(
    PROVA_ARMANDO_GOMES.titulo,
    PROVA_ARMANDO_GOMES.info,
    TEMPO_ARMANDO_GOMES_SEGUNDOS
  );
}

function prepararProvaParaAluno(escolaSelecionada, nomeAluno) {
  if (!questoesBaseAvaliacao.length || !nomeAluno) return;

  const chave = `${PROVA_ID_ATUAL}|${escolaSelecionada}|${normalizarTexto(nomeAluno)}`;
  if (ordemPreparadaParaAluno === chave) return;

  let personalizadas = misturarQuestoes(questoesBaseAvaliacao, chave);
  if (["joao-prado", "armando-gomes"].includes(escolaSelecionada)) {
    personalizadas = personalizadas.map(questao => misturarAlternativasDaQuestao(questao, chave));
  }
  questoes.splice(0, questoes.length, ...personalizadas);
  indiceAtual = 0;
  respostas = {};
  ordemPreparadaParaAluno = chave;
}

function atualizarProvaDaEscola() {
  const escolaSelecionada = document.querySelector("#escola-aluno")?.value || "";

  ordemPreparadaParaAluno = "";

  if (escolaSelecionada === "joao-prado") {
    carregarProvaJoaoPrado();
    return;
  }

  if (escolaSelecionada === "maria-vera") {
    carregarProvaMariaVera();
    return;
  }

  if (escolaSelecionada === "armando-gomes") {
    carregarProvaArmandoGomes();
    return;
  }

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

document.querySelector("#escola-aluno")?.addEventListener("change", atualizarProvaDaEscola);

document.querySelector("#btn-iniciar")?.addEventListener("click", function (evento) {
  const escolaSelecionada = document.querySelector("#escola-aluno")?.value || "";

  if (escolaSelecionada && !["joao-prado", "maria-vera", "armando-gomes"].includes(escolaSelecionada)) {
    evento.preventDefault();
    evento.stopImmediatePropagation();
    const erro = document.querySelector("#erro-identificacao");
    if (erro) erro.textContent = "A avaliação desta escola ainda não foi cadastrada.";
  }
}, true);
