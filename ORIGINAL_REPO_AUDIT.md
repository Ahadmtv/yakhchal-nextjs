# Original repository audit

Source: `https://github.com/Ahadmtv/ui-generator`

Snapshot reviewed: `main` at commit `b4eaa528646d5652a7bf32eb475bd6b1314fdbb9`.

## Original stack

- Create React App / `react-scripts`
- React 19 and TypeScript
- React Router 6
- Material UI 7 and Emotion
- Recharts
- RTL Stylis plugin and Vazirmatn

## Original route map

- `/`
- `/features`
- `/features/:slug`
- `/calories`
- `/articles`
- `/articles/:slug`
- fallback 404

## UI modules reviewed

Navbar, Hero, Features, Workflow, BMI calculator, Download, Articles, Contact, FAQ, Privacy, Footer, calorie calculator, feature detail and article detail.

## Migration objective

Retain the original component hierarchy, responsive layout, MUI theme values, gradients, cards, spacing, RTL behavior and interactions while moving discoverable content and SEO metadata to server-rendered Next.js routes.
