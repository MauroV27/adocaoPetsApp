AdoçãoTech 
==================

Este projeto é a criação de uma API para um sistema de adoção de pets. Utiliza um banco de dados PostgreSQL e Docker para facilitar o ambiente de desenvolvimento. Siga as instruções abaixo para configurar e executar o projeto localmente.

Pré-requisitos
--------------

*   Docker instalado. Você pode baixar e instalar o Docker Desktop [aqui](https://docs.docker.com/desktop/).

Verificar a Instalação do Docker
--------------------------------

Para verificar se o Docker está instalado e em execução, execute o seguinte comando no seu terminal:

```bash
docker --version
docker-compose --version
```

Certifique-se de que ambos os comandos retornam a versão do Docker instalada.

Configuração do Ambiente
------------------------

1.  **Clonar o repositório:**
    
    ```bash
    git clone https://github.com/AdocaoTech/adocaoTechApp.git
    cd adocaoTechApp/backend
    git checkout -b 'nome da branch'
    ```
    
2.  **Criar o arquivo `.env`:**
    
    Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:
    
    ```plaintext
    DATABASE_URL="postgresql://app_user:app_password@localhost:5432/app_db"
    ```
    
3.  **Instalar Dependências:**
    
    Instale as dependências do projeto com o npm:
    
    ```bash
    npm install
    ```

4. **Rodando o banco de dados**

    As instruções para a criação do postgresql estão em compose.yaml, para executar o contêiner usaremos o comando :

    ```bash
    docker-compose up -d
    ```

5.  **Configurar Banco de Dados com Prisma:**
    
    Qaundo houver alterações no modelo do banco de dados é necessário apicar as mudanças através dos seguintes comandos para aplicar as migrações do banco de dados e gerar o cliente Prisma:
    
    ```bash
    npx prisma migrate dev --name "nome descrevendo a mudança"
    npx prisma generate
    ```
    ou usando os atalhos criados
    ```bash
    npm migrate "nome descrevendo a mudança"
    npm generate
    ```

6. **Rodando o servidor:**

    Para iniciar o servidor, utilize o comando:

    ```bash
    npm start
    ```

    O servidor estará rodando em `http://localhost:3000`. Você pode acessar a API através desse endereço.

* * *