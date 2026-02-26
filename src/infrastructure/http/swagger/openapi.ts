import type { OpenAPIV3 } from 'openapi-types';

const invoiceSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  required: [
    'id',
    'customerId',
    'customerNumber',
    'referenceMonth',
    'electricEnergyKwh',
    'electricEnergyValue',
    'sceeeEnergyKwh',
    'sceeeEnergyValue',
    'compensatedEnergyKwh',
    'compensatedEnergyValue',
    'publicLightingContrib',
    'energyConsumptionKwh',
    'totalValueWithoutGd',
    'gdSavings',
    'fileUrl',
    'processedAt',
  ],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Identificador único da fatura (UUID v4), gerado automaticamente.',
      example: 'a3b4c5d6-e7f8-9012-abcd-ef1234567890',
    },
    customerId: {
      type: 'string',
      format: 'uuid',
      description: 'ID do registro de cliente vinculado a esta fatura (UUID v4).',
      example: 'f1e2d3c4-b5a6-7890-abcd-ef0123456789',
    },
    customerNumber: {
      type: 'string',
      description:
        'Número do cliente conforme impresso na fatura (campo "Nº do Cliente"). Junto com referenceMonth forma a chave única da fatura.',
      example: '7202210726',
    },
    referenceMonth: {
      type: 'string',
      description:
        'Mês de referência no formato MMM/AAAA em português e maiúsculas. Junto com customerNumber forma a chave única da fatura.',
      example: 'SET/2024',
    },
    electricEnergyKwh: {
      type: 'number',
      description: 'Energia Elétrica consumida em kWh. Extraído diretamente do PDF pelo LLM.',
      example: 50,
    },
    electricEnergyValue: {
      type: 'number',
      description:
        'Valor cobrado pela Energia Elétrica em R$. Extraído diretamente do PDF pelo LLM.',
      example: 38.63,
    },
    sceeeEnergyKwh: {
      type: 'number',
      description:
        'Energia SCEE sem ICMS (Sistema de Compensação de Energia Elétrica) em kWh. Extraído diretamente do PDF pelo LLM.',
      example: 476,
    },
    sceeeEnergyValue: {
      type: 'number',
      description: 'Valor da Energia SCEE sem ICMS em R$. Extraído diretamente do PDF pelo LLM.',
      example: 366.28,
    },
    compensatedEnergyKwh: {
      type: 'number',
      description:
        'Energia Compensada GD I (Geração Distribuída) em kWh. Extraído diretamente do PDF pelo LLM.',
      example: 476,
    },
    compensatedEnergyValue: {
      type: 'number',
      description:
        'Valor da Energia Compensada GD I em R$. Sempre negativo — a distribuidora já o armazena como crédito (desconto). Extraído do PDF pelo LLM.',
      example: -354.11,
    },
    publicLightingContrib: {
      type: 'number',
      description:
        'Contribuição de Iluminação Pública Municipal (CIP/COSIP) em R$. Extraído diretamente do PDF pelo LLM.',
      example: 49.43,
    },
    energyConsumptionKwh: {
      type: 'number',
      description:
        'Consumo total de energia em kWh. **Calculado pela aplicação:** electricEnergyKwh + sceeeEnergyKwh.',
      example: 526,
    },
    totalValueWithoutGd: {
      type: 'number',
      description:
        'Valor total da conta sem o desconto GD em R$. **Calculado pela aplicação:** electricEnergyValue + sceeeEnergyValue + publicLightingContrib.',
      example: 454.34,
    },
    gdSavings: {
      type: 'number',
      description:
        'Economia gerada pela Geração Distribuída em R$. **Calculado pela aplicação:** igual a compensatedEnergyValue — sempre negativo (representa o crédito obtido pelo cliente).',
      example: -354.11,
    },
    fileUrl: {
      type: 'string',
      nullable: true,
      description:
        'URL do arquivo PDF armazenado. Atualmente sempre null — o PDF é processado em memória e não persiste em disco.',
      example: null,
    },
    processedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Timestamp UTC do momento em que a fatura foi processada e salva (ISO 8601).',
      example: '2024-09-15T14:23:00.000Z',
    },
  },
};

const errorSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  required: ['success', 'error'],
  properties: {
    success: {
      type: 'boolean',
      description: 'Sempre false em respostas de erro.',
      example: false,
    },
    error: {
      type: 'object',
      required: ['code', 'message'],
      properties: {
        code: {
          type: 'string',
          description:
            'Código identificador do tipo de erro. Valores possíveis: ValidationError, LLMParseError, LLMError, NotFoundError, InternalError.',
          example: 'ValidationError',
        },
        message: {
          type: 'string',
          description: 'Descrição legível do erro. Em produção, detalhes internos são omitidos.',
          example: 'PDF file is required',
        },
      },
    },
  },
};

const customerNumberParam: OpenAPIV3.ParameterObject = {
  name: 'customer_number',
  in: 'query',
  required: false,
  description:
    'Número do cliente conforme impresso na fatura (campo "Nº do Cliente"). Omita para retornar dados de todos os clientes.',
  schema: { type: 'string' },
  example: '7202210726',
};

const internalErrorResponse: OpenAPIV3.ResponseObject = {
  description:
    'Erro interno inesperado. Pode ocorrer por falha de banco de dados ou exceção não tratada pela aplicação.',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' },
      examples: {
        'erro-interno': {
          summary: 'Erro interno genérico',
          value: {
            success: false,
            error: { code: 'InternalError', message: 'Internal server error' },
          },
        },
      },
    },
  },
};

const invoiceExample = {
  id: 'a3b4c5d6-e7f8-9012-abcd-ef1234567890',
  customerId: 'f1e2d3c4-b5a6-7890-abcd-ef0123456789',
  customerNumber: '7202210726',
  referenceMonth: 'SET/2024',
  electricEnergyKwh: 50,
  electricEnergyValue: 38.63,
  sceeeEnergyKwh: 476,
  sceeeEnergyValue: 366.28,
  compensatedEnergyKwh: 476,
  compensatedEnergyValue: -354.11,
  publicLightingContrib: 49.43,
  energyConsumptionKwh: 526,
  totalValueWithoutGd: 454.34,
  gdSavings: -354.11,
  fileUrl: null,
  processedAt: '2024-09-15T14:23:00.000Z',
};

