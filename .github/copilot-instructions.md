# Project Guidelines

## Code Style

- Stack: NestJS + TypeScript + TypeORM (PostgreSQL).
- Follow existing lint/format rules instead of redefining style in code reviews.
  - ESLint: `eslint.config.mjs`
  - Prettier: `.prettierrc`
- Prefer explicit, strongly typed DTO/entity/service code (avoid `any` unless
  existing patterns require it).
- Keep module/service imports consistent with current project convention
  (including `src/...` absolute imports where already used).

## Architecture

- Core composition lives in `src/app/app.module.ts`.
- Feature modules live under `src/` (notably `pessoas/` and `recados/`), using
  Controller → Service → Repository flow.
- Infrastructure is configured in `AppModule`:
  - `ConfigModule.forRoot` (`.env.local`, `.env`) — global, env files:
    `.env.local`, `.env`
  - `TypeOrmModule.forRoot` (PostgreSQL, `autoLoadEntities`,
    `synchronize: true`, `migrationsRun: true`)
- Relationship example and cross-module dependency:
  - `src/recados/recados.module.ts` imports `PessoasModule`
  - `src/recados/recados.service.ts` injects `PessoasService`
- Shared utilities live in `src/common/`:
  - `src/common/dto/pagination.dto.ts` — `PaginationDto` (limit/offset, used by
    recados)
  - `src/common/pipes/parse-int-id.pipe.ts` — `ParseIntIdPipe` (validates `:id`
    params; applied class-level via `@UsePipes(ParseIntIdPipe)` on
    `RecadosController`)
- Module map: `docs/arquitetura/flow-dependencias-modulos-completo.mmd`

## Build and Test

Use npm scripts from `package.json`:

- Install: `npm install`
- Dev server: `npm run start:dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Unit tests: `npm run test`
- E2E tests: `npm run test:e2e`

## Conventions

- Global request validation/transformation is enabled in `src/main.ts` with
  `ValidationPipe` (`whitelist`, `forbidNonWhitelisted`, `transform`).
  - When adding/altering endpoints, always update DTO decorators to match
    expected payload/query behavior.
- Prefer `NotFoundException` and clear messages for missing entities (see
  `src/pessoas/pessoas.service.ts` and `src/recados/recados.service.ts`).
- Keep TypeORM changes aligned with existing migrations in
  `src/database/migrations/`.
- Environment variables are expected for DB/server settings. See `.env.example`.

## Known Gotchas

- `ConceitosAutomaticoModule` and `ConceitosManualModule` currently exist but
  are not imported in `AppModule` (see
  `docs/arquitetura/flow-dependencias-modulos-completo.mmd`).
- `AppController` uses `@Controller('home')` but its `@Get` route decorators are
  commented out — the controller has no active HTTP routes.
- `TypeOrmModule.forRoot` has both `synchronize: true` and `migrationsRun: true`
  active simultaneously. Do not enable `synchronize: true` in production.
- `TypeOrmModule.forRoot` reads DB credentials directly via `process.env` (not
  through `ConfigService`), so `ConfigModule` is only used for other env vars.
- `README.md` is mostly upstream Nest template content; rely on project files
  above for repository-specific behavior. A Mermaid diagram catalog section was
  added at the bottom of `README.md` (links to all `.mmd` files).

## Prompts disponíveis (`.github/prompts/`)

- `mermaid-documentacao.prompt.md` — Cria/atualiza diagramas Mermaid.
- `gerar-indice-documentacao-mermaid.prompt.md` — Gera/atualiza
  `docs/README.md`.
- `auditar-mermaid-vs-codigo.prompt.md` — Audita divergências código ×
  diagramas.

## Instruções personalizadas (`.github/instructions/`)

- `mermaid-nomenclatura.instructions.md` — Padrão obrigatório de nomes para
  arquivos `.mmd` em `docs/` (`flow-`, `er-`, `sequence-`, kebab-case).
