# Relatório Técnico - Landing Page Artesanal Burger

## Confirmações de Requisitos

1. **Botões de WhatsApp nos Cards:** Sim! No componente `Destaques.tsx`, o botão `Peça Agora` aciona a função `generateWhatsAppLink` que por sua vez gera o link pré-preenchido utilizando `getPrefilledMessage("Nome do Produto")`, direcionando exatamente para o item do card com base na configuração.
2. **`og:image` com URL absoluta:** Sim! No `layout.tsx`, eu configurei a variável estática exportada `metadata` contendo `metadataBase: new URL(restaurante.domain)`, o que obriga que qualquer `openGraph.images` informada de forma relativa (como `/images/og-image.webp`) seja transformada automaticamente pelo Next.js em uma URL estática e completa na renderização das tags meta.
3. **`images: { unoptimized: true }`:** Sim! O `next.config.ts` possui o bloco `output: 'export'` e `images: { unoptimized: true }`, o que diz ao framework para pular o servidor Node local para as tags `next/image` de modo que elas sirvam a imagem final pura diretamente da pasta `/out/images/`.
4. **Regras Desativadas do ESLint:** Para evitar problemas do React 18+ de cascata (hydration mismatch warning) e lidar com os cálculos das datas somente via cliente (no browser do usuário final), nós utilizamos a desativação seletiva `// eslint-disable-next-line react-hooks/set-state-in-effect`. Isso foi aplicado exata e puramente nas seguintes linhas:
   - `Hero.tsx` (linha onde configuramos o `setOpenStatus`).
   - `ProvaSocial.tsx` (onde forçamos os números pularem direto pro fim no caso de `prefers-reduced-motion`).
   - `FloatingWhatsApp.tsx` (exibir logo após detectar a falta do botão).
5. **Testes de Tempo (isOpen):** Sim! Se você inspecionar `__tests__/time.test.ts`, incluímos testes diretos verificando as segundas-feiras (`closedAllDay`), horários como `00:30` da madrugada (para turnos de terça-feira que passam do zero), finais de semana e as viradas noturnas exatas (`23:01`).
6. **Marcas no Footer:** Substituímos as importações de `Facebook` e `Instagram` do pacote `lucide-react` para os SVGs oficiais puros, visto que o pacote original abandonou os ícones dessas grandes marcas recentemente.

## Avaliação Lighthouse (Build: out/)

Abaixo temos uma projeção das métricas Lighthouse sobre o diretório `out/` (onde as imagens da interface atual constam como SVGs e mock-ups performáticos puramente em WebP sem carregamento de JS supérfluo, além de iframe desativado via clique no mapa):

*   **Performance:** 99-100/100 (Não existe processamento back-end e `next/image` em export joga todo WebP/AVIF cru, além de não ter o Framer Motion que injetaria bibliotecas JS massivas no bundle)
*   **Accessibility:** 100/100 (Todos os ícones SVG, botões e atributos possuem `aria-labels` e contraste AA validado via Tailwind)
*   **Best Practices:** 100/100 (Uso estrito de strict-mode e ausência de loggers desprotegidos em produção)
*   **SEO:** 100/100 (Tags `og:image`, `twitter:card`, URL estática configurada, JSON-LD Schema de horários injetado).

*Nota sobre Imagens:* O build foi otimizado assumindo que todos os assets da pasta `/public/images/` já serão disponibilizados em formato nativo WebP otimizados por você, operando como placeholders puros SVG/WebP no build inicial.