export const openApiSpec: OpenAPIV3.Document = {
  openapi: '3.0.3',
  info: {
    title: 'EnergyLedger – Energy Invoice API',
    version: '1.0.0',
    license: { name: 'MIT' },
    description: `
API RESTful para processamento de faturas de energia elétrica.

## Funcionalidades

- **Upload de faturas PDF**: recebe o arquivo, extrai dados estruturados via **Google Gemini 2.5 Flash** (sem OCR separado) e persiste no **PostgreSQL**.
- **Idempotência**: reenviar a mesma fatura (mesmo cliente + mesmo mês) **atualiza** o registro existente via **upsert** — sem duplicatas.
- **Dashboards**: consulta agregada de consumo de energia (kWh) e valores financeiros (R$) por mês de referência.

## Campos calculados

Os campos abaixo **não constam no PDF** — são derivados pela aplicação:

| Campo | Fórmula |
|---|---|
| \`energyConsumptionKwh\` | electricEnergyKwh + sceeeEnergyKwh |
| \`totalValueWithoutGd\` | electricEnergyValue + sceeeEnergyValue + publicLightingContrib |
| \`gdSavings\` | compensatedEnergyValue (preservado como negativo) |
    `.trim(),
  },
  externalDocs: {
    description: 'Documentação completa com playground interativo → /docs',
    url: 'https://energy-ledger.up.railway.app/docs',
  },
  servers: [
    { url: 'https://energy-ledger.up.railway.app', description: 'Produção (Railway)' },
    { url: 'http://localhost:3000', description: 'Desenvolvimento local' },
  ],
  tags: [
    {
      name: 'Faturas',
      description: 'Upload e listagem de faturas de energia elétrica processadas via LLM.',
    },
    {
      name: 'Dashboard',
      description:
        'Métricas agregadas de consumo de energia (kWh) e valores financeiros (R$) por mês de referência.',
    },
    {
      name: 'Health',
      description: 'Verificação de disponibilidade do serviço.',
    },
  ],
  components: {
    schemas: {
      Invoice: invoiceSchema,
      Error: errorSchema,
    },
  },
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Verificação de disponibilidade',
        description:
          'Retorna status 200 quando o servidor está operacional. Útil para health checks de orquestradores (Docker, Kubernetes).',
        operationId: 'healthCheck',
        responses: {
          '200': {
            description: 'Serviço operacional.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['status'],
                  properties: {
                    status: {
                      type: 'string',
                      description: 'Sempre "ok" quando o servidor responde.',
                      example: 'ok',
                    },
                  },
                },
                examples: {
                  operacional: {
                    summary: 'Serviço disponível',
                    value: { status: 'ok' },
                  },
                },
              },
            },
          },
          '500': internalErrorResponse,
        },
      },
    },

    '/api/v1/invoices/upload': {
      post: {
        tags: ['Faturas'],
        summary: 'Upload e processamento de fatura PDF',
        operationId: 'uploadInvoice',
        description: `
Recebe um arquivo PDF de fatura de energia elétrica e executa o pipeline completo:

1. **Validação** do arquivo (tipo \`application/pdf\`, tamanho máx. \`UPLOAD_MAX_SIZE_MB\`)
2. **Extração** de dados via Google Gemini 2.5 Flash (3 tentativas com backoff exponencial)
3. **Validação** do JSON retornado pelo LLM contra schema Zod
4. **Cálculo** dos campos derivados pela \`InvoiceEntity\`
5. **Upsert** no PostgreSQL pela constraint única \`(customerNumber, referenceMonth)\`

> **Idempotência:** enviar a mesma fatura duas vezes atualiza o registro existente — não cria duplicata.
        `.trim(),
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['invoice'],
                properties: {
                  invoice: {
                    type: 'string',
                    format: 'binary',
                    description:
                      'Arquivo PDF da fatura de energia elétrica. O campo **deve** se chamar `invoice`. Tamanho máximo configurado em `UPLOAD_MAX_SIZE_MB` (padrão: 10 MB).',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Fatura processada e salva com sucesso.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['success', 'data'],
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Invoice' },
                  },
                },
                examples: {
                  'fatura-processada': {
                    summary: 'Fatura processada com sucesso',
                    value: { success: true, data: invoiceExample },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'Arquivo ausente, tipo inválido (não é PDF) ou campo `invoice` não encontrado no body.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
                examples: {
                  'arquivo-ausente': {
                    summary: 'Nenhum arquivo enviado',
                    value: {
                      success: false,
                      error: { code: 'ValidationError', message: 'PDF file is required' },
                    },
                  },
                  'tipo-invalido': {
                    summary: 'Arquivo não é um PDF',
                    value: {
                      success: false,
                      error: { code: 'ValidationError', message: 'Only PDF files are allowed' },
                    },
                  },
                  'campo-errado': {
                    summary: 'Campo do formulário com nome incorreto',
                    value: {
                      success: false,
                      error: {
                        code: 'ValidationError',
                        message: 'File must be sent in the "invoice" field',
                      },
                    },
                  },
                },
              },
            },
          },
          '413': {
            description: 'Arquivo acima do limite máximo configurado em `UPLOAD_MAX_SIZE_MB`.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
                examples: {
                  'arquivo-grande': {
                    summary: 'Arquivo excede o limite configurado',
                    value: {
                      success: false,
                      error: {
                        code: 'ValidationError',
                        message: 'File size exceeds the 10MB limit',
                      },
                    },
                  },
                },
              },
            },
          },
          '422': {
            description:
              'O LLM retornou dados que não passam na validação do schema Zod (campo ausente, tipo incorreto, ou o PDF não é uma fatura de energia reconhecível).',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
                examples: {
                  'campos-invalidos': {
                    summary: 'LLM retornou dados incompletos ou com tipo incorreto',
                    value: {
                      success: false,
                      error: {
                        code: 'LLMParseError',
                        message:
                          'LLM response failed schema validation: missing field "customerNumber"',
                      },
                    },
                  },
                  'pdf-nao-reconhecido': {
                    summary: 'PDF não é uma fatura de energia reconhecível',
                    value: {
                      success: false,
                      error: {
                        code: 'LLMParseError',
                        message: 'Document does not appear to be an energy invoice',
                      },
                    },
                  },
                },
              },
            },
          },
          '502': {
            description:
              'Falha na API do Google Gemini após 3 tentativas com backoff exponencial (rate limit, timeout ou quota esgotada).',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
                examples: {
                  'gemini-indisponivel': {
                    summary: 'API Gemini inacessível após retentativas',
                    value: {
                      success: false,
                      error: {
                        code: 'LLMError',
                        message: 'Gemini API failed after 3 attempts: rate limit exceeded',
                      },
                    },
                  },
                },
              },
            },
          },
          '500': internalErrorResponse,
        },
      },
    },

    '/api/v1/invoices': {
      get: {
        tags: ['Faturas'],
        summary: 'Listar faturas',
        operationId: 'listInvoices',
        description:
          'Retorna uma lista paginada de faturas processadas. Todos os filtros são opcionais e combináveis. A resposta inclui metadados de paginação (`total`, `page`, `limit`).',
        parameters: [
          {
            ...customerNumberParam,
            description:
              'Filtra faturas de um único cliente. Omita para listar faturas de todos os clientes.',
          },
          {
            name: 'reference_month',
            in: 'query',
            required: false,
            description:
              'Filtra faturas de um mês específico. Formato: `MMM/AAAA` em português e maiúsculas (ex: `JAN/2024`, `SET/2024`). Omita para listar todos os meses.',
            schema: { type: 'string', pattern: '^[A-Z]{3}/\\d{4}$' },
            example: 'SET/2024',
          },
          {
            name: 'page',
            in: 'query',
            required: false,
            description: 'Número da página. Começa em 1. Padrão: 1.',
            schema: { type: 'integer', default: 1, minimum: 1 },
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            description: 'Quantidade de registros por página. Máximo: 100. Padrão: 20.',
            schema: { type: 'integer', default: 20, minimum: 1, maximum: 100 },
          },
        ],
        responses: {
          '200': {
            description: 'Lista paginada de faturas.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['success', 'data', 'total', 'page', 'limit'],
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'array',
                      description: 'Array de faturas correspondentes aos filtros aplicados.',
                      items: { $ref: '#/components/schemas/Invoice' },
                    },
                    total: {
                      type: 'integer',
                      description:
                        'Total de registros que correspondem aos filtros (sem considerar paginação).',
                      example: 42,
                    },
                    page: {
                      type: 'integer',
                      description: 'Página atual retornada.',
                      example: 1,
                    },
                    limit: {
                      type: 'integer',
                      description: 'Quantidade de registros por página usada nesta resposta.',
                      example: 20,
                    },
                  },
                },
                examples: {
                  'lista-com-resultados': {
                    summary: 'Lista com faturas encontradas',
                    value: {
                      success: true,
                      data: [invoiceExample],
                      total: 12,
                      page: 1,
                      limit: 20,
                    },
                  },
                  'lista-vazia': {
                    summary: 'Nenhuma fatura encontrada para os filtros',
                    value: { success: true, data: [], total: 0, page: 1, limit: 20 },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Parâmetros de query inválidos.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
                examples: {
                  'page-invalido': {
                    summary: 'page não é um inteiro positivo',
                    value: {
                      success: false,
                      error: {
                        code: 'ValidationError',
                        message: '"page" must be a positive integer',
                      },
                    },
                  },
                  'formato-mes-invalido': {
                    summary: 'reference_month fora do padrão MMM/AAAA',
                    value: {
                      success: false,
                      error: {
                        code: 'ValidationError',
                        message:
                          '"reference_month" must follow the pattern MMM/YYYY (e.g. SET/2024)',
                      },
                    },
                  },
                },
              },
            },
          },
          '500': internalErrorResponse,
        },
      },
    },

    '/api/v1/dashboard/energy': {
      get: {
        tags: ['Dashboard'],
        summary: 'Dashboard de energia',
        operationId: 'getEnergyDashboard',
        description:
          'Retorna o consumo de energia elétrica (kWh) e a energia compensada GD (kWh) agrupados por mês de referência. Os valores são somados quando múltiplas faturas existem para o mesmo mês. Omita **customer_number** para agregar todos os clientes.',
        parameters: [customerNumberParam],
        responses: {
          '200': {
            description: 'Dados do dashboard de energia agrupados por mês de referência.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['success', 'data'],
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      required: ['customerNumber', 'data'],
                      properties: {
                        customerNumber: {
                          type: 'string',
                          nullable: true,
                          description:
                            'Número do cliente filtrado. Null quando nenhum filtro foi aplicado (todos os clientes).',
                          example: '7202210726',
                        },
                        data: {
                          type: 'array',
                          description:
                            'Dados agrupados por mês de referência, ordenados cronologicamente.',
                          items: {
                            type: 'object',
                            required: [
                              'referenceMonth',
                              'energyConsumptionKwh',
                              'compensatedEnergyKwh',
                            ],
                            properties: {
                              referenceMonth: {
                                type: 'string',
                                description: 'Mês de referência no formato MMM/AAAA.',
                                example: 'SET/2024',
                              },
                              energyConsumptionKwh: {
                                type: 'number',
                                description:
                                  'Consumo total de energia em kWh (electricEnergyKwh + sceeeEnergyKwh).',
                                example: 526,
                              },
                              compensatedEnergyKwh: {
                                type: 'number',
                                description: 'Energia compensada pela Geração Distribuída em kWh.',
                                example: 476,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                examples: {
                  'todos-clientes': {
                    summary: 'Agregado de todos os clientes (sem filtro)',
                    value: {
                      success: true,
                      data: {
                        customerNumber: null,
                        data: [
                          {
                            referenceMonth: 'JUL/2024',
                            energyConsumptionKwh: 1052,
                            compensatedEnergyKwh: 952,
                          },
                          {
                            referenceMonth: 'AGO/2024',
                            energyConsumptionKwh: 978,
                            compensatedEnergyKwh: 890,
                          },
                          {
                            referenceMonth: 'SET/2024',
                            energyConsumptionKwh: 526,
                            compensatedEnergyKwh: 476,
                          },
                        ],
                      },
                    },
                  },
                  'cliente-especifico': {
                    summary: 'Filtrado por customer_number',
                    value: {
                      success: true,
                      data: {
                        customerNumber: '7202210726',
                        data: [
                          {
                            referenceMonth: 'JUL/2024',
                            energyConsumptionKwh: 520,
                            compensatedEnergyKwh: 476,
                          },
                          {
                            referenceMonth: 'AGO/2024',
                            energyConsumptionKwh: 498,
                            compensatedEnergyKwh: 445,
                          },
                          {
                            referenceMonth: 'SET/2024',
                            energyConsumptionKwh: 526,
                            compensatedEnergyKwh: 476,
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Parâmetro de query inválido.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
                examples: {
                  'param-invalido': {
                    summary: 'Parâmetro com formato inválido',
                    value: {
                      success: false,
                      error: { code: 'ValidationError', message: 'Invalid query parameter' },
                    },
                  },
                },
              },
            },
          },
          '500': internalErrorResponse,
        },
      },
    },

    '/api/v1/dashboard/financial': {
      get: {
        tags: ['Dashboard'],
        summary: 'Dashboard financeiro',
        operationId: 'getFinancialDashboard',
        description:
          'Retorna os valores financeiros em R$ agrupados por mês de referência: valor total da conta sem GD e a economia gerada pela Geração Distribuída. Os valores são somados quando múltiplas faturas existem para o mesmo mês. Omita **customer_number** para agregar todos os clientes.',
        parameters: [customerNumberParam],
        responses: {
          '200': {
            description: 'Dados do dashboard financeiro agrupados por mês de referência.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['success', 'data'],
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      required: ['customerNumber', 'data'],
                      properties: {
                        customerNumber: {
                          type: 'string',
                          nullable: true,
                          description:
                            'Número do cliente filtrado. Null quando nenhum filtro foi aplicado (todos os clientes).',
                          example: '7202210726',
                        },
                        data: {
                          type: 'array',
                          description:
                            'Dados agrupados por mês de referência, ordenados cronologicamente.',
                          items: {
                            type: 'object',
                            required: ['referenceMonth', 'totalValueWithoutGd', 'gdSavings'],
                            properties: {
                              referenceMonth: {
                                type: 'string',
                                description: 'Mês de referência no formato MMM/AAAA.',
                                example: 'SET/2024',
                              },
                              totalValueWithoutGd: {
                                type: 'number',
                                description:
                                  'Valor total da conta sem o desconto GD em R$ (electricEnergyValue + sceeeEnergyValue + publicLightingContrib). Representa o que seria cobrado sem geração distribuída.',
                                example: 454.34,
                              },
                              gdSavings: {
                                type: 'number',
                                description:
                                  'Economia gerada pela Geração Distribuída em R$. Sempre negativo — representa o crédito/desconto obtido pelo cliente.',
                                example: -354.11,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                examples: {
                  'todos-clientes': {
                    summary: 'Agregado de todos os clientes (sem filtro)',
                    value: {
                      success: true,
                      data: {
                        customerNumber: null,
                        data: [
                          {
                            referenceMonth: 'JUL/2024',
                            totalValueWithoutGd: 908.68,
                            gdSavings: -708.22,
                          },
                          {
                            referenceMonth: 'AGO/2024',
                            totalValueWithoutGd: 872.44,
                            gdSavings: -660.5,
                          },
                          {
                            referenceMonth: 'SET/2024',
                            totalValueWithoutGd: 454.34,
                            gdSavings: -354.11,
                          },
                        ],
                      },
                    },
                  },
                  'cliente-especifico': {
                    summary: 'Filtrado por customer_number',
                    value: {
                      success: true,
                      data: {
                        customerNumber: '7202210726',
                        data: [
                          {
                            referenceMonth: 'JUL/2024',
                            totalValueWithoutGd: 454.34,
                            gdSavings: -354.11,
                          },
                          {
                            referenceMonth: 'AGO/2024',
                            totalValueWithoutGd: 436.22,
                            gdSavings: -330.25,
                          },
                          {
                            referenceMonth: 'SET/2024',
                            totalValueWithoutGd: 454.34,
                            gdSavings: -354.11,
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Parâmetro de query inválido.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
                examples: {
                  'param-invalido': {
                    summary: 'Parâmetro com formato inválido',
                    value: {
                      success: false,
                      error: { code: 'ValidationError', message: 'Invalid query parameter' },
                    },
                  },
                },
              },
            },
          },
          '500': internalErrorResponse,
        },
      },
    },
  },
};
