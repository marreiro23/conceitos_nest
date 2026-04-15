---
name: 'Diagramas Mermaid do Projeto'
description:
  'Criar e atualizar diagramas Mermaid do projeto, mantendo documentação
  organizada por pasta de recurso'
argument-hint:
  'Informe os recursos/fluxos a documentar (ex.: pessoas, recados,
  relacionamentos, arquitetura de módulos)'
agent: 'agent'
---

Crie ou atualize a documentação Mermaid deste projeto com base no que o usuário
pediu.

Objetivo principal:

- Sempre manter os diagramas e documentos Mermaid atualizados com o estado atual
  do código.
- Organizar a documentação por pastas de recurso da aplicação (ex.:
  `docs/pessoas/`, `docs/recados/`, `docs/app/`, `docs/database/`).

Instruções de execução:

1. Interprete os argumentos fornecidos pelo usuário nesta execução para definir
   o escopo.
2. Investigue o código e identifique módulos, entidades, DTOs, serviços,
   controladores e relacionamentos relevantes.
3. Crie ou atualize arquivos Mermaid (`.mmd`) e documentos associados em
   `docs/`, organizando por recurso.
4. Preserve consistência de nomenclatura e evite duplicidade entre diagramas.
5. Quando existir diagrama consolidado (ex.: mapa geral), sincronize-o com os
   diagramas por recurso.
6. Ao finalizar, apresente:
   - arquivos criados/atualizados,
   - resumo das alterações,
   - lacunas encontradas (se houver) e próximos passos.

Padrões esperados:

- Diagramas legíveis e de fácil manutenção.
- Estrutura por domínio/recurso, não por tecnologia isolada.
- Conteúdo aderente ao código real (sem inventar componentes inexistentes).

Se os argumentos estiverem ambíguos, faça perguntas objetivas antes de alterar
arquivos.
