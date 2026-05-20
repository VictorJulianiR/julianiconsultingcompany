# IR de Última Hora com IA

Landing page estática para publicar na Vercel e usar como página de vendas na Kiwify.

## Publicacao

Este diretório é o repositório git do site. Ele foi separado da pasta principal para não incluir PDFs, scripts e materiais brutos do lançamento.

## Trocar checkout

Link de checkout em uso:

```js
const CHECKOUT_URL = "https://pay.kiwify.com.br/RQASrq5";
```

## Notificacao de clique em compra

Cada clique em CTA de compra chama `/api/buy-click` antes de seguir para a Kiwify. Configure na Vercel pelo menos um canal:

- `BUY_CLICK_WEBHOOK_URL`: webhook genérico para push, ntfy, Discord, Slack, Make/Zapier, etc.
- `RESEND_API_KEY`, `BUY_CLICK_EMAIL_TO`, `BUY_CLICK_EMAIL_FROM`: e-mail via Resend.

Se nenhuma variável estiver configurada, a rota responde sem enviar notificação e o checkout continua funcionando.

Depois de qualquer ajuste, faça commit e push para `main`.

## Arquivos

- `index.html`: estrutura e copy da landing.
- `styles.css`: sistema visual responsivo.
- `script.js`: link do checkout e contagem até 29/05/2026.
- `obrigado/index.html`: rota `/obrigado/` com a sales page da Consultoria de Uso do PDF + Relatório.
- `upsell/index.html`: rota `/upsell/` para a oferta visual da Consultoria de Uso do PDF + Relatório.
- `termos/index.html`: rota `/termos/`.
- `privacidade/index.html`: rota `/privacidade/`.
- `reembolso/index.html`: rota `/reembolso/`.
- `contato/index.html`: rota `/contato/`.
- `assets/`: criativo do produto e previews leves do PDF.
