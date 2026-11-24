# Pátio Boa Vista

Site da galeria Pátio Boa Vista, em Goiânia. Next.js (App Router), páginas estáticas, deploy na Vercel.

## Rodar

```bash
npm install
npm run dev
```

## Deploy

Importe o repositório na Vercel. Não há variáveis de ambiente; as configurações padrão do Next.js funcionam.

> As lojas cadastradas hoje são fictícias, para ilustração. Fotos: Unsplash (ver `public/lojas/FONTES.md`).

## Onde editar

| O quê | Arquivo |
|---|---|
| Lojas, fotos e vídeos | `src/content/lojas.ts` (mídia em `public/lojas/<slug>/`) |
| Endereço, abertura, contatos, ficha técnica | `src/content/site.ts` |
| Fontes (trocar Bodoni Moda pela Cabrito Didone) | `src/app/layout.tsx` e `src/fonts/` |
| Cores e espaçamentos | topo de `src/app/globals.css` |
| Desenho da fachada | `src/components/Facade.tsx` |

Fotos: use JPG ou WebP com pelo menos 2400 px no lado maior; o Next gera os tamanhos menores. Vídeos: MP4 H.264 mudo, até ~8 MB, com um JPG de pôster.

A auditoria de design e texto está em [AUDITORIA.md](AUDITORIA.md).
