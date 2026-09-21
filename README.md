# Fiscalit

Herramientas fiscales gratuitas para autónomos y micropymes en España:
calculadoras, generadores y guías, optimizadas para SEO y conversión de
afiliados. Construido con Next.js (App Router), TypeScript y Tailwind CSS,
exportado como sitio estático.

## Empezar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para verlo en local.

```bash
npm run build
```

Genera la exportación estática en `out/` (`output: 'export'` en
`next.config.ts`).

## Estructura relevante

- `src/config/affiliates.ts` — punto único de edición de todos los enlaces,
  nombres y textos de los partners de afiliación (Holded, Quipu, Qonto,
  TaxDown, Ayuda T Pymes, etc.).
- `src/config/site.ts` — navegación principal y enlazado interno SEO hacia
  las herramientas del sitio.
- `src/components/AffiliateCard.tsx` — banner de llamada a la acción de
  afiliados, reutilizable en cualquier herramienta.
- `src/components/Header.tsx` / `src/components/Footer.tsx` — layout base
  del sitio.
