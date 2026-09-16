// PROVA DE FRONT-END — EE PROFESSOR JOÃO PRADO MARGARIDO
// Questões elaboradas a partir do material FRONT END.pdf enviado pelo professor.
// Enquanto a correção via Google Apps Script não estiver configurada,
// o gabarito continua no navegador apenas para permitir os testes da plataforma.

const TEMPO_FRONTEND_SEGUNDOS = 40 * 60;

const QUESTOES_FRONTEND = [
  {
    id: "q1",
    texto: "Em um site de vendas, o que significa ter uma boa performance?",
    alternativas: [
      "Utilizar muitas imagens e animações ao mesmo tempo.",
      "Carregar e funcionar com rapidez para o usuário.",
      "Possuir a maior quantidade possível de páginas.",
      "Utilizar apenas arquivos JavaScript."
    ]
  },
  {
    id: "q2",
    texto: "Uma loja virtual possui muitas imagens de produtos e está demorando para abrir. Qual técnica pode fazer com que as imagens sejam carregadas apenas quando estiverem próximas da área visível?",
    alternativas: ["CSS Grid", "Lazy Loading", "Git Push", "JWT"]
  },
  {
    id: "q3",
    texto: "Qual atributo apresentado nos slides é utilizado para aplicar Lazy Loading em uma imagem?",
    alternativas: ["display=\"lazy\"", "src=\"lazy\"", "loading=\"lazy\"", "image=\"lazy\""]
  },
  {
    id: "q4",
    texto: "Qual é o objetivo da minificação de um arquivo CSS?",
    alternativas: [
      "Aumentar a quantidade de linhas do código.",
      "Reduzir o tamanho do arquivo removendo elementos desnecessários.",
      "Alterar a aparência visual do site.",
      "Transformar CSS em JavaScript."
    ]
  },
  {
    id: "q5",
    texto: "Para que o Google Lighthouse pode ser utilizado em um site?",
    alternativas: [
      "Criar produtos automaticamente.",
      "Analisar a página e indicar problemas e melhorias.",
      "Criar arquivos HTML.",
      "Armazenar os usuários do site."
    ]
  },
  {
    id: "q6",
    texto: "Qual é uma das principais vantagens do uso de SASS em projetos maiores?",
    alternativas: [
      "Organizar e reutilizar estilos com mais facilidade.",
      "Substituir completamente o HTML.",
      "Armazenar informações em banco de dados.",
      "Publicar automaticamente o site."
    ]
  },
  {
    id: "q7",
    texto: "No SASS/SCSS, qual recurso permite guardar um valor, como uma cor, para reutilizá-lo em diferentes partes do projeto?",
    alternativas: ["Pipeline", "Variável", "API", "Deploy"]
  },
  {
    id: "q8",
    texto: "Um mesmo efeito CSS precisa ser utilizado em produtos, botões e menus. Segundo o material, qual recurso do SASS permite criar esse conjunto de estilos uma vez e reutilizá-lo?",
    alternativas: ["Mixin", "Fetch", "Grid", "JWT"]
  },
  {
    id: "q9",
    texto: "Na implementação do menu de categorias do site, para que foi utilizado o atributo data-categoria nos produtos?",
    alternativas: [
      "Definir o preço do produto.",
      "Identificar a categoria de cada produto.",
      "Alterar a imagem do produto.",
      "Criar um novo arquivo CSS."
    ]
  },
  {
    id: "q10",
    texto: "O que é uma API, de acordo com o conteúdo estudado?",
    alternativas: [
      "Uma linguagem utilizada para substituir JavaScript.",
      "Uma forma de comunicação entre sistemas.",
      "Um tipo de arquivo CSS.",
      "Um banco de dados instalado no navegador."
    ]
  },
  {
    id: "q11",
    texto: "Qual comando JavaScript apresentado nos slides pode ser utilizado para realizar uma requisição e buscar informações em uma API?",
    alternativas: ["fetch()", "include()", "display()", "grid()"]
  },
  {
    id: "q12",
    texto: "Para utilizar determinados serviços, como o OpenWeatherMap, pode ser necessário utilizar uma chave de API. Qual é sua função segundo o material?",
    alternativas: [
      "Identificar quem está utilizando o serviço.",
      "Alterar o CSS do site.",
      "Criar automaticamente uma cidade.",
      "Impedir o uso de JavaScript."
    ]
  },
  {
    id: "q13",
    texto: "Qual é o principal objetivo de um processo de CI/CD apresentado nos slides?",
    alternativas: [
      "Criar imagens para o site.",
      "Automatizar testes e etapas de publicação do projeto.",
      "Substituir HTML e CSS.",
      "Criar categorias de produtos."
    ]
  },
  {
    id: "q14",
    texto: "Em CI/CD, o que é uma pipeline?",
    alternativas: [
      "Uma sequência de etapas automáticas pelas quais o projeto passa.",
      "Um arquivo utilizado para armazenar imagens.",
      "Uma função responsável pela pesquisa de produtos.",
      "Uma ferramenta exclusiva para criar CSS."
    ]
  },
  {
    id: "q15",
    texto: "Qual alternativa apresenta corretamente a diferença entre testes e deploy?",
    alternativas: [
      "Testes publicam o site e deploy procura erros.",
      "Testes verificam se está funcionando e deploy coloca o projeto em funcionamento/publica.",
      "Os dois possuem exatamente a mesma função.",
      "Deploy serve apenas para alterar CSS."
    ]
  },
  {
    id: "q16",
    texto: "Qual declaração CSS é utilizada para transformar uma área em CSS Grid?",
    alternativas: ["position: grid;", "display: grid;", "layout: grid;", "grid: display;"]
  },
  {
    id: "q17",
    texto: "O que significa desenvolver utilizando a ideia de Mobile-First?",
    alternativas: [
      "Criar primeiro o layout para telas pequenas e depois adaptá-lo para telas maiores.",
      "Desenvolver apenas aplicativos para celular.",
      "Criar primeiro para computadores e ignorar celulares.",
      "Utilizar somente uma coluna em qualquer tamanho de tela."
    ]
  },
  {
    id: "q18",
    texto: "Para que servem atributos ARIA, como aria-label, em uma página?",
    alternativas: [
      "Para melhorar a velocidade da internet.",
      "Para fornecer informações que ajudam tecnologias assistivas a compreender a interface.",
      "Para aumentar o tamanho dos botões.",
      "Para alterar automaticamente as cores do site."
    ]
  },
  {
    id: "q19",
    texto: "Para que a ferramenta WAVE é utilizada no conteúdo apresentado?",
    alternativas: [
      "Encontrar problemas de acessibilidade, como contraste insuficiente.",
      "Fazer login com o Google.",
      "Criar tokens JWT.",
      "Minificar arquivos CSS."
    ]
  },
  {
    id: "q20",
    texto: "Após um login, a aplicação pode receber um token JWT. No exemplo apresentado, qual é a função da biblioteca jwt-decode?",
    alternativas: [
      "Criar e criptografar o token.",
      "Publicar o site.",
      "Decodificar o JWT e obter as informações presentes nele.",
      "Fazer a análise de acessibilidade."
    ]
  }
];

