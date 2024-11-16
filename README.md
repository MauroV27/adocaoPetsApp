

🐾 AdoçãoTech
=============

AdoçãoTech é um sistema de gerenciamento de adoção de pets, desenvolvido com foco em facilitar a conexão entre adotantes e animais disponíveis para adoção. Este projeto oferece uma API RESTful, com funcionalidades completas para gerenciar adoções, pets e usuários. Utiliza PostgreSQL para o banco de dados e Docker para configurar o ambiente de desenvolvimento de maneira eficiente.

* * *

Índice
------

*   [Sobre o Projeto](#sobre-o-projeto)
*   [Tecnologias Utilizadas](#tecnologias-utilizadas)
*   [Funcionalidades](#funcionalidades)
*   [Estrutura do Projeto](#estrutura-do-projeto)
*   [Como Rodar a API](#como-rodar-a-api)
*   [Pré\-requisitos](#pr%C3%A9-requisitos)
*   [Verificar Instalação do Docker](#verificar-instala%C3%A7%C3%A3o-do-docker)
*   [Configuração do Ambiente](#configura%C3%A7%C3%A3o-do-ambiente)

* * *

Sobre o Projeto
---------------

Este projeto consiste em uma API para um sistema de adoção de pets, que permite gerenciar os processos de adoção de maneira simples e eficiente. A API oferece endpoints para a criação, atualização, deleção e consulta de pets, adoções e usuários, com autenticação segura por meio de JWT. O banco de dados utilizado é o PostgreSQL e a aplicação está configurada para rodar em containers Docker, facilitando o ambiente de desenvolvimento e a integração contínua.

* * *

Tecnologias Utilizadas ⚙️
-------------------------

*   **Node.js**: Plataforma JavaScript do lado do servidor para alta performance e escalabilidade.
*   **Express**: Framework minimalista para criação de APIs RESTful com roteamento eficiente.
*   **Prisma**: ORM moderno para manipulação de dados no PostgreSQL.
*   **PostgreSQL**: Banco de dados relacional para armazenamento seguro e eficiente.
*   **JWT (JSON Web Token)**: Para autenticação segura dos usuários.
*   **bcrypt**: Para criptografar senhas e garantir a segurança dos dados.
*   **Swagger**: Para documentação interativa da API.
*   **Jest**: Framework de testes para garantir a qualidade da aplicação.

![My Skills](https://skillicons.dev/icons?i=nodejs,prisma,express,postgres,docker,express,js,jest,nodejs,prisma&theme=dark)

* * *

Funcionalidades
---------------

### Adoções

*   **Criar Adoção**: Cria uma nova adoção com a data, ID do pet e ID do usuário.
    
    *   **Rota**: `POST /adoption`
    *   **Controlador**: `create` em `adoptController.js`
*   **Obter Adoção por ID**: Retorna os detalhes de uma adoção específica.
    
    *   **Rota**: `GET /adoption/:id`
    *   **Controlador**: `getById` em `adoptController.js`
*   **Obter Todas as Adoções**: Retorna todas as adoções cadastradas.
    
    *   **Rota**: `GET /adoption`
    *   **Controlador**: `getAll` em `adoptController.js`
*   **Atualizar Adoção**: Atualiza os detalhes de uma adoção.
    
    *   **Rota**: `PUT /adoption/:id`
    *   **Controlador**: `update` em `adoptController.js`
*   **Deletar Adoção**: Deleta uma adoção específica.
    
    *   **Rota**: `DELETE /adoption/:id`
    *   **Controlador**: `deleteAdoption` em `adoptController.js`

### Pets

*   **Criar Pet**: Cria um novo pet com informações como nome, espécie, raça, etc.
    
    *   **Rota**: `POST /pets`
    *   **Controlador**: `createPet` em `petController.js`
*   **Obter Pet por ID**: Retorna os detalhes de um pet específico.
    
    *   **Rota**: `GET /pets/:id`
    *   **Controlador**: `getPetById` em `petController.js`
*   **Obter Todos os Pets**: Retorna todos os pets cadastrados com opções de filtro.
    
    *   **Rota**: `GET /pets`
    *   **Controlador**: `getAllPets` em `petController.js`
*   **Atualizar Pet**: Atualiza os detalhes de um pet existente.
    
    *   **Rota**: `PUT /pets/:id`
    *   **Controlador**: `updatePet` em `petController.js`
*   **Deletar Pet**: Deleta um pet específico.
    
    *   **Rota**: `DELETE /pets/:id`
    *   **Controlador**: `deletePet` em `petController.js`

### Usuários

*   **Criar Usuário**: Cria um novo usuário com informações como nome, email, telefone, etc.
    
    *   **Rota**: `POST /users`
    *   **Controlador**: `createUser` em `userController.js`
*   **Obter Usuário por ID**: Retorna os detalhes de um usuário específico.
    
    *   **Rota**: `GET /users/:id`
    *   **Controlador**: `getUserById` em `userController.js`
*   **Obter Todos os Usuários**: Retorna todos os usuários cadastrados.
    
    *   **Rota**: `GET /users`
    *   **Controlador**: `getAllUsers` em `userController.js`
*   **Atualizar Usuário**: Atualiza os detalhes de um usuário.
    
    *   **Rota**: `PUT /users/:id`
    *   **Controlador**: `updateUser` em `userController.js`
*   **Deletar Usuário**: Deleta um usuário específico.
    
    *   **Rota**: `DELETE /users/:id`
    *   **Controlador**: `deleteUser` em `userController.js`

* * *

Estrutura do Projeto
--------------------

```lua
backend/
├── docs/
│   ├── swagger.js
│   └── swagger-output.json
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── controllers/
│   │   ├── adoptController.js
│   │   ├── petController.js
│   │   └── userController.js
│   ├── database/
│   │   └── prismaClient.js
│   ├── routes/
│   │   ├── adoptionRoutes.js
│   │   ├── petRoutes.js
│   │   ├── routes.js
│   │   └── userRoutes.js
│   ├── security/
│   │   ├── crypt.js
│   │   └── jwt-middleware.js
│   ├── app.js
│   └── server.js
├── tests/
│   ├── adoption.tests.js
│   ├── pet.tests.js
│   └── security.tests.js
├── .env
├── compose.yaml
├── jest.config.js
├── package.json
└── README.md
```

* * *

Como Rodar a API
================

* * *

Pré-requisitos
--------------

*   Docker instalado. [Baixe o Docker Desktop aqui](https://docs.docker.com/desktop/).

* * *

Verificar Instalação do Docker
------------------------------

Confirme se o Docker e o Docker Compose estão instalados corretamente:

```bash
docker --version
docker-compose --version
```

* * *

Configuração do Ambiente
------------------------

### 1\. Clonar o Repositório

```bash
git clone https://github.com/AdocaoTech/adocaoTechApp.git
cd adocaoTechApp/backend
git checkout -b 'nome-da-branch'
```

* * *

### 2\. Criar o Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente, conforme o exemplo abaixo:

```plaintext
DATABASE_URL="postgresql://your_db_user:your_db_password@localhost:5432/your_db_name"
DB_USER="your_db_user"
DB_NAME="your_db_name"
DB_PASS="your_db_password"
JWT_SECRET_KEY="SENHA JWT"
ADMIN_PASSWORD="12345"
ADMIN_EMAIL="adm@gmail.com"
```

> **Nota**: Existe um arquivo `.env.example` no repositório para usar como base.

* * *

### 3\. Instalar Dependências

Instale as dependências do projeto com:

```bash
npm install
```

* * *

### 4\. Subir o Banco de Dados

Inicie o PostgreSQL com Docker:

```bash
docker-compose up -d
```

* * *

### 5\. Configurar Banco de Dados com Prisma

Aplique as migrações e gere o cliente Prisma:

```bash
npx prisma migrate dev --name "nome-descrevendo-a-mudança"
npx prisma generate
```

Ou use os atalhos definidos no projeto:

```bash
npm run migrate "nome-descrevendo-a-mudança"
npm run generate
```

Para adicionar um administrador ao banco de dados, execute:

```bash
npm run seed
```

* * *

### 6\. Iniciar o Servidor

Para rodar o servidor:

```bash
npm start
```

O servidor estará disponível em:  
`http://localhost:3000`.

* * *

### 7\. Utilizar o Swagger

A API conta com integração do swagger para melhor desenvolvimento, para gerar a documentação e testar as rotas use:

```bash
npm run swagger
```

Acesse a interface em:  
`http://localhost:3000/docs`.

* * *

### 8\. Rodar os Testes

O projeto conta com testes para verificar o funcionamento da aplicação. Para executá-los, use:

```bash
npm test
```

* * *

Melhorias Futuras
-----------------

* Adicionar validação de entrada de dados mais robusta.
* Utilizar um _salt_ único para cada senha.
* Melhorar a documentação no Swagger:
    *  Adicionar exemplos de uso para as rotas.
    *  Criar e documentar _schemas_ detalhados.
    *  Incluir mensagens de retorno mais claras.

***
**AdoçãoTech** é um projeto de código aberto, colaborativo e aberto a contribuições. Para mais detalhes, consulte a [documentação da API](#docs).