# 💰 Finance AI

Aplicação web para gestão financeira com recursos inteligentes, desenvolvida com **Next.js 14**, **Prisma**, **Clerk**, **Stripe** e integração com **OpenAI**.

---

## 🚀 Tecnologias

- Next.js 14
- React
- TypeScript
- TailwindCSS
- Prisma ORM
- Clerk
- Stripe
- OpenAI API
- React Hook Form
- Zod
- Recharts

---

## 🧠 Funcionalidades

- Autenticação de usuários com Clerk
- Gerenciamento financeiro
- Tabelas e organização de dados
- Gráficos e visualização de métricas
- Validação de formulários com Zod
- Integração com IA via OpenAI
- Integração de pagamentos com Stripe
- Interface responsiva
- Tema dark/light

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seuusuario/finance-ai.git
```

### 2. Acesse a pasta do projeto

```bash
cd finance-ai
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure o `.env`

```env
DATABASE_URL="postgresql://user:password@localhost:5432/finance_ai"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_key"
CLERK_SECRET_KEY="your_clerk_secret"

OPENAI_API_KEY="your_openai_key"

STRIPE_SECRET_KEY="your_stripe_secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
```

### 5. Gere o Prisma Client

```bash
npx prisma generate
```

### 6. Execute o projeto

```bash
npm run dev
```

A aplicação estará disponível em:

```bash
http://localhost:3000
```

---

## 📂 Estrutura do projeto

```bash
app/
components/
lib/
prisma/
hooks/
public/
```

---

## 📜 Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

## 👨‍💻 Autor

**Erley Albuquerque**

- GitHub
- LinkedIn
