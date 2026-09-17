// QUESTÕES PÚBLICAS — VERSIONAMENTO DE CÓDIGO E SISTEMAS DE MENSAGERIA — EE MARIA VERA
// 20 questões baseadas exclusivamente no PDF disponibilizado pelo professor.
const QUESTOES_VERSIONAMENTO = [
  {
    "id": "v1",
    "nivel": "facil",
    "texto": "Qual é a principal função do arquivo .gitignore em um projeto?",
    "alternativas": [
      "Apagar arquivos privados do computador.",
      "Informar ao Git quais arquivos ou pastas devem ficar fora dos commits.",
      "Criar automaticamente uma nova branch.",
      "Recuperar arquivos de commits antigos."
    ]
  },
  {
    "id": "v2",
    "nivel": "facil",
    "texto": "Um arquivo senhas_banco.txt contém usuário e senha do banco. O que deve ser feito antes de realizar o commit?",
    "alternativas": [
      "Renomeá-lo para senhas_banco.html.",
      "Enviar o arquivo ao GitHub e apagá-lo depois.",
      "Adicionar senhas_banco.txt ao .gitignore.",
      "Colocar o arquivo dentro da pasta de imagens."
    ]
  },
  {
    "id": "v3",
    "nivel": "facil",
    "texto": "Qual comando mostrado no material exibe o histórico de commits do projeto?",
    "alternativas": [
      "git log",
      "git add .",
      "git push",
      "git ignore"
    ]
  },
  {
    "id": "v4",
    "nivel": "medio",
    "texto": "O arquivo filmes.js existia no commit a1b2c3 e foi apagado depois. Qual comando recupera somente esse arquivo daquela versão?",
    "alternativas": [
      "git reset --hard a1b2c3",
      "git checkout a1b2c3 -- filmes.js",
      "git commit --amend filmes.js",
      "git revert filmes.js -- a1b2c3"
    ]
  },
  {
    "id": "v5",
    "nivel": "facil",
    "texto": "O que é uma branch no Git?",
    "alternativas": [
      "Uma cópia definitiva que substitui a main.",
      "Um comando usado apenas para publicar o site.",
      "Uma linha separada de trabalho que permite alterar e testar sem afetar imediatamente o código principal.",
      "Um arquivo que guarda senhas do projeto."
    ]
  },
  {
    "id": "v6",
    "nivel": "medio",
    "texto": "O sistema já está em produção e o login parou de funcionar. No Git Flow, qual branch é indicada para essa correção urgente?",
    "alternativas": [
      "feature",
      "hotfix",
      "release",
      "trunk"
    ]
  },
  {
    "id": "v7",
    "nivel": "dificil",
    "texto": "Depois de corrigir um erro urgente em uma hotfix, qual procedimento mantém main e develop com a mesma correção?",
    "alternativas": [
      "Excluir a main e continuar apenas na hotfix.",
      "Fazer merge somente na feature que estava em desenvolvimento.",
      "Enviar a hotfix diretamente para o .gitignore.",
      "Fazer merge da hotfix na main e também na develop."
    ]
  },
  {
    "id": "v8",
    "nivel": "medio",
    "texto": "Qual prática representa melhor o Trunk Based Development?",
    "alternativas": [
      "Manter grandes alterações separadas por várias semanas.",
      "Fazer mudanças pequenas e integrá-las com frequência ao código principal.",
      "Evitar commits até que todo o sistema esteja pronto.",
      "Criar uma hotfix para toda nova funcionalidade."
    ]
  },
  {
    "id": "v9",
    "nivel": "medio",
    "texto": "Para que serve um Pull Request antes de integrar uma alteração à main?",
    "alternativas": [
      "Para apagar o histórico da branch.",
      "Para criar automaticamente uma senha para o repositório.",
      "Para permitir que outras pessoas vejam e revisem as alterações antes do merge.",
      "Para impedir qualquer Code Review."
    ]
  },
  {
    "id": "v10",
    "nivel": "dificil",
    "texto": "Dois programadores alteraram a mesma parte de um arquivo e surgiu um conflito de merge. Qual conduta está de acordo com o material?",
    "alternativas": [
      "Apagar as duas versões sem analisar.",
      "Manter sempre a alteração feita por último, sem conversar com a equipe.",
      "Criar outro repositório e abandonar o histórico.",
      "Decidir qual versão ficará e documentar a resolução para manter o histórico rastreável."
    ]
  },
  {
    "id": "v11",
    "nivel": "facil",
    "texto": "Em sistemas de mensageria, qual é a função do broker?",
    "alternativas": [
      "Receber mensagens e encaminhá-las aos sistemas que precisam delas.",
      "Criar diretamente as telas do sistema.",
      "Guardar somente imagens do projeto.",
      "Substituir todos os consumidores."
    ]
  },
  {
    "id": "v12",
    "nivel": "facil",
    "texto": "O que acontece com uma mensagem colocada em uma fila?",
    "alternativas": [
      "Ela é enviada obrigatoriamente a todos os sistemas.",
      "Ela aguarda até que um consumidor consiga processá-la.",
      "Ela é apagada antes do processamento.",
      "Ela vira automaticamente um tópico."
    ]
  },
  {
    "id": "v13",
    "nivel": "medio",
    "texto": "Quando a mesma informação, como “Filme iniciado”, interessa a vários sistemas, qual estrutura é adequada?",
    "alternativas": [
      "Uma branch hotfix.",
      "Um arquivo .gitignore.",
      "Um tópico.",
      "Um commit vazio."
    ]
  },
  {
    "id": "v14",
    "nivel": "medio",
    "texto": "Por que o Apache Kafka é útil em sistemas com grande quantidade de eventos?",
    "alternativas": [
      "Porque transforma eventos em páginas HTML.",
      "Porque exige ligação direta entre todos os sistemas.",
      "Porque apaga cada evento imediatamente após recebê-lo.",
      "Porque registra e organiza fluxos de eventos, permitindo que permaneçam disponíveis por um período."
    ]
  },
  {
    "id": "v15",
    "nivel": "dificil",
    "texto": "O sistema de recomendações apresentou erro ontem, mas os eventos continuam registrados no Kafka. O que o reprocessamento permite fazer?",
    "alternativas": [
      "Ler novamente os eventos e processar as informações que falharam.",
      "Apagar todas as filas do sistema.",
      "Converter os eventos em branches.",
      "Impedir que novos eventos sejam publicados."
    ]
  },
  {
    "id": "v16",
    "nivel": "dificil",
    "texto": "Por que a comunicação orientada a eventos pode reduzir o acoplamento entre sistemas?",
    "alternativas": [
      "Porque todos os sistemas passam a depender diretamente uns dos outros.",
      "Porque o produtor publica o evento sem precisar conhecer exatamente todos os sistemas interessados.",
      "Porque elimina o uso de mensagens.",
      "Porque obriga cada sistema a chamar todos os outros diretamente."
    ]
  },
  {
    "id": "v17",
    "nivel": "medio",
    "texto": "No RabbitMQ, o que uma Exchange faz ao receber uma mensagem?",
    "alternativas": [
      "Transforma a mensagem em código-fonte.",
      "Exclui todas as filas existentes.",
      "Decide para qual fila ou filas a mensagem deve ser encaminhada.",
      "Executa o trabalho do consumidor."
    ]
  },
  {
    "id": "v18",
    "nivel": "facil",
    "texto": "Qual é o comportamento de uma Exchange do tipo Fanout?",
    "alternativas": [
      "Envia a mesma mensagem para todas as filas ligadas a ela.",
      "Escolhe apenas uma fila pelo nome exato.",
      "Guarda a mensagem sem encaminhá-la.",
      "Envia somente mensagens que apresentaram erro."
    ]
  },
  {
    "id": "v19",
    "nivel": "medio",
    "texto": "Uma mensagem falhou várias vezes e não deve voltar infinitamente para a fila principal. Para onde ela pode ser encaminhada?",
    "alternativas": [
      "Para uma branch develop.",
      "Para um tópico sem consumidores.",
      "Para o histórico de commits.",
      "Para uma Dead Letter Queue (fila de mensagens mortas)."
    ]
  },
  {
    "id": "v20",
    "nivel": "dificil",
    "texto": "Entram 100 mensagens por minuto, mas o consumidor processa apenas 50. Qual diagnóstico corresponde ao conteúdo dos slides?",
    "alternativas": [
      "A fila diminuirá porque o broker elimina o excesso.",
      "A fila crescerá e o consumidor pode estar sobrecarregado.",
      "A Exchange se transformará automaticamente em Fanout.",
      "O Kafka apagará os eventos restantes."
    ]
  }
];
