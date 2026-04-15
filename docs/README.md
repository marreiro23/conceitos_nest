# Documentação Mermaid

Este diretório centraliza os diagramas Mermaid da aplicação.

## Como navegar

- Use as seções por **recurso** para encontrar diagramas do domínio
  correspondente.
- Dentro de cada recurso, os diagramas são organizados por **tipo**:
  - `flow-*` → fluxos de processo/workflow
  - `er-*` → modelo entidade-relacionamento
  - `sequence-*` → interação temporal entre módulos/serviços

## Índice por recurso

### Arquitetura geral

- [flow-dependencias-modulos-completo.mmd](./arquitetura/flow-dependencias-modulos-completo.mmd)
- [flow-modulos-app.mmd](./arquitetura/flow-modulos-app.mmd)
- [migracao-legado-modules-diagram.md](./arquitetura/migracao-legado-modules-diagram.md)

### Pessoas

- [flow-crud-pessoas.mmd](./pessoas/flow-crud-pessoas.mmd)
- [flow-pessoas-completo.mmd](./pessoas/flow-pessoas-completo.mmd)

### Recados

- [flow-crud-recados.mmd](./recados/flow-crud-recados.mmd)
- [flow-recados-completo.mmd](./recados/flow-recados-completo.mmd)
- [sequence-criacao-recado.mmd](./recados/sequence-criacao-recado.mmd)

### App

- [flow-bootstrap-app.mmd](./app/flow-bootstrap-app.mmd)
- [flow-app-completo.mmd](./app/flow-app-completo.mmd)

### Database

- [er-pessoas-recados.mmd](./database/er-pessoas-recados.mmd)
- [er-modelo-completo-pessoas-recados.mmd](./database/er-modelo-completo-pessoas-recados.mmd)

## Arquivos de apoio

- [auditoria-codigo-mermaid.md](./auditoria-codigo-mermaid.md)
- [modules-diagram.mmd](./modules-diagram.mmd) _(legado temporário para
  compatibilidade no ciclo 2026-Q2)_

## Convenções de nomenclatura

- `flow-<tema>.mmd`
- `er-<tema>.mmd`
- `sequence-<tema>.mmd`

Regras:

- `kebab-case` no `<tema>`
- letras minúsculas
- sem espaços, acentos ou caracteres especiais
- evitar duplicidade de diagramas com o mesmo objetivo

## Última atualização

2026-04-14 (índice completo + migração controlada do legado)
