---
name: 'Gerar índice Mermaid em docs/README.md'
description:
  'Gera ou atualiza automaticamente o índice de documentação Mermaid em
  docs/README.md'
argument-hint:
  'Informe escopo opcional (ex.: apenas docs/recados) e nível de detalhamento'
agent: 'agent'
---

Gere ou atualize o índice automático da documentação Mermaid em
`docs/README.md`.

Objetivo:

- Facilitar navegação da documentação técnica por recurso e tipo de diagrama.

Procedimento:

1. Mapear arquivos de documentação dentro de `docs/`, com foco em:
   - arquivos `.mmd`,
   - documentos `.md` de apoio.
2. Agrupar por pasta/recurso (ex.: `pessoas`, `recados`, `app`, `database`,
   `arquitetura`).
3. Dentro de cada grupo, organizar por tipo de diagrama usando prefixo de
   arquivo:
   - `flow-*`
   - `er-*`
   - `sequence-*`
4. Criar/atualizar `docs/README.md` com:
   - visão geral breve,
   - índice por recurso,
   - links relativos para cada arquivo,
   - seção de convenções de nomenclatura.
5. Preservar conteúdo manual existente quando possível; se necessário, atualizar
   apenas a seção de índice.

Formato recomendado para `docs/README.md`:

- Título do documento.
- Seção "Como navegar".
- Seções por recurso contendo listas de links.
- Seção "Convenções de nomenclatura".
- Seção "Última atualização" com data atual.

Ao finalizar, informe:

- quais entradas foram adicionadas/removidas/atualizadas,
- quais arquivos estavam órfãos (se houver),
- sugestões de melhoria para estrutura de documentação.
