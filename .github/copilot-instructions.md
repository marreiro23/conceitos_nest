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
  - `ConfigModule.forRoot` (`.env.local`, `.env`)
  - `TypeOrmModule.forRoot` (PostgreSQL, `autoLoadEntities`, migrations)
- Relationship example and cross-module dependency:
  - `src/recados/recados.module.ts` imports `PessoasModule`
  - `src/recados/recados.service.ts` injects `PessoasService`
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
- `README.md` is mostly upstream Nest template content; rely on project files
  above for repository-specific behavior.
