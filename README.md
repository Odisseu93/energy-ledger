# EnergyLedger – Energy Invoice API

API RESTful que recebe PDFs de faturas de energia elétrica, extrai dados estruturados via LLM multimodal (Google Gemini 2.5 Flash), persiste os resultados e os expõe através de endpoints de consulta e dashboards.

---

## Documentação

Após subir o projeto, acesse:

| URL | Descrição |
|---|---|
| [`http://localhost:3000/docs`](http://localhost:3000/docs) | Documentação interativa — decisões técnicas, guia de configuração e playground de requisições |
| [`http://localhost:3000/swagger`](http://localhost:3000/swagger) | Swagger UI — especificação OpenAPI 3.0 com schemas, exemplos e try-it-out |
| `docs/postman-collection.json` | Collection para Postman (importe via _File → Import_) |
| `docs/insomnia-collection.json` | Collection para Insomnia (importe via _File → Import_) |

---

## Decisões Arquiteturais

| Decisão | Justificativa |
|---|---|
| **Clean Architecture + DDD** | Isola a lógica de negócio de frameworks e banco de dados; facilita testes unitários sem banco real. |
| **Express** | Framework minimalista, ampla adoção, suficiente para uma API RESTful com poucos endpoints. |
| **Prisma ORM** | DX excelente, type-safe, migrations controladas por código, upsert nativo para evitar duplicatas. |
| **Google Gemini 2.5 Flash** | Suporte nativo a PDF como `inlineData`, sem necessidade de OCR separado; JSON Mode confiável. |
| **tsyringe** | Container DI leve da Microsoft, integração nativa com decorators TypeScript, sem configuração excessiva. |
| **pino** | Logger de alta performance, JSON estruturado em produção, pretty-print em dev. |
| **zod** | Validação de esquemas em runtime com inferência de tipos TypeScript — sem duplicação de tipos. |

---

## Pré-requisitos

- [Node.js 22.14.0](https://nodejs.org/)
- [Docker](https://www.docker.com/) + Docker Compose
- Chave de API do [Google Gemini](https://aistudio.google.com/app/apikey)

---

## Variáveis de Ambiente

Copie o `.env.example` e preencha:

```bash
cp .env.example .env
```

| Variável | Obrigatória | Descrição | Padrão |
|---|---|---|---|
| `NODE_ENV` | Sim | Ambiente de execução (`development` \| `production` \| `test`) | — |
| `DATABASE_URL` | Sim | Connection string PostgreSQL | — |
| `GEMINI_API_KEY` | Sim | Chave de API do Google Gemini | — |
| `PORT` | Não | Porta HTTP | `3000` |
| `UPLOAD_MAX_SIZE_MB` | Não | Tamanho máximo de upload em MB | `10` |

---

## Rodar com Docker (recomendado)

```bash
# 1. Configurar variáveis de ambiente
cp .env.example .env
# Edite .env e preencha GEMINI_API_KEY

# 2. Subir toda a stack (PostgreSQL + API)
docker compose up --build

# 3. Verificar saúde
curl http://localhost:3000/health
```

As migrations do Prisma são aplicadas automaticamente no startup da API.

---

## Setup Local (sem Docker)

### 1. Clonar e instalar dependências

```bash
git clone <repo-url>
cd energy-ledger
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
# Edite .env: DATABASE_URL, GEMINI_API_KEY
```

### 3. Subir apenas o banco de dados

```bash
docker compose up -d postgres
```

### 4. Gerar o Prisma Client e rodar migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 5. Iniciar em modo desenvolvimento

```bash
npm run dev
```

---

## Rodar Testes

```bash
# Todos os testes
npm test

# Com relatório de cobertura
npm run test:coverage

# Watch mode
npm run test:watch
```

---

## Endpoints

### `GET /health`

Verifica disponibilidade do servidor.

```bash
curl http://localhost:3000/health
```

---

### `POST /api/v1/invoices/upload`

Recebe um PDF de fatura de energia, extrai dados via Gemini 2.5 Flash e persiste no banco. Reenviar a mesma fatura (mesmo cliente + mesmo mês) atualiza o registro existente — sem duplicatas.

```bash
curl -X POST http://localhost:3000/api/v1/invoices/upload \
  -F "invoice=@/caminho/para/fatura.pdf"
```

| Status | Descrição |
|---|---|
| `201` | Fatura processada e salva com sucesso |
| `400` | Arquivo ausente, não é PDF ou campo incorreto |
| `413` | Arquivo excede `UPLOAD_MAX_SIZE_MB` |
| `422` | LLM retornou dados inválidos ou PDF não é fatura reconhecível |
| `502` | Falha na API do Gemini após 3 tentativas |
| `500` | Erro interno inesperado |

---

### `GET /api/v1/invoices`

Lista faturas com suporte a filtros e paginação.

```bash
# Sem filtros (todas as faturas, página 1)
curl "http://localhost:3000/api/v1/invoices"

# Com filtros
curl "http://localhost:3000/api/v1/invoices?customer_number=7202210726&reference_month=SET%2F2024&page=1&limit=20"
```

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `customer_number` | `string` | Filtra por cliente |
| `reference_month` | `string` | Formato `MMM/AAAA` (ex: `SET/2024`) |
| `page` | `integer` | Número da página — padrão `1` |
| `limit` | `integer` | Registros por página — máx. `100`, padrão `20` |

---

### `GET /api/v1/dashboard/energy`

Consumo de energia (kWh) e energia compensada GD (kWh) agrupados por mês de referência.

```bash
# Todos os clientes (agregado)
curl "http://localhost:3000/api/v1/dashboard/energy"

# Filtrado por cliente
curl "http://localhost:3000/api/v1/dashboard/energy?customer_number=7202210726"
```

---

### `GET /api/v1/dashboard/financial`

Valores financeiros (R$) agrupados por mês de referência: valor total sem GD e economia gerada pela Geração Distribuída.

```bash
# Todos os clientes (agregado)
curl "http://localhost:3000/api/v1/dashboard/financial"

# Filtrado por cliente
curl "http://localhost:3000/api/v1/dashboard/financial?customer_number=7202210726"
```

> Para exemplos completos de request/response, incluindo cenários de erro, acesse [`/docs`](http://localhost:3000/docs) ou [`/swagger`](http://localhost:3000/swagger).

---

## Campos Calculados

Os campos abaixo **não constam no PDF** — são derivados pela aplicação:

| Campo | Fórmula |
|---|---|
| `energyConsumptionKwh` | `electricEnergyKwh` + `sceeeEnergyKwh` |
| `totalValueWithoutGd` | `electricEnergyValue` + `sceeeEnergyValue` + `publicLightingContrib` |
| `gdSavings` | `compensatedEnergyValue` (preservado como negativo) |

---

## Estrutura de Pastas

```
src/
├── domain/                     # Núcleo — sem dependências externas
│   ├── entities/               # InvoiceEntity, CustomerEntity
│   ├── value-objects/          # ReferenceMonth
│   └── repositories/           # IInvoiceRepository, ICustomerRepository, ILLMAdapter
│
├── application/                # Casos de uso concretos + DTOs
│   ├── use-cases/              # ProcessInvoiceUseCase, ListInvoicesUseCase, ...
│   └── dtos/                   # InvoiceLLMDataDto, InvoiceFiltersDto, ...
│
├── infrastructure/             # Adaptadores concretos
│   ├── database/
│   │   ├── prisma/             # schema.prisma, PrismaClient singleton
│   │   └── repositories/       # PrismaInvoiceRepository, PrismaCustomerRepository
│   ├── llm/                    # GeminiAdapter
│   ├── http/
│   │   ├── controllers/        # InvoiceController, DashboardController
│   │   ├── routes/             # invoice.routes, dashboard.routes
│   │   ├── middlewares/        # upload, error-handler, request-logger
│   │   ├── swagger/            # openapi.ts (especificação OpenAPI 3.0)
│   │   └── docs/               # docs-page.ts (documentação HTML interativa)
│   └── config/                 # env.ts, container.ts (tsyringe DI)
│
├── shared/                     # Utilitários transversais
│   ├── errors/                 # AppError, ValidationError, LLMError, LLMParseError, NotFoundError
│   └── logger/                 # logger (pino)
│
├── __tests__/
│   ├── factories/              # makeLLMResponseMock
│   └── integration/            # Testes HTTP com supertest
│
├── app.ts                      # Express app bootstrap
└── server.ts                   # Listen + graceful shutdown
```
