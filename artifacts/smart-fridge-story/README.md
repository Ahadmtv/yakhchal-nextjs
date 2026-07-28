# Smart Fridge Story — delivery notes

Production QA was captured from the optimized Next.js build on 2026-07-28.

## Scroll timeline

- `0.00–0.18` — six ingredients appear around the open refrigerator.
- `0.18–0.46` — ingredients follow individually staggered, curved paths into three shelf zones.
- `0.40–0.62` — the interior illuminates, recognition status appears, and the recipe card is revealed.
- `0.58–0.80` — the recipe transfers toward the weekly plan while the plan and missing-item shopping list appear.
- `0.78–0.96` — the hinged door closes with perspective and the interior UI clears away.
- `0.87–1.00` — the final message and download CTA appear.

The controller derives one normalized value from the story section’s measured height and viewport position. It uses a passive scroll listener plus `requestAnimationFrame`, writes CSS variables directly, and reverses on upward scroll without timers or scroll locking.

## Primary story screenshots

- [Initial ingredients](./01-initial-ingredients.png)
- [Ingredients inside the refrigerator](./02-ingredients-inside.png)
- [Recipe recommendation](./03-recipe-recommendation.png)
- [Weekly plan and shopping list](./04-weekly-plan-shopping.png)
- [Final closed door](./05-final-closed-door.png)

## Additional visual QA

- [Homepage desktop regression check](./00-homepage-1440x900.png)
- [Homepage mobile regression check](./00a-homepage-390x844.png)
- [Dark-theme final state](./06-final-dark-theme.png)
- [Dark-theme recipe state](./06a-recipe-dark-theme.png)
- [360×800 recipe state](./07-mobile-360x800-recipe.png)
- [390×844 plan state](./08-mobile-390x844-plan.png)
- [390×844 final state](./08a-mobile-390x844-final.png)
- [768×1024 ingredient state](./09-tablet-768x1024-ingredients.png)
- [1920×1080 final state](./10-desktop-1920x1080-final.png)
- [Reverse-scroll state](./11-reverse-scroll.png)
- [Reduced-motion static composition](./12-reduced-motion.png)
- [Machine-readable browser report](./visual-qa-report.json)

## Browser QA results

- Exact requested/computed progress: `0.08/0.0800`, `0.45/0.4501`, `0.53/0.5301`, `0.72/0.7199`, `0.98/0.9799`.
- Reverse test: scrolling from `0.98` back to `0.24` restored stage `1`, reopened the door to `-108deg`, and hid final-state UI.
- Horizontal overflow: `0px` at 360×800, 390×844, 768×1024, 1440×900, and 1920×1080.
- Console errors/warnings: `0`.
- Runtime exceptions: `0`.
- Failed requests: `0`.
- Hydration-warning matches: `0`.
- All story images loaded with non-zero natural dimensions through `next/image`.
- Reduced motion collapses the story to a static 926px section at 1440×900 instead of the four-screen scroll track.

## Generated ingredient assets

The built-in image generator produced one source per ingredient on a uniform magenta chroma key. The sources were alpha-extracted, edge-checked on light and dark backgrounds, cropped, resized, and compressed to 768×768 RGBA WebP files:

- `public/assets/smart-fridge/tomato-cluster.webp`
- `public/assets/smart-fridge/fresh-herb-bunch.webp`
- `public/assets/smart-fridge/brown-eggs.webp`
- `public/assets/smart-fridge/raw-chicken-breast-plate.webp`
- `public/assets/smart-fridge/rice-bowl.webp`
- `public/assets/smart-fridge/yellow-red-bell-peppers.webp`

All generated assets use consistent three-quarter food photography, soft upper-left studio lighting, transparent corners, and local runtime delivery.

## Validation results

- `npm ci` — passed; 399 packages installed from the lockfile.
- `npm run check:architecture` — passed; 46 source files and 6 approved client islands.
- `npm run typecheck` — passed.
- `npm run lint` — passed.
- `npm run build` — passed; 17 static/SSG pages generated.
- `npm run check` — passed after the final clean install.

`npm ci` also surfaced the repository dependency tree’s existing npm-audit advisories (12 high-severity entries). No automatic `npm audit fix` was applied because it can rewrite locked dependencies and introduce unrelated or breaking upgrades.
