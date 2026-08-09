# COPAD Pharma Egypt Corporate Website

Bilingual corporate website built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Where everything lives

```text
app/
  globals.css                    Tailwind entry + centralized COPAD palette
  [locale]/                     English and Arabic routes
    page.tsx                    Home page
    template.tsx                Route transition
    about/
      page.tsx                  About route
      _components/              About-only components
    divisions/                  Same pattern for every corporate page
    therapeutic-areas/
    products/
    manufacturing-quality/
    insights/
    partner-with-us/
    careers/
    contact/
components/
  brand.tsx                     COPAD brand lockup
  forms/                        Shared forms
  layout/                       Header and footer
  media/                        Images and media placeholders
  motion/                       Framer Motion primitives
  pages/                        Shared corporate page building blocks
content/
  site.ts                       Approved English and Arabic copy
  types.ts                      CMS-ready content types
docs/
  content/                      Approved manuscript
  planning/                     Roadmap, WBS, and dashboard references
lib/
  i18n.ts                       Locale and RTL helpers
public/images/                  Runtime images only
```

Each URL has an explicit `page.tsx`. Components that belong to only one page sit beside it in that route's `_components` folder. Truly reusable interface pieces live in the root `components` folder.

## Brand colors

All palette values are defined once in `app/globals.css` under `@theme`:

- `copad-deep` — `#0F3D39`
- `copad-green` — `#109F83`
- `copad-sand` — `#EEEBE5`
- `copad-white` — `#F9F9F9`

Use Tailwind classes such as `bg-copad-deep`, `text-copad-green`, and `border-copad-sand`. Do not hardcode brand colors inside components.

## Content source

The approved content source is `docs/content/copad-website-content-manuscript.docx`. Runtime copy lives in `content/site.ts`, which can later be replaced by a dashboard or CMS without changing the routes.

## Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`. The root URL redirects to `/en` or `/ar` based on the browser language.

## Validation

```bash
npm run lint
npx next typegen
npx tsc --noEmit
npm run build
```
