// AVALIAÇÃO — EE PROFESSOR JOÃO PRADO MARGARIDO
// 20 questões de Front-End + 20 questões de Mobile.
// Todas as questões foram elaboradas a partir dos PDFs enviados pelo professor.
// O gabarito permanece temporariamente no navegador até a integração com Google Apps Script.

const TEMPO_JOAO_PRADO_SEGUNDOS = 60 * 60;

const QUESTOES_FRONTEND = [
  { id: "q1", texto: "Em um site de vendas, o que significa ter uma boa performance?", alternativas: ["Utilizar muitas imagens e animações ao mesmo tempo.", "Carregar e funcionar com rapidez para o usuário.", "Possuir a maior quantidade possível de páginas.", "Utilizar apenas arquivos JavaScript."] },
  { id: "q2", texto: "Uma loja virtual possui muitas imagens de produtos e está demorando para abrir. Qual técnica pode fazer com que as imagens sejam carregadas apenas quando estiverem próximas da área visível?", alternativas: ["CSS Grid", "Lazy Loading", "Git Push", "JWT"] },
  { id: "q3", texto: "Qual atributo apresentado nos slides é utilizado para aplicar Lazy Loading em uma imagem?", alternativas: ["display=\"lazy\"", "src=\"lazy\"", "loading=\"lazy\"", "image=\"lazy\""] },
  { id: "q4", texto: "Qual é o objetivo da minificação de um arquivo CSS?", alternativas: ["Aumentar a quantidade de linhas do código.", "Reduzir o tamanho do arquivo removendo elementos desnecessários.", "Alterar a aparência visual do site.", "Transformar CSS em JavaScript."] },
  { id: "q5", texto: "Para que o Google Lighthouse pode ser utilizado em um site?", alternativas: ["Criar produtos automaticamente.", "Analisar a página e indicar problemas e melhorias.", "Criar arquivos HTML.", "Armazenar os usuários do site."] },
  { id: "q6", texto: "Qual é uma das principais vantagens do uso de SASS em projetos maiores?", alternativas: ["Organizar e reutilizar estilos com mais facilidade.", "Substituir completamente o HTML.", "Armazenar informações em banco de dados.", "Publicar automaticamente o site."] },
  { id: "q7", texto: "No SASS/SCSS, qual recurso permite guardar um valor, como uma cor, para reutilizá-lo em diferentes partes do projeto?", alternativas: ["Pipeline", "Variável", "API", "Deploy"] },
  { id: "q8", texto: "Um mesmo efeito CSS precisa ser utilizado em produtos, botões e menus. Segundo o material, qual recurso do SASS permite criar esse conjunto de estilos uma vez e reutilizá-lo?", alternativas: ["Mixin", "Fetch", "Grid", "JWT"] },
  { id: "q9", texto: "Na implementação do menu de categorias do site, para que foi utilizado o atributo data-categoria nos produtos?", alternativas: ["Definir o preço do produto.", "Identificar a categoria de cada produto.", "Alterar a imagem do produto.", "Criar um novo arquivo CSS."] },
  { id: "q10", texto: "O que é uma API, de acordo com o conteúdo estudado?", alternativas: ["Uma linguagem utilizada para substituir JavaScript.", "Uma forma de comunicação entre sistemas.", "Um tipo de arquivo CSS.", "Um banco de dados instalado no navegador."] },
  { id: "q11", texto: "Qual comando JavaScript apresentado nos slides pode ser utilizado para realizar uma requisição e buscar informações em uma API?", alternativas: ["fetch()", "include()", "display()", "grid()"] },
  { id: "q12", texto: "Para utilizar determinados serviços, como o OpenWeatherMap, pode ser necessário utilizar uma chave de API. Qual é sua função segundo o material?", alternativas: ["Identificar quem está utilizando o serviço.", "Alterar o CSS do site.", "Criar automaticamente uma cidade.", "Impedir o uso de JavaScript."] },
  { id: "q13", texto: "Qual é o principal objetivo de um processo de CI/CD apresentado nos slides?", alternativas: ["Criar imagens para o site.", "Automatizar testes e etapas de publicação do projeto.", "Substituir HTML e CSS.", "Criar categorias de produtos."] },
  { id: "q14", texto: "Em CI/CD, o que é uma pipeline?", alternativas: ["Uma sequência de etapas automáticas pelas quais o projeto passa.", "Um arquivo utilizado para armazenar imagens.", "Uma função responsável pela pesquisa de produtos.", "Uma ferramenta exclusiva para criar CSS."] },
  { id: "q15", texto: "Qual alternativa apresenta corretamente a diferença entre testes e deploy?", alternativas: ["Testes publicam o site e deploy procura erros.", "Testes verificam se está funcionando e deploy coloca o projeto em funcionamento/publica.", "Os dois possuem exatamente a mesma função.", "Deploy serve apenas para alterar CSS."] },
  { id: "q16", texto: "Qual declaração CSS é utilizada para transformar uma área em CSS Grid?", alternativas: ["position: grid;", "display: grid;", "layout: grid;", "grid: display;"] },
  { id: "q17", texto: "O que significa desenvolver utilizando a ideia de Mobile-First?", alternativas: ["Criar primeiro o layout para telas pequenas e depois adaptá-lo para telas maiores.", "Desenvolver apenas aplicativos para celular.", "Criar primeiro para computadores e ignorar celulares.", "Utilizar somente uma coluna em qualquer tamanho de tela."] },
  { id: "q18", texto: "Para que servem atributos ARIA, como aria-label, em uma página?", alternativas: ["Para melhorar a velocidade da internet.", "Para fornecer informações que ajudam tecnologias assistivas a compreender a interface.", "Para aumentar o tamanho dos botões.", "Para alterar automaticamente as cores do site."] },
  { id: "q19", texto: "Para que a ferramenta WAVE é utilizada no conteúdo apresentado?", alternativas: ["Encontrar problemas de acessibilidade, como contraste insuficiente.", "Fazer login com o Google.", "Criar tokens JWT.", "Minificar arquivos CSS."] },
  { id: "q20", texto: "Após um login, a aplicação pode receber um token JWT. No exemplo apresentado, qual é a função da biblioteca jwt-decode?", alternativas: ["Criar e criptografar o token.", "Publicar o site.", "Decodificar o JWT e obter as informações presentes nele.", "Fazer a análise de acessibilidade."] }
];

