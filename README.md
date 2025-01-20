# Carteira Financeira
A Carteira financeira é uma aplicação capaz de realizar transações de saldo entre usuários.

# Como executar a API em desenvolvimento:

## Requisitos mínimos:
- Node 22.13.0;
## 
- Clone a aplicação
  ```
  git clone https://github.com/jpsouza06/carteira-financeira.git
  ```

- Instale as dependências
  ```
  npm install
  ```

- Crie o banco no docker usando o docker-compose
  ```
  docker-compose up -d
  ```

- Crie um arquivo `.env` na raiz do projeto, o conteudo desse arquivo deve 
seguir como exemplo o arquivo `.env.example` '
<br/><br/>

- Rode as migrations do prisma
  ```
  npx prisma migrate dev
  ```

- Inicie a aplicação:
  ```
  npm run start:dev
  ```

- Use a aplicação:
  ```
  http://localhost:3333
  ```

# Como executar a API em produção:

## Requisitos mínimos:
- Node 22.13.0;

## 
- Crie um arquivo `.env` na raiz do projeto, o conteudo desse arquivo deve 
seguir como exemplo o arquivo `.env.example` '
<br/><br/>

- Instale as dependências
  ```
  npm ci
  ```

- Crie o build da aplicação
  ```
  npm run build
  ```

- Rode as migrations do prisma
  ```
  npx prisma migrate deploy
  ```

- Inicie a aplicação
  ```
  npm run start:prod
  ```
