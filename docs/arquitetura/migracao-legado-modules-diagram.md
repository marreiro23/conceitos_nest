# Migração controlada do legado `modules-diagram.mmd`

## Objetivo

Descontinuar o arquivo legado `docs/modules-diagram.mmd` com risco baixo,
migrando o consumo para diagramas padronizados por recurso.

## Linha do tempo (1 ciclo)

- **Ciclo atual (manutenção): 2026-Q2**
  - Legado permanece no repositório apenas para compatibilidade.
  - Todas as referências oficiais devem apontar para arquivos novos em
    `docs/arquitetura/`.
- **Próximo ciclo (remoção): 2026-Q3**
  - Remover `docs/modules-diagram.mmd`.
  - Validar ausência de referências quebradas.

## Referências oficiais substitutas

- Mapa consolidado: `docs/arquitetura/flow-dependencias-modulos-completo.mmd`
- Visão resumida: `docs/arquitetura/flow-modulos-app.mmd`

## Critérios de saída para remover o legado

1. Nenhuma referência ativa para `docs/modules-diagram.mmd`.
2. Time técnico validou os novos diagramas.
3. `docs/README.md` atualizado e estável por 1 ciclo.
