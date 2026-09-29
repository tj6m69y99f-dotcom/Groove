# Groove Store

Projeto académico Full-Stack de uma loja de discos de vinil.

## Estrutura

- `frontend`: o frontend original da Groove Store.
- `backend`: servidor Node.js, Express e API REST.
- `database`: criação da base MySQL e dados de exemplo.

O aspeto do frontend não foi alterado. Apenas o `catalog.js` foi ligado ao
endpoint `/api/products`, para receber os produtos guardados no MySQL.

## Preparação da base de dados

1. Abra o MySQL Workbench.
2. Execute primeiro `database/schema.sql`.
3. Execute depois `database/seed.sql`.

O `schema.sql` apaga e recria as tabelas `categories` e `products`. Utilize-o
apenas durante a preparação e os testes do projeto.

## Preparação do backend

1. Abra a pasta `backend` no terminal.
2. Execute `npm install`.
3. Duplique `.env.example` e dê à cópia o nome `.env`.
4. No `.env`, coloque o utilizador e a senha do seu MySQL.
5. Execute `npm start`.
6. Abra `http://localhost:3000` no navegador.

Não abra o `index.html` diretamente. O site deve ser aberto pelo endereço do
servidor para conseguir comunicar com a API.

## API

- `GET /api/estado`: verifica a ligação ao MySQL.
- `GET /api/categories`: consulta as categorias.
- `GET /api/products`: consulta todos os produtos.
- `GET /api/products/:id`: consulta um produto.
- `POST /api/products`: adiciona um produto.
- `PUT /api/products/:id`: altera um produto.
- `DELETE /api/products/:id`: apaga um produto.

O carrinho continua temporário e fica guardado no navegador, conforme previsto
para esta fase do projeto.
