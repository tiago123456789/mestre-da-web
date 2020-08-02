Requisitos:
=============

- Node.js versão 12.13.0
- Npm versão 6.4.1
- Git

Rodar projeto em ambiente de desenvolvimento:
----------------------------------------------

- Clonar projeto.
- Importar o arquivo **postman_collection.json** no postman com as rotas para fazer teste.
- Executar o comando: **npm install** para instalar as dependências do projeto.
- Criar um arquivo chamado **.env** na raiz do diretório *server* usando o arquivo **.env.example** como base e altere as informações do arquivo **.env**.
- Executar o comando: **npm run start:dev** esse comando irá criar os containers docker com redis e postgres é depois iniciar a aplicação.
- Executar o comando: **npm run knex:migrations:run** esse comando irá criar as tabelas do banco de dados.


Rodar projeto em ambiente de produção:
----------------------------------------------

- Clonar projeto.
- Executar o comando: **npm install** para instalar as dependências do projeto.
- Criar um arquivo chamado **.env** na raiz do diretório *server* usando o arquivo **.env.example** como base e altere as informações do arquivo **.env**.
- Executar o comando: **npm run knex:migrations:run** esse comando irá criar as tabelas do banco de dados.
- Instalar o **pm2** que é o gerenciador de processo node.js para quando estamos rodando aplicação node.js em produção.
- Executar o comando: **npm start** que irá rodar a aplicação usando pm2.


