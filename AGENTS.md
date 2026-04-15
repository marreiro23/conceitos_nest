# AGENTS.md

## Visão geral do projeto

Este repositório é o **`conceitos_nest`**, uma API de estudos construída com:

- **NestJS** + **TypeScript**
- **TypeORM** + **PostgreSQL**
- Organização modular com foco em `pessoas` e `recados`

As diretrizes principais do projeto estão em `/.github/copilot-instructions.md`.

## Recursos presentes no projeto

### Código-fonte principal

- `src/main.ts` — bootstrap da aplicação com `ValidationPipe` global.
- `src/app/` — composição da aplicação (`AppModule`, controller/service base).
- `src/pessoas/` — módulo de pessoas (controller, service, DTOs, entidades).
- `src/recados/` — módulo de recados (controller, service, DTOs, entidades,
  utils).
- `src/common/` — recursos compartilhados:
  - `dto/` (paginação)
  - `pipes/` (ex.: `parse-int-id.pipe.ts`)
  - `filters/`, `guards/`, `interceptors/`, `middlewares/`, `params/`, `regex/`
- `src/database/migrations/` — migrações do banco.

### Documentação e diagramas

- `docs/` contém diagramas Mermaid e documentação arquitetural.
- Convenção de nomenclatura Mermaid (obrigatória em `docs/**/*.mmd`):
  - prefixos `flow-`, `er-`, `sequence-`
  - nome em `kebab-case`
  - regra definida em
    `/.github/instructions/mermaid-nomenclatura.instructions.md`
- Índice e auditoria de diagramas:
  - `docs/README.md`
  - `docs/auditoria-codigo-mermaid.md`

### Suporte de testes e configuração

- `test/app.e2e-spec.ts` + `test/jest-e2e.json` — testes E2E.
- `eslint.config.mjs` / `eslint.config.mts` — lint.
- `tsconfig.json` / `tsconfig.build.json` — TypeScript.
- `client.rest` — coleção de requests para teste manual.

## Comandos de desenvolvimento

Use os scripts do `package.json`:

- Instalar dependências: `npm install`
- Rodar em desenvolvimento: `npm run start:dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Testes unitários: `npm run test`
- Testes E2E: `npm run test:e2e`

## Convenções importantes (arquivo carregado no chat)

Com base no `/.github/copilot-instructions.md`:

- Preferir DTOs e serviços **fortemente tipados**.
- Manter consistência de imports conforme padrão já existente.
- Em endpoints novos/alterados, ajustar decorators de validação dos DTOs.
- Em entidades não encontradas, preferir `NotFoundException` com mensagem clara.
- Atenção ao uso simultâneo de `synchronize: true` e `migrationsRun: true` no
  TypeORM.
- Variáveis de ambiente esperadas em `.env.local` e `.env` (consultar
  `.env.example`).

## Informações novas de agentes (contexto do chat)

No contexto atual do chat, há agentes especializados disponíveis para tarefas
específicas, por exemplo:

- `api-architect`
- `TypeScript MCP Server Expert`
- `Explore`
- `DeployToAzure`
- `Azure_function_codegen_and_deployment`
- `Azure_Static_Web_App`
- `LambdaToFunctionMigration`
- `Azure IaC Generator`
- `Azure IaC Exporter`
- `MCP AppService Builder`
- `AzqrCostOptimizeAgent` / `AzureCostOptimizeAgent`

> Observação: estes agentes fazem parte do ambiente de assistência do chat e
> podem ser usados conforme o tipo de tarefa.

## Prompts e instruções customizadas no repositório

Arquivos úteis em `/.github/`:

- **Prompts** (`/.github/prompts/`):
  - `mermaid-documentacao.prompt.md`
  - `gerar-indice-documentacao-mermaid.prompt.md`
  - `auditar-mermaid-vs-codigo.prompt.md`
- **Instruções** (`/.github/instructions/`):
  - `mermaid-nomenclatura.instructions.md`

## Observações de arquitetura

- A composição principal está em `src/app/app.module.ts`.
- `RecadosModule` depende de `PessoasModule`.
- `ConceitosAutomaticoModule` e `ConceitosManualModule` existem, porém não estão
  importados no `AppModule` atualmente.
