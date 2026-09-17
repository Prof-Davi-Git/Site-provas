// QUESTÕES PÚBLICAS — CARREIRA E COMPETÊNCIAS PARA O MERCADO DE TRABALHO
// 20 questões baseadas exclusivamente no PDF disponibilizado pelo professor.
const QUESTOES_CARREIRAS = [
  {
    "id": "car1",
    "nivel": "facil",
    "texto": "O que é comunicação profissional?",
    "alternativas": [
      "A utilização obrigatória de palavras difíceis no trabalho.",
      "A forma de conversar e transmitir informações no ambiente de trabalho.",
      "A comunicação realizada apenas por documentos escritos.",
      "A conversa informal mantida somente entre amigos."
    ]
  },
  {
    "id": "car2",
    "nivel": "facil",
    "texto": "Segundo o material, o que deve orientar nossa forma de falar?",
    "alternativas": [
      "A roupa que a outra pessoa está usando.",
      "A idade de quem começou a conversa.",
      "O contexto e o público.",
      "A quantidade de pessoas presentes."
    ]
  },
  {
    "id": "car3",
    "nivel": "facil",
    "texto": "Qual atitude contribui para uma comunicação adequada no ambiente de trabalho?",
    "alternativas": [
      "Ouvir antes de responder.",
      "Interromper para terminar a conversa mais rápido.",
      "Usar gírias em todas as situações.",
      "Responder sem considerar o contexto."
    ]
  },
  {
    "id": "car4",
    "nivel": "facil",
    "texto": "Uma boa comunicação profissional ajuda principalmente a:",
    "alternativas": [
      "Eliminar a necessidade de trabalhar em equipe.",
      "Permitir que cada pessoa interprete a mensagem de qualquer maneira.",
      "Substituir todas as reuniões por mensagens informais.",
      "Transmitir ideias com clareza e evitar mal-entendidos."
    ]
  },
  {
    "id": "car5",
    "nivel": "facil",
    "texto": "O que significa Dress Code?",
    "alternativas": [
      "Uma regra que obriga todas as empresas a usar roupa social.",
      "O conjunto de roupas e aparência consideradas adequadas para determinado ambiente de trabalho.",
      "Uma lista de marcas de roupas permitidas pela empresa.",
      "Uma exigência para usar somente roupas caras."
    ]
  },
  {
    "id": "car6",
    "nivel": "facil",
    "texto": "Por que o Dress Code pode mudar de uma empresa para outra?",
    "alternativas": [
      "Porque cada empresa possui uma cultura diferente.",
      "Porque roupa casual é proibida em qualquer profissão.",
      "Porque todo funcionário escolhe as regras da empresa.",
      "Porque somente empresas grandes possuem Dress Code."
    ]
  },
  {
    "id": "car7",
    "nivel": "medio",
    "texto": "Em algumas profissões, qual item pode ser obrigatório por causa da atividade realizada?",
    "alternativas": [
      "Roupa de festa.",
      "Acessórios de luxo.",
      "Jaleco, uniforme ou equipamento de proteção.",
      "Somente roupa casual."
    ]
  },
  {
    "id": "car8",
    "nivel": "medio",
    "texto": "Qual conjunto está relacionado a uma boa apresentação profissional?",
    "alternativas": [
      "Roupas caras, acessórios e linguagem complicada.",
      "Informalidade, pressa e respostas curtas.",
      "Silêncio, roupas sociais e ausência de opinião.",
      "Higiene, organização e roupas adequadas ao ambiente."
    ]
  },
  {
    "id": "car9",
    "nivel": "medio",
    "texto": "Estar bem-apresentado no trabalho significa necessariamente usar roupas caras?",
    "alternativas": [
      "Sim, porque o preço da roupa define o profissionalismo.",
      "Não. Significa estar adequado ao local de trabalho.",
      "Sim, mas somente durante uma entrevista.",
      "Não, porque a aparência nunca transmite informações."
    ]
  },
  {
    "id": "car10",
    "nivel": "medio",
    "texto": "Qual mensagem é mais adequada para avisar ao chefe que uma atividade não foi concluída?",
    "alternativas": [
      "Bom dia! Não consegui finalizar a atividade hoje. Posso concluí-la amanhã pela manhã?",
      "E aí, blz? Depois eu vejo aquele negócio.",
      "Não terminei e não sei quando vou fazer.",
      "A atividade não ficou pronta, problema de quem pediu."
    ]
  },
  {
    "id": "car11",
    "nivel": "medio",
    "texto": "Usar linguagem informal demais em uma situação formal pode transmitir uma imagem de:",
    "alternativas": [
      "Maior conhecimento técnico.",
      "Mais autoridade profissional.",
      "Falta de responsabilidade, cuidado ou maturidade profissional.",
      "Melhor adaptação ao Dress Code."
    ]
  },
  {
    "id": "car12",
    "nivel": "medio",
    "texto": "Por que uma pessoa pode falar de maneiras diferentes com um amigo, um colega de trabalho e em uma entrevista?",
    "alternativas": [
      "Porque deve esconder informações em situações formais.",
      "Porque a comunicação profissional exige palavras difíceis.",
      "Porque toda conversa no trabalho precisa ser escrita.",
      "Porque é necessário adaptar a linguagem ao ambiente e ao público."
    ]
  },
  {
    "id": "car13",
    "nivel": "medio",
    "texto": "O que caracteriza uma comunicação assertiva?",
    "alternativas": [
      "Falar mais alto para encerrar a discussão.",
      "Comunicar o que precisa ser dito com respeito, clareza e objetividade.",
      "Evitar manifestar qualquer necessidade.",
      "Concordar com tudo para não criar problemas."
    ]
  },
  {
    "id": "car14",
    "nivel": "dificil",
    "texto": "Um colega atrasou uma parte do trabalho em equipe. Qual resposta representa uma comunicação agressiva?",
    "alternativas": [
      "Você nunca faz nada direito!",
      "Precisamos finalizar esta atividade hoje. Você consegue concluir sua parte até as 15h?",
      "Vamos verificar o que falta e organizar um novo prazo.",
      "Sua parte ainda não chegou. Houve algum problema?"
    ]
  },
  {
    "id": "car15",
    "nivel": "dificil",
    "texto": "Na mesma situação de atraso, qual fala representa uma postura passiva?",
    "alternativas": [
      "Você precisa terminar tudo agora.",
      "Vamos dividir novamente as tarefas.",
      "Ah... deixa para lá, eu faço tudo sozinho.",
      "Você consegue concluir sua parte até as 15h?"
    ]
  },
  {
    "id": "car16",
    "nivel": "dificil",
    "texto": "Qual fala resolve o atraso com assertividade?",
    "alternativas": [
      "Você sempre atrasa e prejudica todo mundo.",
      "Tudo bem, não precisamos mais entregar o trabalho.",
      "Vou fazer sua parte sem explicar o problema.",
      "Precisamos finalizar esta atividade hoje. Você consegue concluir sua parte até as 15h?"
    ]
  },
  {
    "id": "car17",
    "nivel": "medio",
    "texto": "Qual fórmula resume a boa comunicação profissional apresentada nos slides?",
    "alternativas": [
      "Rapidez + informalidade + silêncio.",
      "Respeito + clareza + objetividade.",
      "Autoridade + palavras difíceis + aparência.",
      "Improvisação + gírias + mensagens curtas."
    ]
  },
  {
    "id": "car18",
    "nivel": "facil",
    "texto": "No ambiente profissional, profissionalismo na comunicação significa:",
    "alternativas": [
      "Fazer a outra pessoa entender a mensagem mantendo uma postura adequada.",
      "Usar termos difíceis, mesmo que a mensagem não seja compreendida.",
      "Falar da mesma maneira em qualquer situação.",
      "Evitar fazer perguntas para não demonstrar dúvida."
    ]
  },
  {
    "id": "car19",
    "nivel": "dificil",
    "texto": "Durante uma entrevista, qual apresentação está mais de acordo com o conteúdo estudado?",
    "alternativas": [
      "E aí, queria saber como é esse trampo.",
      "Fala logo o salário para eu decidir se fico.",
      "Tenho interesse na oportunidade e gostaria de conhecer melhor as atividades da vaga.",
      "Não preparei perguntas porque todas as empresas são iguais."
    ]
  },
  {
    "id": "car20",
    "nivel": "dificil",
    "texto": "Um funcionário precisa comunicar um problema e participar de uma reunião no mesmo dia. Qual conduta reúne comunicação e apresentação profissional adequadas?",
    "alternativas": [
      "Omitir o problema e escolher a roupa mais cara disponível.",
      "Enviar uma mensagem cheia de gírias e evitar a reunião.",
      "Falar de forma agressiva e usar qualquer roupa, independentemente do ambiente.",
      "Explicar o problema com clareza e respeito, ouvir a equipe e apresentar-se de forma adequada ao local."
    ]
  }
];
