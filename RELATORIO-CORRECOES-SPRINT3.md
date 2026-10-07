# Relatório final — correções do EntreNós

**Atualizado em:** 7 de outubro de 2026  
**Escopo:** correções do relatório Sprint 3, revisão dos textos e fontes, redução de travamentos e preparação para um novo deploy na Vercel.

## Correções implementadas

| Apontamento | O que foi feito | Situação |
|---|---|---|
| Persistência e dados (T01/R13) | APIs de conteúdo e perguntas com Redis/Upstash; perguntas consultadas por protocolo; gravações protegidas; limites de requisições. | Pronto no código. A base precisa ser conectada ao projeto Vercel para haver persistência compartilhada. |
| Credenciais e painel (T02/R14) | Removidas credenciais padrão; hash scrypt no servidor; cookie HttpOnly/Secure em produção; sessão expirada e limite de tentativas. | Pronto no código. Usuário e segredos devem ser definidos como variáveis privadas na Vercel. |
| Back-end e Vercel (T03) | Rotas serverless em `api/`, fallback SPA e módulo compartilhado fora do diretório reservado às funções. | Configuração preparada; o projeto real da Vercel não foi acessado nem publicado nesta tarefa. |
| Locais e vagas (T04/R16) | Removidos exemplos fictícios; filtro por fonte e data; vagas só aparecem com prazo futuro; listas paginadas. | Mecanismo pronto. A equipe precisa inserir dados reais; não foram inventados endereços nem oportunidades. |
| Acessibilidade (T05) | Ajustes de contraste e testes automatizados WCAG AA para pares de texto e estados de feedback. | Os testes cobrem os pares verificados; ainda é recomendada revisão visual manual em diferentes dispositivos. |
| Conteúdo de saúde (T06/R15) | Textos clínicos sem validação profissional continuam ocultos; a API também bloqueia a publicação sem revisor, data e fontes. Foram revisados tópicos de HIV, sífilis, HPV, gonorreia/clamídia, hepatites B/C e herpes. | A trava técnica está pronta. Um profissional de saúde ainda precisa registrar a revisão real antes de liberar as fichas clínicas. |
| Ortografia e veracidade | Revisadas as strings visíveis, removidas promessas de anonimato absoluto e afirmações não sustentadas. Os links de testagem apontam para páginas atuais do Ministério da Saúde; a interface explica que a oferta local varia e cita o Disque Saúde 136. | Links atuais conferidos; a validade futura das páginas depende dos órgãos que as mantêm. |
| Descarte | Conteúdo verificado para preservativo usado e embalagem, medicamentos domiciliares e embalagens de medicamentos, com datas e fontes oficiais. Regras municipais são apresentadas como locais, não nacionais. | As orientações exibidas incluem fontes/data; a coleta e aceitação variam por município. |
| Travamentos e estados vazios (T08) | Estados de carregamento/erro, cancelamento de atualizações após saída de telas, prevenção de gravações repetidas, limites e paginação de listas. | Implementado e testado na exportação web. |

## Validação final

- `npm test`: **12/12 testes aprovados**.
- `npm run build:web`: **concluído**, exportando para `dist/`.
- Conferência pós-build: os assets indicados pelo `index.html` existem; o bundle contém os textos do Disque Saúde 136, a referência de testagem e a orientação de embalagens de medicamentos.
- Verificação automatizada dos dados semente: **44 URLs únicas**, todas aceitas pela lista de domínios oficiais permitidos pela aplicação.
- Testes de segurança: mutações de conteúdo e respostas administrativas são recusadas sem sessão; conteúdo clínico, locais e vagas passam pelos filtros de publicação.

## Configuração ainda necessária na Vercel

1. Importar o projeto usando como **Root Directory** a pasta que contém `package.json`.
2. Associar uma base **Upstash Redis** e confirmar as variáveis `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN` (ou os nomes KV compatíveis documentados no guia).
3. Criar e cadastrar `ADMIN_USERNAME`, `ADMIN_PASSWORD_SALT`, `ADMIN_PASSWORD_HASH` e `SESSION_SECRET` como variáveis privadas. O script `scripts/hash-admin-password.cjs` gera os segredos localmente.
4. Fazer um novo deploy e conferir se o estado fica **Ready** e se `api/auth`, `api/data` e `api/questions` foram publicadas.
5. Cadastrar apenas serviços/vagas reais, com fonte e data verificáveis. A revisão das fichas clínicas deve ser registrada por profissional de saúde.

Os detalhes de publicação e verificação estão em [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md). Este pacote não contém segredos nem substitui a configuração e o redeploy da conta Vercel.

## Risco técnico remanescente

O projeto usa Expo SDK 51 / React Native 0.74.5. O `npm audit` registrou **73 avisos no grafo de dependências** (1 crítico, 44 altos, 27 moderados e 1 baixo). O reparo automático dentro das versões compatíveis não os elimina; `npm audit fix --force` ofereceria alterações incompatíveis, então não foi aplicado. Recomenda-se planejar uma atualização controlada do Expo e executar novamente os testes web e mobile antes de uma liberação ampla.

## Referências de pesquisa

O levantamento por tópico, com ressalvas e links das fontes consultadas, está em [CONTENT-RESEARCH.md](CONTENT-RESEARCH.md). Referências técnicas do deploy incluem [Upstash para Vercel](https://upstash.com/docs/redis/howto/vercelintegration), [rewrites da Vercel](https://vercel.com/docs/routing/rewrites) e [configuração `vercel.json`](https://vercel.com/docs/project-configuration/vercel-json).
