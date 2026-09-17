// QUESTÕES PÚBLICAS — BANCO DE DADOS — EE MARIA VERA
// 20 questões baseadas exclusivamente no PDF disponibilizado pelo professor.
const QUESTOES_BANCO_DADOS = [
  {
    "id": "b1",
    "nivel": "facil",
    "texto": "Qual é o principal objetivo da normalização de um banco de dados?",
    "alternativas": [
      "Aumentar a repetição de informações.",
      "Organizar as tabelas, evitar repetição de dados e facilitar a manutenção.",
      "Transformar todas as colunas em chaves primárias.",
      "Eliminar a necessidade de relacionamentos."
    ]
  },
  {
    "id": "b2",
    "nivel": "facil",
    "texto": "O que a Primeira Forma Normal (1FN) exige?",
    "alternativas": [
      "Que toda tabela tenha uma chave composta.",
      "Que não existam colunas de texto.",
      "Que cada célula possua somente um valor atômico.",
      "Que todos os dados fiquem em uma única tabela."
    ]
  },
  {
    "id": "b3",
    "nivel": "medio",
    "texto": "Uma célula da tabela Cliente guarda dois telefones: “9999-1111, 9888-2222”. Qual alteração ajuda a atender à 1FN?",
    "alternativas": [
      "Juntar também o nome do cliente na mesma célula.",
      "Excluir um dos telefones.",
      "Transformar os telefones em uma chave composta.",
      "Guardar cada telefone separadamente, por exemplo em linhas de uma tabela Telefone relacionada ao cliente."
    ]
  },
  {
    "id": "b4",
    "nivel": "facil",
    "texto": "Na tabela Itens do Pedido apresentada nos slides, qual combinação forma a chave composta?",
    "alternativas": [
      "ID do pedido + ID do produto",
      "Data do pedido + quantidade",
      "Nome do produto + quantidade",
      "ID do cliente + data do pedido"
    ]
  },
  {
    "id": "b5",
    "nivel": "medio",
    "texto": "Qual problema a Segunda Forma Normal (2FN) remove?",
    "alternativas": [
      "Valores não atômicos.",
      "Dependências parciais de uma chave composta.",
      "Dependências transitivas entre atributos não chave.",
      "Todos os índices da tabela."
    ]
  },
  {
    "id": "b6",
    "nivel": "dificil",
    "texto": "A chave de Itens do Pedido é ID do pedido + ID do produto, mas a data depende somente do ID do pedido. Como essa dependência é classificada?",
    "alternativas": [
      "Dependência transitiva.",
      "Valor atômico.",
      "Dependência parcial.",
      "Índice composto."
    ]
  },
  {
    "id": "b7",
    "nivel": "medio",
    "texto": "Para uma tabela estar na Terceira Forma Normal (3FN), além de estar na 2FN, o que deve ocorrer?",
    "alternativas": [
      "Toda coluna precisa ser uma chave.",
      "Uma célula pode guardar vários valores.",
      "As dependências parciais devem ser mantidas.",
      "Um atributo não chave não deve depender de outro atributo não chave."
    ]
  },
  {
    "id": "b8",
    "nivel": "dificil",
    "texto": "Na tabela Cliente, o nome da cidade depende do ID da cidade, que não é a chave primária da tabela Cliente. Isso representa:",
    "alternativas": [
      "Uma dependência parcial.",
      "Uma dependência transitiva.",
      "Um valor atômico.",
      "Uma ordenação decrescente."
    ]
  },
  {
    "id": "b9",
    "nivel": "facil",
    "texto": "Qual é a principal finalidade de um índice no MySQL?",
    "alternativas": [
      "Criar um caminho mais rápido para localizar registros em uma coluna.",
      "Fazer o backup automático do banco.",
      "Substituir a chave primária.",
      "Excluir registros duplicados."
    ]
  },
  {
    "id": "b10",
    "nivel": "medio",
    "texto": "Qual é a principal desvantagem de adicionar índices em excesso?",
    "alternativas": [
      "As consultas SELECT deixam de funcionar.",
      "A tabela não pode mais receber dados.",
      "Operações de escrita, como INSERT, UPDATE e DELETE, podem ficar menos eficientes.",
      "O MySQL deixa de reconhecer a coluna indexada."
    ]
  },
  {
    "id": "b11",
    "nivel": "medio",
    "texto": "Para que serve o comando EXPLAIN antes de uma consulta?",
    "alternativas": [
      "Para criar um novo banco.",
      "Para ordenar alfabeticamente os resultados.",
      "Para alterar os dados retornados.",
      "Para mostrar o plano de execução e ajudar a verificar como a tabela será pesquisada e se um índice será usado."
    ]
  },
  {
    "id": "b12",
    "nivel": "facil",
    "texto": "No comando SELECT * FROM clientes;, o que o símbolo * indica?",
    "alternativas": [
      "Somente a primeira coluna.",
      "Todas as colunas da tabela.",
      "A exclusão dos registros.",
      "Uma condição de pesquisa."
    ]
  },
  {
    "id": "b13",
    "nivel": "medio",
    "texto": "Qual consulta mostra somente clientes cuja cidade seja São Paulo?",
    "alternativas": [
      "SELECT * FROM clientes WHERE cidade = 'São Paulo';",
      "SELECT * FROM clientes ORDER BY cidade = 'São Paulo';",
      "UPDATE clientes SET cidade = 'São Paulo';",
      "SHOW TABLES FROM clientes;"
    ]
  },
  {
    "id": "b14",
    "nivel": "medio",
    "texto": "Qual cláusula coloca os nomes em ordem decrescente?",
    "alternativas": [
      "WHERE nome DESC",
      "SELECT DESC nome",
      "ORDER BY nome DESC",
      "PARTITION BY nome ASC"
    ]
  },
  {
    "id": "b15",
    "nivel": "medio",
    "texto": "Qual é a função de ROW_NUMBER() OVER (ORDER BY nome)?",
    "alternativas": [
      "Apagar nomes repetidos.",
      "Separar os usuários por banco de dados.",
      "Alterar o nome de cada usuário.",
      "Numerar as linhas seguindo a ordem definida pelo nome."
    ]
  },
  {
    "id": "b16",
    "nivel": "dificil",
    "texto": "Em uma função de janela, para que serve PARTITION BY?",
    "alternativas": [
      "Excluir grupos repetidos.",
      "Separar as linhas em grupos nos quais a função será aplicada.",
      "Criar uma nova tabela para cada usuário.",
      "Substituir obrigatoriamente o ORDER BY."
    ]
  },
  {
    "id": "b17",
    "nivel": "medio",
    "texto": "Qual alternativa diferencia corretamente DDL de DML?",
    "alternativas": [
      "DDL modifica a estrutura do banco; DML manipula os dados dentro das tabelas.",
      "DDL manipula registros; DML cria somente índices.",
      "DDL e DML servem apenas para consultas SELECT.",
      "DDL faz backup; DML restaura o banco."
    ]
  },
  {
    "id": "b18",
    "nivel": "dificil",
    "texto": "A tabela cadastro precisa receber uma nova coluna telefone e depois um novo registro de aluno. Quais comandos iniciam essas duas ações, respectivamente?",
    "alternativas": [
      "INSERT e ALTER",
      "UPDATE e CREATE",
      "ALTER TABLE e INSERT INTO",
      "DELETE e TRUNCATE"
    ]
  },
  {
    "id": "b19",
    "nivel": "medio",
    "texto": "Qual comando cria o arquivo de backup do banco cadastro conforme o material?",
    "alternativas": [
      "SHOW DATABASES > cadastro.sql",
      "SELECT * FROM cadastro > backup.sql",
      "mysql -u root cadastro < backup_cadastro.sql",
      "mysqldump -u root -p cadastro > backup_cadastro.sql"
    ]
  },
  {
    "id": "b20",
    "nivel": "dificil",
    "texto": "Durante uma migração, rua, cidade, estado e CEP precisam virar um único campo endereço_completo no novo sistema. Em qual etapa do ETL isso ocorre e qual função apresentada pode ajudar?",
    "alternativas": [
      "Extract, usando SHOW DATABASES.",
      "Transform, usando CONCAT para juntar as informações.",
      "Load, usando DROP TABLE.",
      "Backup, usando EXPLAIN."
    ]
  }
];
