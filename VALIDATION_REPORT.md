# Validation report

## Passed

- TypeScript/TSX parser diagnostics: 0 files with syntax errors
- Local relative and `@/` import resolution: 0 unresolved imports
- Semantic TypeScript check with external-library declaration stubs: passed
- Unused local/import check: passed
- `package.json`: valid JSON
- JavaScript config syntax: `next.config.mjs` and `eslint.config.mjs` passed `node --check`
- Raw `<img>` usage: none
- MUI/Emotion imports: none
- FAQ data imported only from `src/data/faqs.ts`
- Server/Client directives audited: 5 focused client islands
- Static params، metadata، sitemap، robots و manifest present
- Architecture regression script: passed

## Environment limitation

`npm ping` returned HTTP 503 from the configured package registry and dependency installation timed out. Therefore generation of `package-lock.json` and dependency-aware TypeScript، ESLint and `next build` could not be executed in this sandbox.

Run in a network-enabled environment before deployment:

```bash
npm install
npm run check
npm start
```
