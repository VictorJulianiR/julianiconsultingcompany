# IR de Última Hora com IA

Landing page estática para publicar na Vercel e usar como página de vendas na Kiwify.

## Publicacao

Este diretório é o repositório git do site. Ele foi separado da pasta principal para não incluir PDFs, scripts e materiais brutos do lançamento.

## Trocar checkout

Quando a Kiwify gerar o link de checkout, substitua em `script.js`:

```js
const CHECKOUT_URL = "https://pay.kiwify.com.br/SEU-CHECKOUT-AQUI";
```

Depois faça commit e push para `main`.

## Arquivos

- `index.html`: estrutura e copy da landing.
- `styles.css`: sistema visual responsivo.
- `script.js`: link do checkout e contagem até 29/05/2026.
- `assets/`: criativo do produto e previews leves do PDF.
