// AVALIAÇÃO — EE PROFESSOR JOÃO PRADO MARGARIDO
// O gabarito não fica neste arquivo. A correção é feita pelo Google Apps Script.

const TEMPO_JOAO_PRADO_SEGUNDOS = 60 * 60;

function misturarQuestoes(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function carregarProvaJoaoPrado() {
  const questoesMisturadas = misturarQuestoes([...QUESTOES_FRONTEND, ...QUESTOES_MOBILE]);
  questoes.splice(0, questoes.length, ...questoesMisturadas);

  // Garante que o gabarito de demonstração do arquivo-base não seja usado.
  Object.keys(gabaritoDemo).forEach(chave => delete gabaritoDemo[chave]);

  indiceAtual = 0;
  respostas = {};
  segundosRestantes = TEMPO_JOAO_PRADO_SEGUNDOS;

  tempoUtilizado = function () {
    return Math.max(0, TEMPO_JOAO_PRADO_SEGUNDOS - segundosRestantes);
  };

  const titulo = document.querySelector("#titulo-avaliacao");
  if (titulo) titulo.textContent = "Avaliação de Front-End e Mobile";

  const info = document.querySelector("#info-prova");
  if (info) info.textContent = "A prova possui 40 questões de Front-End e Mobile, misturadas entre si. Tempo máximo: 60 minutos. O material disponibilizado pelo professor pode ser consultado.";

  const cronometro = document.querySelector("#cronometro");
  if (cronometro) cronometro.textContent = "60:00";

  const numeroQuestao = document.querySelector("#numero-questao");
  if (numeroQuestao) numeroQuestao.textContent = "Questão 1 de 40";

  const percentual = document.querySelector("#percentual-progresso");
  if (percentual) percentual.textContent = "3%";

  const barra = document.querySelector("#barra-progresso");
  if (barra) barra.style.width = "2.5%";

  const totalAcertos = document.querySelector("#total-acertos");
  if (totalAcertos) totalAcertos.textContent = "—/40";
}

function atualizarProvaDaEscola() {
  const escolaSelecionada = document.querySelector("#escola-aluno")?.value;

  if (escolaSelecionada === "joao-prado") {
    carregarProvaJoaoPrado();
  } else {
    const titulo = document.querySelector("#titulo-avaliacao");
    if (titulo) titulo.textContent = "Avaliação Online";

    const info = document.querySelector("#info-prova");
    if (info) info.textContent = escolaSelecionada
      ? "A avaliação desta escola ainda não foi cadastrada."
      : "Selecione sua escola e seu nome para carregar a avaliação disponível.";
  }
}

// Impede que outras escolas iniciem a avaliação da João Prado por engano.
document.querySelector("#btn-iniciar")?.addEventListener("click", function (evento) {
  const escolaSelecionada = document.querySelector("#escola-aluno")?.value;

  if (escolaSelecionada && escolaSelecionada !== "joao-prado") {
    evento.preventDefault();
    evento.stopImmediatePropagation();
    const erro = document.querySelector("#erro-identificacao");
    if (erro) erro.textContent = "A avaliação desta escola ainda não foi cadastrada.";
  }
}, true);

document.querySelector("#escola-aluno")?.addEventListener("change", atualizarProvaDaEscola);
