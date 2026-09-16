// BLOQUEIO LOCAL DE SEGUNDA TENTATIVA — 16/09/2026
// Evita que um aluno que já concluiu a avaliação atual comece novamente
// no mesmo navegador/dispositivo. O bloqueio definitivo entre computadores
// será feito pelo Google Apps Script.

const PROVA_ID_ATUAL = "joao-prado-frontend-mobile-3b-2026-v1";
const CHAVE_CONCLUIDAS = "site-provas:concluidas:v1";

function lerConclusoesLocais() {
  try {
    const bruto = localStorage.getItem(CHAVE_CONCLUIDAS);
    const dados = bruto ? JSON.parse(bruto) : {};
    return dados && typeof dados === "object" ? dados : {};
  } catch (e) {
    return {};
  }
}

function chaveConclusao(escola, nome) {
  const nomeNormalizado = typeof normalizarTexto === "function"
    ? normalizarTexto(nome)
    : String(nome || "").toLowerCase().trim();
  return `${PROVA_ID_ATUAL}|${escola}|${nomeNormalizado}`;
}

function obterConclusaoLocal(escola, nome) {
  if (!escola || !nome) return null;
  const dados = lerConclusoesLocais();
  return dados[chaveConclusao(escola, nome)] || null;
}

function alunoJaConcluiuLocal(escola, nome) {
  return Boolean(obterConclusaoLocal(escola, nome));
}

function registrarConclusaoLocal(motivo) {
  if (!escolaId || !aluno) return;

  try {
    const dados = lerConclusoesLocais();
    dados[chaveConclusao(escolaId, aluno)] = {
      provaId: PROVA_ID_ATUAL,
      escolaId,
      escolaNome,
      aluno,
      concluidaEm: new Date().toISOString(),
      motivo: motivo || "Prova finalizada"
    };
    localStorage.setItem(CHAVE_CONCLUIDAS, JSON.stringify(dados));
  } catch (e) {
    // Se o armazenamento estiver bloqueado, a prova continua funcionando.
  }
}

function atualizarAvisoSegundaTentativa() {
  const erro = document.querySelector("#erro-identificacao");
  const botao = document.querySelector("#btn-iniciar");
  if (!erro || !botao) return;

  const escolaSelecionada = document.querySelector("#escola-aluno")?.value || "";
  const nomeSelecionado = typeof alunoSelecionado !== "undefined" ? alunoSelecionado : "";

  if (escolaSelecionada === "joao-prado" && nomeSelecionado && alunoJaConcluiuLocal(escolaSelecionada, nomeSelecionado)) {
    const registro = obterConclusaoLocal(escolaSelecionada, nomeSelecionado);
    const quando = registro?.concluidaEm
      ? new Date(registro.concluidaEm).toLocaleString("pt-BR")
      : "anteriormente";

    erro.textContent = `Esta avaliação já foi realizada por este aluno neste dispositivo (${quando}). Uma nova tentativa precisa ser liberada pelo professor.`;
    botao.disabled = true;
    botao.setAttribute("aria-disabled", "true");
    return;
  }

  botao.disabled = false;
  botao.removeAttribute("aria-disabled");
}

// Impede a segunda tentativa antes que a função normal de início seja executada.
document.querySelector("#btn-iniciar")?.addEventListener("click", evento => {
  const escolaSelecionada = document.querySelector("#escola-aluno")?.value || "";
  const nomeSelecionado = typeof alunoSelecionado !== "undefined" ? alunoSelecionado : "";

  if (escolaSelecionada === "joao-prado" && nomeSelecionado && alunoJaConcluiuLocal(escolaSelecionada, nomeSelecionado)) {
    evento.preventDefault();
    evento.stopImmediatePropagation();
    atualizarAvisoSegundaTentativa();
  }
}, true);

// Atualiza o aviso assim que escola/aluno mudarem.
document.querySelector("#escola-aluno")?.addEventListener("change", () => {
  setTimeout(atualizarAvisoSegundaTentativa, 0);
});

document.querySelector("#busca-aluno")?.addEventListener("input", () => {
  setTimeout(atualizarAvisoSegundaTentativa, 0);
});

const selecionarAlunoAntesDoBloqueio = selecionarAluno;
selecionarAluno = function (nome) {
  selecionarAlunoAntesDoBloqueio(nome);
  atualizarAvisoSegundaTentativa();
};

// Marca como concluída qualquer tentativa que realmente chegar à finalização:
// conclusão normal, tempo esgotado ou encerramento pelas 3 ocorrências.
const finalizarProvaAntesDoBloqueio = finalizarProva;
finalizarProva = async function (motivo) {
  const escolaDaTentativa = escolaId;
  const alunoDaTentativa = aluno;

  await finalizarProvaAntesDoBloqueio(motivo);

  if (escolaDaTentativa === "joao-prado" && alunoDaTentativa) {
    registrarConclusaoLocal(motivo);
  }
};

atualizarAvisoSegundaTentativa();
