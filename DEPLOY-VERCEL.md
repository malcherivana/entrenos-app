# Publicar o EntreNós na Vercel

## 1. Importar o projeto

Envie esta pasta para um repositório Git ou use o ZIP corrigido. Em **Vercel → New Project → Import**, configure **Root Directory** como a pasta que contém `package.json`. Se os arquivos deste ZIP estiverem diretamente na raiz do repositório, use `./`.

Em **Build and Development Settings**, configure:

- Framework Preset: **Other** (ou Expo, se detectado corretamente)
- Install Command: `npm ci`
- Build Command: `npx expo export -p web`
- Output Directory: `dist`

Antes de publicar uma nova versão, execute localmente `npm ci`, `npm test` e `npm run build:web`.

O `vercel.json` já contém esses valores e o fallback para a SPA. As funções do diretório `api/` também precisam ser publicadas: não remova essa pasta.

## 2. Conectar a base compartilhada

A aplicação depende de uma base Redis compatível com Upstash para persistir dados entre visitantes/dispositivos. No painel do projeto, abra **Integrations/Marketplace**, adicione **Upstash Redis**, crie ou selecione uma base e vincule-a ao projeto. A integração fornece credenciais REST como variáveis de ambiente. O código aceita estes nomes:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Também são aceitos `KV_REST_API_URL` e `KV_REST_API_TOKEN`, para compatibilidade com projetos que já tenham essas variáveis configuradas.

## 3. Configurar autenticação administrativa

Não há usuário/senha padrão no código. No terminal deste projeto, execute `node scripts/hash-admin-password.cjs`, informe uma senha forte de pelo menos 14 caracteres e cadastre os valores retornados diretamente em **Vercel → Project → Settings → Environment Variables**:

- `ADMIN_USERNAME`: nome de usuário escolhido pela equipe
- `ADMIN_PASSWORD_SALT`: sal gerado pelo script
- `ADMIN_PASSWORD_HASH`: hash scrypt gerado pelo script
- `SESSION_SECRET`: segredo aleatório gerado pelo script

O script não exibe a senha digitada; os segredos nunca devem ir para o bundle web, para o Git, nem ser enviados em uma conversa. Cadastre os valores nos ambientes em que o painel será usado. A sessão usa cookie `HttpOnly`, `Secure` em produção, expira em 30 minutos e possui limite de tentativas.

## 4. Redeploy obrigatório

Após conectar Redis e salvar todas as variáveis, faça **Redeploy**. A Vercel disponibiliza novas variáveis de ambiente às funções somente em novas implantações. A página de login exibirá mensagem se a autenticação ou a base ainda estiverem ausentes.

## 5. Verificações após publicar

1. Abra a URL publicada e confirme que a página inicial carrega.
2. Confirme no painel da Vercel que o deploy está **Ready** e que as funções `api/auth`, `api/data` e `api/questions` foram criadas.
3. Em **Configurações → Environment Variables**, confira apenas os nomes (não copie os valores para locais públicos) e confirme a associação da integração Redis.
4. Abra o painel administrativo: sem as variáveis, o login permanece desativado. Com elas, autentique com as credenciais geradas localmente.
5. Se precisar validar o fluxo de perguntas, use somente uma pergunta fictícia e sem dados pessoais, guarde o protocolo, responda pelo painel e confirme a consulta. A tela administrativa não oferece remoção de perguntas; o registro de teste permanece salvo na base.
6. Publique um local somente com fonte oficial e data de verificação; ele só aparece por até 90 dias. Publique vagas apenas com fonte HTTPS e data futura de encerramento. Conteúdo clínico fica oculto até ter revisor profissional, data de revisão recente e fontes HTTPS registradas.

## Comportamento sem a base

Sem Redis, o site ainda pode mostrar dados semente/cache local para navegação, mas isso **não é persistência compartilhada**: perguntas não são aceitas como se tivessem sido enviadas, alterações administrativas não são salvas no servidor e o app mostra um aviso de sincronização. Configure Redis antes de divulgar o serviço.

## Referências usadas

- [Integração Vercel da Upstash](https://upstash.com/docs/redis/howto/vercelintegration)
- [Rewrites da Vercel](https://vercel.com/docs/routing/rewrites)
- [Configuração `vercel.json`](https://vercel.com/docs/project-configuration/vercel-json)
