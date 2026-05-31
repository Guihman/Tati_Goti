# Aurora Velas — Landing Page Premium

Site estático em HTML, CSS e JavaScript para uma marca de velas artesanais aromáticas.

## Como editar rapidamente

1. Abra `script.js` e troque:

```js
const CONFIG = {
  brandName: "Aurora Velas",
  whatsappNumber: "5500000000000",
  instagramUrl: "https://instagram.com/"
};
```

Use o WhatsApp no formato internacional, só números. Exemplo: `5518999999999`.

2. Abra `index.html` e troque:
- nome da marca;
- textos da história;
- aromas/produtos;
- perguntas do FAQ;
- link do Instagram, se preferir editar direto no HTML.

3. Abra `styles.css` para mudar cores principais:

```css
:root {
  --bg: #120907;
  --gold: #ffd37e;
  --amber: #ff9f43;
  --copper: #d9783a;
}
```

## Recursos incluídos

- Design responsivo para celular.
- Animação de partículas em canvas.
- Chama animada em CSS.
- Cards com efeito tilt.
- Botões magnéticos.
- Marquee de aromas.
- Filtros de produtos com acessibilidade melhorada.
- Selos de confiança no topo e metadados nos produtos.
- Seção “Como comprar” para orientar o cliente até o pedido.
- Quiz de aroma com mensagem pronta para WhatsApp.
- FAQ em acordeão.
- CTA flutuante para WhatsApp.
- Melhorias de SEO básico e navegação por teclado.

## Publicação

Pode publicar em Netlify, Vercel, GitHub Pages, Hostinger ou qualquer hospedagem estática.

## Melhorias aplicadas nesta versão

- Adicionado link “Pular para o conteúdo” para melhorar acessibilidade no teclado.
- Adicionados selos de compra no hero para comunicar atendimento, kits e entrega.
- Adicionados detalhes rápidos nos cards de produto, como “Consultar valores” e indicação de uso.
- Criada seção “Como comprar” com 3 passos para reduzir dúvidas antes do WhatsApp.
- Ajustado FAQ para responder uma dúvida real de compra/presente.
- Melhorado JavaScript com ano mais seguro, número do WhatsApp normalizado, menu ativo e filtros com `aria-pressed`.
- Adicionado JSON-LD simples no HTML para reforço de SEO da marca.
