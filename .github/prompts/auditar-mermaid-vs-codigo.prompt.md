---
name: 'Auditar divergências Código x Mermaid'
description:
  'Audita divergências entre código-fonte e diagramas Mermaid, apontando
  inconsistências e correções'
argument-hint:
  'Informe escopo da auditoria (ex.: pessoas, recados, app geral) e
  pasta/arquivos de docs'
agent: 'agent'
---

Audite divergências entre o código-fonte e a documentação Mermaid do projeto.

Objetivo:

- Detectar inconsistências entre implementação real e diagramas `.mmd`.
- Propor correções claras, priorizadas e acionáveis.

Procedimento:

1. Ler o escopo informado nos argumentos.
2. Inspecionar o código relacionado (módulos, controllers, services, entities,
   DTOs e relacionamentos).
3. Inspecionar diagramas Mermaid correspondentes em `docs/`.
4. Comparar e identificar divergências como:
   - componente presente no código e ausente no diagrama,
   - componente removido no código e ainda documentado,
   - relacionamento incorreto,
   - fluxo/sequência inconsistente,
   - nomenclatura desalinhada.
5. Gerar um relatório objetivo contendo:
   - divergências encontradas,
   - severidade (alta/média/baixa),
   - arquivo(s) impactado(s),
   - correção recomendada.
6. Se solicitado, aplicar as correções nos arquivos Mermaid e atualizar
   documentos relacionados.

Formato de saída esperado:

- Resumo executivo curto.
- Lista de divergências por recurso.
- Plano de correção por prioridade.
- Lista de arquivos que devem ser alterados (ou que foram alterados).