const GABARITO_FRONTEND = {
  q1: 1, q2: 1, q3: 2, q4: 1, q5: 1,
  q6: 0, q7: 1, q8: 0, q9: 1, q10: 1,
  q11: 0, q12: 0, q13: 1, q14: 0, q15: 1,
  q16: 1, q17: 0, q18: 1, q19: 0, q20: 2
};

const QUESTOES_MOBILE = [
  {
    id: "m1",
    texto: "Segundo o material de Mobile, o que torna um componente realmente reutilizável?",
    alternativas: [
      "Ser criado novamente em cada tela.",
      "Ser modular e parametrizável.",
      "Ter sempre o mesmo texto e a mesma função.",
      "Funcionar apenas na tela inicial."
    ]
  },
  {
    id: "m2",
    texto: "Como os temas claro e escuro beneficiam componentes reutilizáveis?",
    alternativas: [
      "Obrigando a criar um componente novo para cada tema.",
      "Permitindo que o mesmo componente adapte sua aparência ao tema escolhido.",
      "Impedindo alterações de cores no aplicativo.",
      "Fazendo o componente funcionar somente no modo escuro."
    ]
  },
  {
    id: "m3",
    texto: "Qual é uma vantagem de dividir um componente grande e complexo em partes menores?",
    alternativas: [
      "Aumentar a duplicação de código.",
      "Facilitar a localização de erros, alterações e testes.",
      "Impedir que cada parte seja testada separadamente.",
      "Deixar todos os componentes dependentes entre si."
    ]
  },
  {
    id: "m4",
    texto: "O que é usabilidade em um aplicativo ou site?",
    alternativas: [
      "A facilidade que uma pessoa tem para utilizar o aplicativo ou site.",
      "A quantidade de arquivos armazenados no aplicativo.",
      "O número de cores usadas na interface.",
      "A velocidade da conexão com o banco de dados."
    ]
  },
  {
    id: "m5",
    texto: "Qual é o primeiro passo apresentado no material para planejar testes de acessibilidade e usabilidade?",
    alternativas: [
      "Realizar testes automatizados imediatamente.",
      "Identificar o público-alvo.",
      "Criar um banco de dados.",
      "Publicar o aplicativo."
    ]
  },
  {
    id: "m6",
    texto: "Qual leitor de tela é indicado nos slides para iPhone e iPad com iOS?",
    alternativas: ["VoiceOver", "TalkBack", "JAWS", "Sentry"]
  },
  {
    id: "m7",
    texto: "Qual métrica é apresentada como uma das melhores para avaliar a usabilidade de uma tarefa?",
    alternativas: [
      "Quantidade de imagens da tela.",
      "Tamanho do arquivo do aplicativo.",
      "Tempo para completar uma tarefa.",
      "Quantidade de cores utilizadas."
    ]
  },
  {
    id: "m8",
    texto: "Qual é uma característica principal de um banco de dados relacional destacada no material?",
    alternativas: [
      "Não utilizar tabelas.",
      "Possuir relações bem definidas entre tabelas.",
      "Guardar apenas imagens.",
      "Funcionar somente sem internet."
    ]
  },
  {
    id: "m9",
    texto: "No exemplo do Firebase, o que significa sincronização de dados em tempo real?",
    alternativas: [
      "Os dispositivos podem receber atualizações praticamente no mesmo momento, sem atualização manual.",
      "Os dados são atualizados somente uma vez por dia.",
      "O usuário precisa reiniciar o celular para receber novos dados.",
      "O aplicativo não pode trocar informações com outros dispositivos."
    ]
  },
  {
    id: "m10",
    texto: "O que são dados em trânsito?",
    alternativas: [
      "Informações já guardadas permanentemente no banco de dados.",
      "Arquivos que foram excluídos do aplicativo.",
      "Informações que estão viajando de um dispositivo para outro.",
      "Dados que existem apenas dentro do código-fonte."
    ]
  },
  {
    id: "m11",
    texto: "Qual tecnologia é apresentada para proteger dados enquanto eles passam pela internet?",
    alternativas: ["CSS Grid", "TLS/SSL", "Logcat", "Cache"]
  },
  {
    id: "m12",
    texto: "Qual é a função do hashing de senha apresentada nos slides?",
    alternativas: [
      "Enviar a senha para todos os usuários.",
      "Deixar a senha visível no banco de dados.",
      "Transformar a senha em outro valor para evitar armazenar diretamente a senha original.",
      "Substituir o banco de dados por um arquivo de texto."
    ]
  },
  {
    id: "m13",
    texto: "Para que o Sentry pode ser utilizado em uma aplicação?",
    alternativas: [
      "Acompanhar erros e registrar informações sobre onde e quando eles ocorreram.",
      "Criar wireframes automaticamente.",
      "Substituir o banco de dados relacional.",
      "Criar temas claro e escuro."
    ]
  },
  {
    id: "m14",
    texto: "O que é o Logcat no contexto apresentado nos slides?",
    alternativas: [
      "Um serviço de armazenamento em nuvem.",
      "Uma ferramenta do Android que exibe mensagens sobre o que acontece no aplicativo.",
      "Um programa usado apenas para criar protótipos.",
      "Uma técnica de criptografia de senhas."
    ]
  },
  {
    id: "m15",
    texto: "No Logcat, o que representa o nível E?",
    alternativas: ["Verbose", "Debug", "Error", "Info"]
  },
  {
    id: "m16",
    texto: "O que significa armazenamento em nuvem segundo o material?",
    alternativas: [
      "Guardar arquivos e dados em servidores acessados pela internet.",
      "Salvar tudo apenas na memória do celular.",
      "Guardar arquivos exclusivamente em um pendrive.",
      "Manter dados apenas enquanto o aplicativo está aberto."
    ]
  },
  {
    id: "m17",
    texto: "No AWS S3, o que é um bucket?",
    alternativas: [
      "Uma ferramenta de criação de protótipos.",
      "Um recipiente ou grande pasta na nuvem usado para organizar e armazenar arquivos.",
      "Um leitor de tela do Android.",
      "Um tipo de senha temporária."
    ]
  },
  {
    id: "m18",
    texto: "Qual é a função de uma URL assinada?",
    alternativas: [
      "Deixar um arquivo público permanentemente.",
      "Apagar automaticamente todos os arquivos de um bucket.",
      "Dar acesso a determinado arquivo por um período limitado.",
      "Substituir as permissões do sistema operacional."
    ]
  },
  {
    id: "m19",
    texto: "Qual é a principal diferença entre wireframe e protótipo apresentada nos slides?",
    alternativas: [
      "Wireframe serve para banco de dados e protótipo para segurança.",
      "Wireframe é usado somente em sites e protótipo somente em aplicativos.",
      "Wireframe cria código pronto e protótipo cria tabelas.",
      "Wireframe organiza a tela e protótipo permite simular a interação do usuário."
    ]
  },
  {
    id: "m20",
    texto: "Como o cache pode ajudar no desempenho de um aplicativo?",
    alternativas: [
      "Apagando tudo que já foi carregado.",
      "Guardando temporariamente algo que já foi carregado para evitar buscar a mesma informação várias vezes.",
      "Forçando o aplicativo a carregar todos os dados novamente.",
      "Impedindo o uso de Lazy Loading."
    ]
  }
];

const GABARITO_MOBILE = {
  m1: 1, m2: 1, m3: 1, m4: 0, m5: 1,
  m6: 0, m7: 2, m8: 1, m9: 0, m10: 2,
  m11: 1, m12: 2, m13: 0, m14: 1, m15: 2,
  m16: 0, m17: 1, m18: 2, m19: 3, m20: 1
};

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

  Object.keys(gabaritoDemo).forEach(chave => delete gabaritoDemo[chave]);
  Object.assign(gabaritoDemo, GABARITO_FRONTEND, GABARITO_MOBILE);

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
  if (totalAcertos) totalAcertos.textContent = "0/40";
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
