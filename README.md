# conceitos_nest

API de estudos em **NestJS + TypeScript + TypeORM (PostgreSQL)**, organizada de
forma modular com foco nos domínios de `pessoas` e `recados`.

## Visão geral

- Stack principal: NestJS, TypeScript, TypeORM, PostgreSQL.
- Validação global habilitada em `src/main.ts` com `ValidationPipe`
  (`whitelist`, `forbidNonWhitelisted`, `transform`).
- Composição principal em `src/app/app.module.ts`.
- Fluxo arquitetural predominante: **Controller → Service → Repository
  (TypeORM)**.

## Estrutura principal do repositório

- `src/main.ts` — bootstrap da aplicação.
- `src/app/` — módulo principal (`AppModule`) e componentes base.
- `src/pessoas/` — módulo de pessoas (controller, service, DTOs, entidades).
- `src/recados/` — módulo de recados (controller, service, DTOs, entidades e
  utils).
- `src/common/` — recursos compartilhados (pipes, DTOs, interceptors, filters
  etc.).
- `src/database/migrations/` — migrações do banco.
- `test/` — testes E2E e configuração Jest E2E.
- `docs/` — documentação e diagramas Mermaid.

## Dependências entre módulos (resumo)

- `RecadosModule` importa `PessoasModule`.
- `RecadosService` injeta `PessoasService`.
- `ConceitosAutomaticoModule` e `ConceitosManualModule` existem, mas não estão
  importados no `AppModule` atualmente.

## Setup e execução

### Instalar dependências

```bash
npm install
```

### Rodar em desenvolvimento

```bash
npm run start:dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Testes

```bash
npm run test
npm run test:e2e
```

## Configuração de ambiente

- Arquivos esperados: `.env.local` e `.env`.
- Consulte `.env.example` para variáveis esperadas.
- Observação importante: `TypeOrmModule.forRoot` está com `synchronize: true` e
  `migrationsRun: true` simultaneamente. Evite `synchronize: true` em produção.

## Convenções do projeto

- Preferir DTOs e serviços fortemente tipados (evitar `any`).
- Manter consistência de imports conforme padrão atual do código.
- Em endpoints novos/alterados, atualizar decorators de validação dos DTOs.
- Para entidades não encontradas, preferir `NotFoundException` com mensagens
  claras.

## Documentação Mermaid

Referência principal:

- `docs/README.md`

Convenção de nomenclatura para diagramas `.mmd`:

- Prefixos obrigatórios: `flow-`, `er-`, `sequence-`
- Nome em `kebab-case`
- Regra em `/.github/instructions/mermaid-nomenclatura.instructions.md`

Catálogo resumido:

### Arquitetura

- `docs/modules-diagram.mmd` _(legado temporário)_
- `docs/arquitetura/flow-modulos-app.mmd`
- `docs/arquitetura/flow-dependencias-modulos-completo.mmd`

### App / Bootstrap

- `docs/app/flow-bootstrap-app.mmd`
- `docs/app/flow-app-completo.mmd`

### Pessoas

- `docs/pessoas/flow-crud-pessoas.mmd`
- `docs/pessoas/flow-pessoas-completo.mmd`

### Recados

- `docs/recados/flow-crud-recados.mmd`
- `docs/recados/flow-recados-completo.mmd`
- `docs/recados/sequence-criacao-recado.mmd`

### Database

- `docs/database/er-pessoas-recados.mmd`
- `docs/database/er-modelo-completo-pessoas-recados.mmd`

## Arquivos de apoio para Copilot

- `AGENTS.md` — visão operacional resumida para agentes.
- `/.github/copilot-instructions.md` — diretrizes principais de estilo,
  arquitetura e fluxo.
- `/.github/prompts/` — prompts utilitários para documentação Mermaid.
- `/.github/instructions/` — instruções personalizadas por padrão de arquivo.

## Licença

Projeto de estudos. Consulte a política do repositório para uso e distribuição.
