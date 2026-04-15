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
