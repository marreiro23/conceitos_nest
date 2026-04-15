# Auditoria Código x Mermaid

Data: 2026-04-14 Escopo: app, pessoas, recados, database

## Resumo executivo

A documentação Mermaid estava parcialmente desatualizada e concentrada em um
único diagrama geral legado. A documentação foi expandida por recurso com
nomenclatura padronizada e cobertura completa de módulos, controllers, services,
entities, DTOs, validações e dependências de imports/exports.

## Divergências encontradas

1. **Alta** — Ausência de diagramas por recurso
   - Impacto: baixa rastreabilidade por domínio.
   - Evidência: apenas `docs/modules-diagram.mmd` existia.
   - Correção aplicada: criação de diagramas em `docs/app/`, `docs/pessoas/`,
     `docs/recados/`, `docs/database/`, `docs/arquitetura/`.

2. **Média** — Nomenclatura fora do padrão recomendado
   - Impacto: dificuldade de busca e padronização.
   - Evidência: diagrama legado fora do padrão `flow-`, `er-`, `sequence-`.
   - Correção aplicada: novo consolidado `docs/arquitetura/flow-modulos-app.mmd`
     e versão completa
     `docs/arquitetura/flow-dependencias-modulos-completo.mmd`.
   - Status atual: referências oficiais migradas; legado mantido por 1 ciclo.

3. **Média** — Índice sem apontar documentos reais por recurso
   - Impacto: navegação incompleta.
   - Evidência: `docs/README.md` tinha placeholders de ausência de diagramas.
   - Correção aplicada: atualização do índice (ver README atualizado).

## Arquivos criados nesta auditoria

- `docs/arquitetura/flow-dependencias-modulos-completo.mmd`
- `docs/arquitetura/flow-modulos-app.mmd`
- `docs/arquitetura/migracao-legado-modules-diagram.md`
- `docs/app/flow-app-completo.mmd`
- `docs/app/flow-bootstrap-app.mmd`
- `docs/pessoas/flow-pessoas-completo.mmd`
- `docs/pessoas/flow-crud-pessoas.mmd`
- `docs/recados/flow-recados-completo.mmd`
- `docs/recados/flow-crud-recados.mmd`
- `docs/recados/sequence-criacao-recado.mmd`
- `docs/database/er-modelo-completo-pessoas-recados.mmd`
- `docs/database/er-pessoas-recados.mmd`
- `docs/auditoria-codigo-mermaid.md`

## Próximos passos sugeridos

- Revisar visualmente os diagramas com o time.
- Remover `docs/modules-diagram.mmd` no ciclo 2026-Q3 conforme plano de migração
  controlada.
- Rodar auditoria recorrente após mudanças estruturais (novos módulos, entidades
  ou relacionamentos).

---

## Auditoria 2026-04-14 — Rodada 2

Escopo: app, pessoas, recados (revisão de aderência código × diagramas
existentes)

### Resumo — Rodada 2

Auditoria focada em aderência detalhada entre código real e diagramas criados na
rodada 1. Três divergências identificadas; duas corrigidas nos próprios `.mmd`.

### Divergências — Rodada 2

1. **Alta** — `docs/app/flow-app-completo.mmd` mostrava rotas ativas no
   `AppController`, mas os decoradores `@Get` estão comentados em
   `src/app/app.controller.ts`.
   - Correção aplicada: subgraph reescrito para refletir "sem rotas ativas".

2. **Média** — `docs/recados/flow-recados-completo.mmd` registrava
   `ParseIntPipe` no `findOne` do controlador, mas o projeto usa
   `@UsePipes(ParseIntIdPipe)` aplicado no nível de classe em
   `RecadosController`.
   - Correção aplicada: label atualizado para
     `ParseIntIdPipe via UsePipes class-level`.

3. **Baixa** — `src/common/` (pipes e DTOs compartilhados) sem diagrama
   dedicado.
   - Decisão: documentado como lacuna em `copilot-instructions.md`. Não gera
     diagrama separado por ser cobertura transversal já referenciada em
     `flow-recados-completo.mmd` e `flow-pessoas-completo.mmd`.

### Arquivos alterados — Rodada 2

- `docs/app/flow-app-completo.mmd` — corrigido
- `docs/recados/flow-recados-completo.mmd` — corrigido
- `.github/copilot-instructions.md` — atualizado com `src/common/`, gotchas,
  prompts disponíveis e referências de instruções personalizadas
- `docs/auditoria-codigo-mermaid.md` — esta seção adicionada

---

## Auditoria 2026-04-15 — Rodada 3

Escopo: todos os diagramas em `docs/` vs código real da API

### Resumo — Rodada 3

Auditoria completa levantando divergências remanescentes após rodada 2. Quatro
divergências identificadas e corrigidas.

### Divergências — Rodada 3

1. **Alta** — `docs/recados/flow-recados-completo.mmd` — label `RFindOne`
   incorreto.
   - Evidência: o label dizia `ParseIntIdPipe via UsePipes class-level`, mas
     `RecadosController` **não** possui `@UsePipes` nem
     `@Param('id', ParseIntIdPipe)`. O `ParseIntIdPipe` é registrado
     **globalmente** em `src/main.ts` via `app.useGlobalPipes()`.
   - Correção aplicada: label atualizado para
     `GET id - ParseIntIdPipe via useGlobalPipes main.ts`.

2. **Alta** — `docs/recados/flow-recados-completo.mmd` — `ChangeDataInterceptor`
   ausente.
   - Evidência: `RecadosController` usa
     `@UseInterceptors(ChangeDataInterceptor)` no nível de classe (todas as
     rotas), mas o diagrama não refletia isso.
   - Correção aplicada: nó `CR` atualizado para incluir
     `UseInterceptors ChangeDataInterceptor class-level`.

3. **Média** — `docs/database/er-pessoas-recados.mmd` — timestamps de RECADOS
   com nome de coluna incorreto.
   - Evidência: a entidade `Recado` declara `@CreateDateColumn()` e
     `@UpdateDateColumn()` sem opção `name`, então TypeORM usa o nome da
     propriedade como nome de coluna (`createdAt` / `updatedAt`). O diagrama
     mostrava `created_at` / `updated_at`.
   - Correção aplicada: colunas corrigidas para `createdAt` e `updatedAt`.

4. **Média** — `docs/app/flow-bootstrap-app.mmd` e
   `docs/app/flow-app-completo.mmd` — `ParseIntIdPipe` global ausente;
   `transform` sem valor.
   - Evidência: `src/main.ts` registra dois pipes globais via `useGlobalPipes`:
     `ValidationPipe` (`transform: false`) e `ParseIntIdPipe`. Os diagramas
     mostravam apenas `ValidationPipe` e não indicavam `transform: false`.
   - Correção aplicada: adicionado nó `useGlobalPipes` intermediário,
     `ParseIntIdPipe global` como filho, e `transform:false` no nó `Rules`.

### Arquivos alterados — Rodada 3

- `docs/recados/flow-recados-completo.mmd` — corrigido (itens 1 e 2)
- `docs/database/er-pessoas-recados.mmd` — corrigido (item 3)
- `docs/app/flow-bootstrap-app.mmd` — corrigido (item 4)
- `docs/app/flow-app-completo.mmd` — corrigido (item 4)
- `docs/auditoria-codigo-mermaid.md` — esta seção adicionada
