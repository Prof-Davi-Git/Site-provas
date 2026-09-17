// MATERIAL INTERNO, MARCA-D'ÁGUA E TEMPO POR QUESTÃO — 17/09/2026
const MATERIAIS_INTERNOS = {
  carreiras: {
    titulo: "Material de Carreiras",
    arquivo: "materiais/Material_Carreiras.pdf",
    paginas: 14
  },
  redes: {
    titulo: "Material de Redes",
    arquivo: "materiais/Material_Redes.pdf",
    paginas: 58
  }
};

let materialInternoAtual = "";
let paginaMaterialAtual = 1;
let inicioQuestaoMonitorada = 0;
let questaoMonitoradaId = "";
const temposPorQuestao = {};

function atualizarPaginaMaterial() {
  const config = MATERIAIS_INTERNOS[materialInternoAtual];
  const visualizador = document.querySelector("#visualizador-material");
  const indicador = document.querySelector("#pagina-material");
  const anterior = document.querySelector("#pagina-material-anterior");
  const proxima = document.querySelector("#pagina-material-proxima");
  if (!config || !visualizador) return;

  paginaMaterialAtual = Math.max(1, Math.min(config.paginas, paginaMaterialAtual));
  visualizador.src = `${config.arquivo}#page=${paginaMaterialAtual}&toolbar=0&navpanes=0&view=FitH`;
  if (indicador) indicador.textContent = `Página ${paginaMaterialAtual} de ${config.paginas}`;
  if (anterior) anterior.disabled = paginaMaterialAtual <= 1;
  if (proxima) proxima.disabled = paginaMaterialAtual >= config.paginas;
}

function abrirMaterialInterno(tipo) {
  const config = MATERIAIS_INTERNOS[tipo];
  if (!config) return false;

  materialInternoAtual = tipo;
  paginaMaterialAtual = 1;
  window.materialInternoAberto = true;

  const painel = document.querySelector("#material-interno");
  const layout = document.querySelector("#area-prova-com-material");
  const app = document.querySelector(".app-shell");
  const titulo = document.querySelector("#titulo-material-interno");
  if (painel) painel.hidden = false;
  if (layout) layout.classList.add("com-material");
  if (app) app.classList.add("material-aberto");
  if (titulo) titulo.textContent = config.titulo;
  atualizarPaginaMaterial();
  return true;
}

function fecharMaterialInterno() {
  const painel = document.querySelector("#material-interno");
  const layout = document.querySelector("#area-prova-com-material");
  const visualizador = document.querySelector("#visualizador-material");
  const app = document.querySelector(".app-shell");
  if (painel) painel.hidden = true;
  if (layout) layout.classList.remove("com-material");
  if (app) app.classList.remove("material-aberto");
  if (visualizador) visualizador.removeAttribute("src");
  window.materialInternoAberto = false;
  materialInternoAtual = "";
}

function registrarTempoQuestaoAtual() {
  if (!questaoMonitoradaId || !inicioQuestaoMonitorada) return;
  const segundos = Math.max(0, Math.round((Date.now() - inicioQuestaoMonitorada) / 1000));
  temposPorQuestao[questaoMonitoradaId] = (temposPorQuestao[questaoMonitoradaId] || 0) + segundos;
}

function iniciarTempoDaQuestao(id) {
  registrarTempoQuestaoAtual();
  questaoMonitoradaId = id || "";
  inicioQuestaoMonitorada = Date.now();
}

function obterTemposQuestoes() {
  registrarTempoQuestaoAtual();
  inicioQuestaoMonitorada = Date.now();
  return { ...temposPorQuestao };
}

function codigoDaMarca() {
  const origem = `${typeof PROVA_ID_ATUAL !== "undefined" ? PROVA_ID_ATUAL : "prova"}|${typeof aluno !== "undefined" ? aluno : "aluno"}`;
  let hash = 2166136261;
  for (let i = 0; i < origem.length; i++) {
    hash ^= origem.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).toUpperCase().slice(0, 6);
}

function atualizarMarcaDagua() {
  const marca = document.querySelector("#marca-dagua-prova");
  if (!marca) return;
  if (typeof provaAtiva === "undefined" || !provaAtiva) {
    marca.classList.remove("ativa");
    marca.innerHTML = "";
    return;
  }

  const nome = String(typeof aluno !== "undefined" ? aluno : "ALUNO").trim();
  const numero = typeof indiceAtual !== "undefined" ? indiceAtual + 1 : 1;
  const horario = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const texto = `${nome} • QUESTÃO ${numero} • ${codigoDaMarca()} • ${horario} • AVALIAÇÃO EM ANDAMENTO — NÃO FORNECER RESPOSTAS`;
  const fase = Math.floor(Date.now() / 15000) % 4;

  marca.innerHTML = Array.from({ length: 9 }, (_, indice) =>
    `<span style="--desloca-x:${((indice + fase) % 3) * 10 - 10}px;--desloca-y:${((indice + fase) % 2) * 8 - 4}px">${texto}</span>`
  ).join("");
  marca.classList.add("ativa");
}

document.querySelector("#pagina-material-anterior")?.addEventListener("click", () => {
  paginaMaterialAtual--;
  atualizarPaginaMaterial();
});

document.querySelector("#pagina-material-proxima")?.addEventListener("click", () => {
  paginaMaterialAtual++;
  atualizarPaginaMaterial();
});

document.querySelector("#fechar-material-interno")?.addEventListener("click", fecharMaterialInterno);

document.addEventListener("questao:renderizada", event => {
  iniciarTempoDaQuestao(event.detail?.id || "");
  atualizarMarcaDagua();
});

setInterval(atualizarMarcaDagua, 15000);
