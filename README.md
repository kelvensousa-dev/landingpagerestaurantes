# Landing Page Restaurante

Landing page de alta conversão para restaurantes focada em direcionar pedidos para o WhatsApp, construída com Next.js 15, Tailwind CSS v4 e TypeScript.

## Instalação e Execução

### Pré-requisitos
- Node.js (v18.x ou superior)
- npm

### Passos
1. Clone este repositório ou baixe os arquivos.
2. Na raiz do projeto, instale as dependências:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Como Personalizar para um Novo Cliente

Toda a personalização da landing page pode ser feita em um único arquivo de configuração:
**`config/restaurante.ts`**

Neste arquivo você pode alterar:
- Nome, paleta de cores primárias e domínio do site.
- Número de WhatsApp (pode ser via `.env.local` usando `NEXT_PUBLIC_WHATSAPP_NUMBER`).
- Título, subtítulo e imagem do Hero.
- Lista de Destaques do Cardápio (foto, nome, descrição, preço).
- Informações de Prova Social (nota do Google, anos de experiência, depoimentos de clientes).
- Quebra de Objeções (tempo e taxa de entrega, cobertura, meios de pagamento).
- Endereço físico e horários de funcionamento (com suporte a turnos pós-meia-noite e dias de folga).
- Meta tags de SEO e Open Graph.

A arquitetura orientada a configuração garante que você **não precisará alterar nenhum código nos componentes JSX** para gerar a página de um novo restaurante, basta substituir as fotos na pasta `public/images/` e atualizar o `restaurante.ts`.

## Como Publicar na Vercel

Este projeto está configurado para exportação estática (`output: 'export'`), sendo extremamente rápido e barato de hospedar.

1. Suba seu código para um repositório no GitHub, GitLab ou Bitbucket.
2. Crie uma conta na [Vercel](https://vercel.com/) e faça login.
3. Clique em **Add New Project** e importe o seu repositório.
4. A Vercel detectará automaticamente que é um projeto Next.js.
5. Em **Environment Variables**, adicione `NEXT_PUBLIC_WHATSAPP_NUMBER` com o número de WhatsApp (ex: `5511999999999`).
6. Clique em **Deploy**.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor local de desenvolvimento.
- `npm run build`: Faz o build otimizado da aplicação gerando os arquivos estáticos na pasta `out/`.
- `npm run lint`: Executa a validação do ESLint.
- `npm run test`: Executa os testes automatizados da lógica de horários e gerador de links via Vitest.
