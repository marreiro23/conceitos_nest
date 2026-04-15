---
description:
  'Padroniza nomenclatura e organização de diagramas Mermaid no projeto'
applyTo: 'docs/**/*.mmd'
---

# Padrão de nomenclatura para diagramas Mermaid

Ao criar ou atualizar diagramas em `docs/`, siga obrigatoriamente este padrão de
nomes de arquivo:

- `flow-<tema>.mmd` para fluxos de processo, jornada de requisição, workflow de
  negócio ou fluxo técnico.
- `er-<tema>.mmd` para modelo entidade-relacionamento (ER), estrutura de dados e
  relacionamentos de banco.
- `sequence-<tema>.mmd` para diagramas de sequência (interação temporal entre
  módulos/serviços).

## Regras de nome

- Use letras minúsculas.
- Use `kebab-case` no `<tema>` (ex.: `flow-criacao-recado.mmd`).
- Não usar espaços, acentos ou caracteres especiais no nome.
- Evite nomes genéricos como `flow-diagrama.mmd`.
- Se já existir diagrama equivalente, atualize o arquivo existente em vez de
  criar duplicado.

## Organização por recurso

- Prefira organizar por domínio da aplicação, por exemplo:
  - `docs/pessoas/`
  - `docs/recados/`
  - `docs/app/`
  - `docs/database/`
- Diagramas transversais (visão geral) podem ficar em `docs/arquitetura/`.

## Consistência documental

- O conteúdo do diagrama deve refletir o código real do projeto.
- Ao alterar arquivos `.mmd`, verifique se algum índice/resumo em Markdown
  precisa ser atualizado.
- Sempre que possível, mantenha um único diagrama por tipo e tema para reduzir
  redundância.
