# Juan Sebastián Ruani — Portfolio

Personal portfolio and case studies of Juan Sebastián Ruani, Product Designer.

**Live:** https://portfolio-plum-delta-el2gvdcqib.vercel.app/

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS + shadcn/ui, Framer Motion
- i18next (English / Spanish)
- Deployed on Vercel

## Scripts

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check and production build
npm run lint     # oxlint
npm run cv       # regenerate public/Juan_Sebastian_Ruani_CV.pdf from generate-pdf.js
```

## Structure

- `src/pages/` — home and case study pages (product cases are driven by i18n content via `product-case-study.tsx`)
- `src/i18n/locales/{en,es}/translation.json` — all site copy
- `public/images/` — case study images
- `generate-pdf.js` — source of the CV PDF