const GABARITO_FRONTEND = {
  q1: 1,
  q2: 1,
  q3: 2,
  q4: 1,
  q5: 1,
  q6: 0,
  q7: 1,
  q8: 0,
  q9: 1,
  q10: 1,
  q11: 0,
  q12: 0,
  q13: 1,
  q14: 0,
  q15: 1,
  q16: 1,
  q17: 0,
  q18: 1,
  q19: 0,
  q20: 2
};

function carregarProvaFrontend() {
  questoes.splice(0, questoes.length, ...QUESTOES_FRONTEND);

  Object.keys(gabaritoDemo).forEach(chave => delete gabaritoDemo[chave]);
  Object.assign(gabaritoDemo, GABARITO_FRONTEND);

  segundosRestantes = TEMPO_FRONTEND_SEGUNDOS;

  // A versão-base foi criada com 10 minutos. Para a prova de 20 questões,
  // usamos 40 minutos e ajustamos o cálculo do tempo utilizado.
  tempoUtilizado = function () {
    return Math.max(0, TEMPO_FRONTEND_SEGUNDOS - segundosRestantes);
  };

  const titulo = document.querySelector("#titulo-avaliacao");
  if (titulo) titulo.textContent = "Avaliação de Front-End";

  const info = document.querySelector("#info-prova");
  if (info) info.textContent = "A prova possui 20 questões e tempo máximo de 40 minutos. Consulte o material disponibilizado pelo professor para responder.";

  const cronometro = document.querySelector("#cronometro");
  if (cronometro) cronometro.textContent = "40:00";

  const numeroQuestao = document.querySelector("#numero-questao");
  if (numeroQuestao) numeroQuestao.textContent = "Questão 1 de 20";

  const percentual = document.querySelector("#percentual-progresso");
  if (percentual) percentual.textContent = "5%";

  const barra = document.querySelector("#barra-progresso");
  if (barra) barra.style.width = "5%";

  const totalAcertos = document.querySelector("#total-acertos");
  if (totalAcertos) totalAcertos.textContent = "0/20";
}

function atualizarProvaDaEscola() {
  const escolaSelecionada = document.querySelector("#escola-aluno")?.value;

  if (escolaSelecionada === "joao-prado") {
    carregarProvaFrontend();
  } else {
    const titulo = document.querySelector("#titulo-avaliacao");
    if (titulo) titulo.textContent = "Avaliação Online";

    const info = document.querySelector("#info-prova");
    if (info) info.textContent = "A avaliação desta escola ainda não foi cadastrada.";
  }
}

// Impede que outras escolas iniciem a prova de Front-End por engano.
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

// A prova é carregada desde o início para manter a tela pronta para a turma cadastrada.
carregarProvaFrontend();
