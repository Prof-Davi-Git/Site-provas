// BLOQUEIO LOCAL DE SEGUNDA TENTATIVA — 16/09/2026
// Atua como proteção imediata no dispositivo. O Apps Script é a fonte definitiva.

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
  return lerConclusoesLocais()[chaveConclusao(escola, nome)] || null;
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
  } catch (e) {}
}

function removerConclusaoLocal(escola, nome) {
  try {
    const dados = lerConclusoesLocais();
    delete dados[chaveConclusao(escola, nome)];
    localStorage.setItem(CHAVE_CONCLUIDAS, JSON.stringify(dados));
  } catch (e) {}
}

function atualizarAvisoSegundaTentativa() {
  const erro = document.querySelector("#erro-identificacao");
  const botao = document.querySelector("#btn-iniciar");
  if (!erro || !botao) return;

  const escolaSelecionada = document.querySelector("#escola-aluno")?.value || "";
  const nomeSelecionado = typeof alunoSelecionado !== "undefined" ? alunoSelecionado : "";

  if (escolaSelecionada === "joao-prado" && nomeSelecionado && alunoJaConcluiuLocal(escolaSelecionada, nomeSelecionado)) {
    const registro = obterConclusaoLocal(escolaSelecionada, nomeSelecionado);
    const quando = registro?.concluidaEm ? new Date(registro.concluidaEm).toLocaleString("pt-BR") : "anteriormente";
    erro.textContent = `Esta avaliação já foi registrada para este aluno (${quando}). Uma nova tentativa precisa ser liberada pelo professor.`;
    botao.disabled = true;
    botao.setAttribute("aria-disabled", "true");
    return;
  }

  botao.disabled = false;
  botao.removeAttribute("aria-disabled");
}

// Sem backend, mantém o bloqueio local. Com backend carregado, deixa o servidor
// confirmar se o professor liberou uma nova tentativa.
document.querySelector("#btn-iniciar")?.addEventListener("click", evento => {
  const escolaSelecionada = document.querySelector("#escola-aluno")?.value || "";
  const nomeSelecionado = typeof alunoSelecionado !== "undefined" ? alunoSelecionado : "";
  if (typeof validarInicioComServidor === "function") return;

  if (escolaSelecionada === "joao-prado" && nomeSelecionado && alunoJaConcluiuLocal(escolaSelecionada, nomeSelecionado)) {
    evento.preventDefault();
    evento.stopImmediatePropagation();
    atualizarAvisoSegundaTentativa();
  }
}, true);

document.querySelector("#escola-aluno")?.addEventListener("change", () => setTimeout(atualizarAvisoSegundaTentativa, 0));
document.querySelector("#busca-aluno")?.addEventListener("input", () => setTimeout(atualizarAvisoSegundaTentativa, 0));

const selecionarAlunoAntesDoBloqueio = selecionarAluno;
selecionarAluno = function (nome) {
  selecionarAlunoAntesDoBloqueio(nome);
  atualizarAvisoSegundaTentativa();
};

atualizarAvisoSegundaTentativa();
