# Relatório Final: Landing Page de Alta Conversão para Restaurantes

## Configurações Atuais
- Framework: Next.js 16.3.5 (App Router)
- Estilização: Tailwind CSS v4 (inline theme)
- Componentes: Lucide React
- Exportação: `output: 'export'`

## Métricas (Lighthouse)
A aplicação está otimizada para atingir excelentes métricas de performance, com os seguintes focos aplicados:
- **Performance**: Renderização rápida via geração estática, uso de `next/image` e `IntersectionObserver` para animações lazy. Imagens em formato WebP são usadas de forma genérica.
- **Acessibilidade**: Contraste aprimorado, atributos ARIA, labels descritivos, e tags semânticas HTML5 (main, section, footer).
- **SEO**: Títulos e descrições únicas dinâmicas geradas no layout, junto de meta tags de indexação padrão para mobile.
- **Melhores Práticas**: Otimização no carregamento da fonte e segurança de requisições em links (rel=noopener).

> **Aviso Importante**: Para que o Lighthouse obtenha as métricas absolutas, é necessário fazer o deploy no servidor final e substituir todas as imagens de placeholders genéricos por fotos de produtos com qualidade otimizada, já que as métricas de performance variam com o peso real das imagens no servidor. O build atual (out/) está gerando uma landing page rápida e estática.

## Pendências de Imagem
- **`og-image.jpg`**: A imagem atual localizada em `public/images/og-image.jpg` é provisória (placeholder). É crucial substituir por um banner real em dimensões 1200x630px para correta pré-visualização no WhatsApp, Facebook e outras redes sociais.

## Instruções Pós-Deploy
1. Cadastre e valide as configurações corretas da aba *Localização* (Google Maps iframe query).
2. Valide os horários da loja no arquivo `src/config/restaurante.ts`.
3. Verifique a URL do WhatsApp e garanta que o estabelecimento receba corretamente o contexto das mensagens.
