// QUESTÕES PÚBLICAS — REDES DE COMPUTADORES E SEGURANÇA DA INFORMAÇÃO NA NUVEM
// 20 questões baseadas exclusivamente no PDF disponibilizado pelo professor.
const QUESTOES_REDES = [
  {
    "id": "red1",
    "nivel": "facil",
    "texto": "Qual é a função principal da camada física?",
    "alternativas": [
      "Transmitir dados por sinais físicos, como cabos, fibra óptica ou ondas de rádio.",
      "Escolher quais usuários podem acessar um sistema.",
      "Organizar os dados em tabelas.",
      "Corrigir automaticamente o conteúdo das mensagens."
    ]
  },
  {
    "id": "red2",
    "nivel": "facil",
    "texto": "A camada de enlace organiza os dados em estruturas chamadas:",
    "alternativas": [
      "Sub-redes.",
      "Backups.",
      "Quadros ou frames.",
      "Formulários."
    ]
  },
  {
    "id": "red3",
    "nivel": "medio",
    "texto": "Para que um cabo de rede comum funcione corretamente, como os padrões T568A ou T568B devem ser utilizados?",
    "alternativas": [
      "Um padrão diferente em cada ponta.",
      "O mesmo padrão nas duas extremidades.",
      "Somente o padrão T568A pode ser usado.",
      "A ordem dos fios não interfere na comunicação."
    ]
  },
  {
    "id": "red4",
    "nivel": "medio",
    "texto": "Quantos endereços válidos para hosts existem em uma rede IPv4 /27?",
    "alternativas": [
      "32",
      "64",
      "28",
      "30"
    ]
  },
  {
    "id": "red5",
    "nivel": "dificil",
    "texto": "Uma rede /24 foi dividida em quatro sub-redes iguais. Qual será o novo prefixo?",
    "alternativas": [
      "/26",
      "/25",
      "/27",
      "/28"
    ]
  },
  {
    "id": "red6",
    "nivel": "medio",
    "texto": "Qual é a principal vantagem de separar a rede por departamentos?",
    "alternativas": [
      "Aumentar automaticamente a velocidade da internet.",
      "Eliminar a necessidade de segurança.",
      "Melhorar a organização e o controle do tráfego.",
      "Transformar todos os dispositivos em servidores."
    ]
  },
  {
    "id": "red7",
    "nivel": "facil",
    "texto": "O que é uma vulnerabilidade em um sistema?",
    "alternativas": [
      "Uma atualização instalada corretamente.",
      "Uma fraqueza ou falha que pode colocar o sistema em risco.",
      "O prejuízo que já aconteceu depois de um ataque.",
      "Uma cópia de segurança dos arquivos."
    ]
  },
  {
    "id": "red8",
    "nivel": "medio",
    "texto": "Por que um formulário não deve aceitar qualquer dado digitado pelo usuário?",
    "alternativas": [
      "Porque todo campo precisa ser preenchido com números.",
      "Porque formulários devem funcionar somente offline.",
      "Porque o usuário não pode escolher nenhuma informação.",
      "Porque é necessário validar a entrada para reduzir erros e vulnerabilidades."
    ]
  },
  {
    "id": "red9",
    "nivel": "medio",
    "texto": "Um site exibe diretamente um comentário enviado pelo usuário, sem tratar o conteúdo. Qual vulnerabilidade pode surgir?",
    "alternativas": [
      "XSS — Cross-Site Scripting.",
      "Backup incremental.",
      "Sub-rede /27.",
      "Criptografia TLS."
    ]
  },
  {
    "id": "red10",
    "nivel": "dificil",
    "texto": "Uma porta possui uma fechadura quebrada; uma pessoa pode explorar essa falha e documentos podem ser roubados. No exemplo, a fechadura quebrada representa:",
    "alternativas": [
      "A consequência.",
      "O ativo.",
      "A vulnerabilidade.",
      "O backup."
    ]
  },
  {
    "id": "red11",
    "nivel": "medio",
    "texto": "O que foi o WannaCry apresentado no material?",
    "alternativas": [
      "Um protocolo de criptografia usado em sites.",
      "Um grande ataque de ransomware ocorrido em 2017.",
      "Uma ferramenta de backup criada pela Microsoft.",
      "Um padrão de montagem de cabos."
    ]
  },
  {
    "id": "red12",
    "nivel": "dificil",
    "texto": "Por que muitos computadores continuaram vulneráveis ao WannaCry mesmo depois da existência de uma correção?",
    "alternativas": [
      "Porque o ransomware atacava apenas computadores atualizados.",
      "Porque a correção exigia trocar todos os cabos de rede.",
      "Porque o ataque não utilizava vulnerabilidade alguma.",
      "Porque muitos sistemas estavam desatualizados e não receberam a correção."
    ]
  },
  {
    "id": "red13",
    "nivel": "dificil",
    "texto": "Uma organização analisou um risco, avaliou suas consequências e decidiu formalmente conviver com ele. Essa decisão representa:",
    "alternativas": [
      "Aceitação formal do risco.",
      "Desconhecimento da vulnerabilidade.",
      "Eliminação automática do risco.",
      "Ausência de tratamento."
    ]
  },
  {
    "id": "red14",
    "nivel": "facil",
    "texto": "Segundo a LGPD, quem é o titular dos dados?",
    "alternativas": [
      "A empresa que criou o sistema.",
      "O funcionário que digitou as informações.",
      "A pessoa a quem os dados pertencem ou se referem.",
      "O servidor no qual os dados estão armazenados."
    ]
  },
  {
    "id": "red15",
    "nivel": "facil",
    "texto": "Qual alternativa apresenta um dado pessoal sensível?",
    "alternativas": [
      "Nome da rua.",
      "Informação sobre religião ou saúde.",
      "Número da sala de aula.",
      "Nome de uma empresa."
    ]
  },
  {
    "id": "red16",
    "nivel": "medio",
    "texto": "O Princípio da Necessidade determina que uma organização deve:",
    "alternativas": [
      "Coletar todos os dados disponíveis para utilizar no futuro.",
      "Solicitar dados sensíveis em qualquer cadastro.",
      "Guardar informações mesmo quando não existe finalidade definida.",
      "Coletar somente os dados realmente necessários para realizar a atividade."
    ]
  },
  {
    "id": "red17",
    "nivel": "medio",
    "texto": "Qual é a função do IAM em um sistema na nuvem?",
    "alternativas": [
      "Gerenciar identidades e permissões de acesso.",
      "Criar cabos de rede virtuais.",
      "Substituir todos os backups.",
      "Aumentar a velocidade da conexão."
    ]
  },
  {
    "id": "red18",
    "nivel": "medio",
    "texto": "O que estabelece o Princípio do Menor Privilégio?",
    "alternativas": [
      "Todo funcionário deve ser administrador.",
      "As permissões devem ser compartilhadas entre todos.",
      "Cada pessoa deve receber somente os acessos necessários para seu trabalho.",
      "Somente clientes precisam de controle de acesso."
    ]
  },
  {
    "id": "red19",
    "nivel": "dificil",
    "texto": "Qual tecnologia protege os dados enquanto eles estão sendo enviados pela rede em uma conexão HTTPS?",
    "alternativas": [
      "Deduplicação.",
      "Criptografia em trânsito, como TLS.",
      "Backup full.",
      "Endereço MAC."
    ]
  },
  {
    "id": "red20",
    "nivel": "dificil",
    "texto": "Foi feito um backup full no domingo e backups incrementais na segunda, terça e quarta. Se o servidor falhar na quinta-feira, o que será necessário para recuperar os dados até quarta?",
    "alternativas": [
      "Somente o incremental de quarta-feira.",
      "Somente o backup full de domingo.",
      "Um novo backup criado depois da falha.",
      "O full de domingo e todos os incrementais de segunda, terça e quarta."
    ]
  }
];
