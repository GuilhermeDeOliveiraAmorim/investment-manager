# 📊 Investment Manager

Sistema de gerenciamento de ativos e clientes desenvolvido com arquitetura desacoplada (frontend + backend + banco de dados), utilizando Docker para orquestração dos serviços.

---

## 🧱 Estrutura do Projeto

investment-manager/

├── backend/ # API (Node.js, Express, etc.)

├── frontend/ # Interface web (Next.js)

├── docker-compose.yml

---

## 🚀 Tecnologias

- **Frontend**: Next.js (React)
- **Backend**: Node.js com Express
- **Banco de Dados**: MySQL 8.3
- **Ambiente**: Docker + Docker Compose

---

## 📦 Pré-requisitos

- Docker instalado [https://www.docker.com/](https://www.docker.com/)
- Docker Compose instalado

---

## 🔑 Configuração do ambiente

Antes de rodar as migrações e o seed, é necessário criar um arquivo .env dentro da pasta backend/ com a variável DATABASE_URL apontando para o banco MySQL. Exemplo:

```bash
DATABASE_URL="mysql://root:root@mysql:3306/investments_db"
```

Certifique-se de que os dados (usuário, senha, host e nome do banco) estão de acordo com a configuração do seu docker-compose.yml.

---

## ⚙️ Subindo o ambiente

```bash
docker-compose up --build
```

✅ 1. Acesse o container do backend:

```bash
docker exec -it investments-backend sh
```

✅ 2. Aplique as migrações do Prisma:

```bash
docker exec -it investments-backend sh
```

✅ 3. Popule a tabela de tipos de ativos com o seed:

```bash
npx prisma db seed
```

---

## 📘 Documentação da API

A documentação interativa da API está disponível após o ambiente estar no ar:

👉 http://localhost:3001/docs
