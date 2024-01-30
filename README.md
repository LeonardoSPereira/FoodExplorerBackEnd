<h1 align="center">Food Explorer: Back-End</h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]() <br><br>
[Português](#pt) / [English](#en)
</div>

---
# Português <a name = "pt"></a>

## 📝 Tabela de conteúdos

- [Sobre](#about_pt)
- [Iniciando a aplicação](#getting_started_pt)
- [Estrutura do projeto](#project_structure_pt)
- [Rodando os testes](#tests_pt)
- [Deploy](#deployment_pt)
- [Usando](#usage_pt)
- [Tecnologias](#built_using_pt)

## 🧐 Sobre <a name = "about_pt"></a>
Esse projeto é o back-end do Food Explorer, desafio final do curso Explorer da Rocketseat.<br>
Ele é uma API RESTful que fornece dados para o front-end do projeto, que pode ser encontrado [aqui](https://github.com/LeonardoSPereira/FoodExplorerFrontEnd).<br>
A API foi desenvolvida utilizando Node.js, Express e SQLite e permite criar, ler, atualizar e deletar dados de usuários, produtos e pedidos.<br>
O projeto possui dois tipos de usuários: administradores e clientes. Os administradores podem criar, ler, atualizar e deletar produtos e pedidos, enquanto os clientes podem criar e ler pedidos.<br><br>
Para acessar a aplicação como administrador, utilize os seguintes dados:<br>
```
email: admin@email.com
senha: admin@123
```
Para acessar a aplicação como cliente, basta criar uma conta utilizando o formulário de cadastro.

## 🏁 Iniciando a aplicação <a name = "getting_started_pt"></a>
Essas instruções vão te permitir obter uma cópia do projeto e rodar a aplicação localmente para propósitos de desenvolvimento e teste.

### Pre-requisitos
Para rodar a aplicação, você precisa ter o Node.js e o npm instalados na sua máquina. Sendo a versão LTS do Node.js recomendada.<br>
Além disso, você precisará de um editor de código, como o VSCode, um terminal e um aplicativo para testar as rotas da API, como o Insomnia ou Postman.

### Instalação
Para acessar o projeto, basta clonar o repositório ou realizar o download dos arquivos do projeto.<br>
Para clonar o repositório, utilize o seguinte comando no seu terminal:

```sh
git clone https://github.com/LeonardoSPereira/FoodExplorerBackEnd
```

Após clonar o repositório, acesse a pasta do projeto e instale as dependências utilizando o seguinte comando no seu terminal:

```sh
npm install
```

Antes de iniciar a aplicação, você precisará criar um arquivo <code>.env</code> na raiz do projeto, com as variáveis de ambiente necessárias para o seu funcionamento. O arquivo <code>.env.example</code> contém as variáveis necessárias para o funcionamento da aplicação, basta copiá-las e preencher com os valores necessários.<br>

Após criar o arquivo .env, utilize o seguinte comando no seu terminal para iniciar a aplicação:

```sh
npm run dev
```

Com isso, o banco de dados será criado, mas você precisará popular as tabelas com dados para que a aplicação funcione corretamente. Para isso, utilize o seguinte comando no seu terminal:

```sh
npm run migrate
```

Após isso, você poderá acessar a aplicação através do endereço <code>http://localhost:3333</code>. Ou o endereço que você definiu no arquivo .env.

## 📁 Estrutura do projeto <a name = "project_structure_pt"></a>
A estrutura do projeto é a seguinte:

```
├── src: pasta onde se encontram os arquivos da aplicação

│   ├── config: pasta onde se encontram os arquivos de configuração da aplicação, como o arquivo de autenticação e o arquivo de upload de arquivos.

│   ├── controllers: pasta onde se encontram os arquivos que controlam as rotas da aplicação. Cada arquivo controla as rotas de um tipo de dado, como usuários, produtos e pedidos, por exemplo.

│   ├── database: pasta onde se encontram os arquivos de configuração do banco de dados. Nela, se encontram os arquivos de criação das tabelas do banco de dados, o arquivo de conexão com o banco de dados e o próprio arquivo do banco de dados.

│   ├── middlewares: pasta onde se encontram os arquivos de middlewares da aplicação, como o middleware de autenticação e middleware de verificação de tipo de usuário.

│   ├── providers: pasta onde se encontram os arquivos de providers da aplicação, como o provider de upload de arquivos.

│   ├── repositories: pasta onde se encontram os arquivos de repositórios da aplicação, que são responsáveis por realizar as operações no banco de dados. Além disso, nela se encontram os arquivos de repositórios na memória, que são utilizados para testar as rotas da aplicação.

│   ├── routes: pasta onde se encontram os arquivos de rotas da aplicação.

│   ├── services: pasta onde se encontram os arquivos de serviços da aplicação, que são responsáveis por realizar as operações necessárias para o funcionamento das rotas da aplicação. Juntamente com os arquivos de testes, essa pasta contém os arquivos mais importantes da aplicação.

│   ├── utils: pasta onde se encontram os arquivos de utilidades da aplicação, como o arquivo tratamento de erros.

│   └── server.js: arquivo que inicia a aplicação.

├── tmp: pasta onde se encontram os arquivos de upload da aplicação.

├── .env.example: arquivo de exemplo de variáveis de ambiente.
```

## 🔧 Rodando os testes <a name = "tests_pt"></a>
A aplicação possui testes unitários para as rotas de usuários, produtos e pedidos. Para rodar os testes, utilize o seguinte comando no seu terminal:

```sh
npm test
```

Os testes foram desenvolvidos utilizando o Jest.

## 🚀 Deploy <a name = "deployment_pt"></a>
O deploy da aplicação foi realizado utilizando o plano gratuito do Render e por isso, a aplicação pode demorar alguns segundos para iniciar devido ao plano gratuito do Render colocar a aplicação em modo de hibernação após 30 minutos de inatividade.
O deploy pode ser acessado através do endereço: <code>https://foodexplorer-api-nxjr.onrender.com</code>.

## 🎈 Usando <a name="usage_pt"></a>
Para utilizar a aplicação, você pode utilizar o front-end desenvolvido para ela, que pode ser encontrado [aqui](https://github.com/LeonardoSPereira/FoodExplorerFrontEnd).<br>
Você também pode utilizar um aplicativo para testar as rotas da API, como o Insomnia ou Postman.<br>
Eu disponibilizei uma collection do Insomnia com todas as rotas da API, que pode ser encontrada junto com os arquivos do projeto, com o nome de "Insomnia_Routes.json".<br>

## ⛏️ Tecnologias <a name = "built_using_pt"></a>
- [NodeJs](https://nodejs.org/en/) - Ambiente de desenvolvimento de aplicações
- [Express](https://expressjs.com/) - Framework de desenvolvimento de aplicações
- [Knex](http://knexjs.org/) - SQL Query Builder
- [SQLite](https://www.sqlite.org/index.html) - Database
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Autenticação JWT
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Criptografia de Senhas
- [Multer](https://www.npmjs.com/package/multer) - Upload de Arquivos
- [CORS](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv) - Variáveis de Ambiente
- [Jest](https://jestjs.io/) - Framework de Testes

---
# English <a name = "en"></a>

## 📝 Table of Contents <a name = "en"></a>
- [About](#about_en)
- [Getting Started](#getting_started_en)
- [Project Structure](#project_structure_en)
- [Running Tests](#tests_en)
- [Deployment](#deployment_en)
- [Usage](#usage_en)
- [Technologies](#built_using_en)

## 🧐 About <a name = "about_en"></a>
This project is the backend for Food Explorer, the final challenge of Rocketseat's Explorer course.<br>
It is a RESTful API that provides data to the frontend of the project, which can be found [here](https://github.com/LeonardoSPereira/FoodExplorerFrontEnd).<br>
The API was developed using Node.js, Express, and SQLite, allowing for creating, reading, updating, and deleting user, product, and order data.<br>
The project has two types of users: administrators and customers. Administrators can perform CRUD operations on products and orders, while customers can create and read orders.<br><br>
To access the application as an administrator, use the following credentials:

```
email: admin@email.com
password: admin@123
```

To access the application as a customer, simply create an account using the registration form.

## 🏁 Getting Started <a name = "getting_started_en"></a>
These instructions will allow you to get a copy of the project and run the application locally for development and testing purposes.

### Prerequisites
To run the application, you need to have Node.js and npm installed on your machine, with the recommended LTS version of Node.js.<br>
Additionally, you will need a code editor like VSCode, a terminal, and an application to test API routes, such as Insomnia or Postman.

### Installation
To access the project, either clone the repository or download the project files.<br>
To clone the repository, use the following command in your terminal:

```sh
git clone https://github.com/LeonardoSPereira/FoodExplorerBackEnd
```

After cloning the repository, navigate to the project folder and install dependencies using the following command in your terminal:

```sh
npm install
```

Before starting the application, you'll need to create a <code>.env</code> file at the project's root with the necessary environment variables for its operation. The <code>.env.example</code> file contains the necessary variables. Simply copy them and fill in the values.<br>

After creating the .env file, use the following command in your terminal to start the application:

```sh
npm run dev
```

This will create the database, but you need to populate the tables with data for the application to work correctly. To do this, use the following command in your terminal:

```sh
npm run migrate
```

After that, you can access the application at <code>http://localhost:3333</code>, or the address you defined in the .env file.

## 📁 Project Structure <a name = "project_structure_en"></a>
The project structure is as follows:

```
├── src: folder containing application files

│   ├── config: folder containing application configuration files, such as authentication and file upload.

│   ├── controllers: folder containing files that control application routes. Each file controls routes for a type of data, such as users, products, and orders, for example.

│   ├── database: folder containing database configuration files. It includes files for creating database tables, the database connection file, and the database file itself.

│   ├── middlewares: folder containing application middleware files, such as authentication middleware and user type verification middleware.

│   ├── providers: folder containing application provider files, such as the file upload provider.

│   ├── repositories: folder containing application repository files, responsible for database operations. Additionally, it includes in-memory repository files used to test application routes.

│   ├── routes: folder containing application route files.

│   ├── services: folder containing application service files, responsible for operations needed for the functioning of application routes. Along with test files, this folder contains the most important files in the application.

│   ├── utils: folder containing application utility files, such as error handling.

│   └── server.js: file that starts the application.

├── tmp: folder containing application upload files.

├── .env.example: example file for environment variables.
```

## 🔧 Running Tests <a name = "tests_en"></a>
The application has unit tests for user, product, and order routes. To run the tests, use the following command in your terminal:
  
```sh
npm test
```

The tests were developed using Jest.

## 🚀 Deployment <a name = "deployment_en"></a>
The application was deployed using the free Render plan. Therefore, the application may take a few seconds to start due to the Render free plan putting the application in hibernation mode after 30 minutes of inactivity.
The deployment can be accessed at the address: <code>https://foodexplorer-api-nxjr.onrender.com</code>.

## 🎈 Usage <a name="usage_en"></a>
To use the application, you can use the frontend developed for it, which can be found [here](https://github.com/LeonardoSPereira/FoodExplorerFrontEnd).<br>
You can also use an application to test API routes, such as Insomnia or Postman.<br>
I have provided an Insomnia collection with all API routes, which can be found along with the project files, named "Insomnia_Routes.json".

## ⛏️ Technologies <a name = "built_using_en"></a>
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Express](https://expressjs.com/) - Server Framework
- [Knex](http://knexjs.org/) - SQL Query Builder
- [SQLite](https://www.sqlite.org/index.html) - Database
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JWT Authentication
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Password Hashing
- [Multer](https://www.npmjs.com/package/multer) - File Upload
- [CORS](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv) - Environment Variables
- [Jest](https://jestjs.io/) - Testing Framework