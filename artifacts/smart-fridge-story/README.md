# Smart Fridge Story — delivery notes

Production QA was captured from the optimized Next.js build on 2026-07-29.

## Scroll timeline

- `0.00–0.12` — six ingredients appear around the open refrigerator.
- `0.10–0.32` — ingredients follow individually staggered, curved paths into three shelf zones.
- `0.275–0.32` — the interior recognizes the ingredients and confirms the inventory.
- `0.32–0.48` — the recipe card appears at full opacity, with no half-readable resting state.
- `0.48–0.72` — the weekly plan and missing-item shopping list appear at full opacity.
- `0.72–0.88` — the hinged door closes while the interior UI clears away.
- `0.84–1.00` — the final message and download CTA appear at full opacity.

The controller derives one normalized value from the story section’s measured height and viewport position. It uses a passive scroll listener plus `requestAnimationFrame`, writes CSS variables directly, and reverses on upward scroll without timers or scroll locking. The track is now `300svh` on desktop, `285svh` on tablet, and `250svh` on mobile, reducing the interaction by roughly one quarter to one third.

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
- [Firefox door midpoint](./firefox/04-door-mid-p080.png)
- [Firefox near-closed door](./firefox/05-door-near-p084.png)
- [Firefox final state](./firefox/06-final-p091.png)
- [Firefox WebDriver BiDi report](./firefox/firefox-visual-qa-report.json)

## Browser QA results

- Exact requested/computed progress stays within `0.0003` at checkpoints `0.06`, `0.31`, `0.40`, `0.62`, and `0.91`.
- At `0.31` the incoming recipe card is fully hidden; at `0.40` the recipe is fully opaque; at `0.62` the recipe, plan, and shopping cards are fully opaque.
- Reverse test: scrolling from `0.91` back to `0.17` restored stage `1`, reopened the door to `-108deg`, and hid every recipe/final card.
- Horizontal overflow: `0px` at 360×800, 390×844, 768×1024, 1440×900, and 1920×1080.
- Console errors/warnings: `0`.
- Runtime exceptions: `0`.
- Failed requests: `0`.
- Hydration-warning matches: `0`.
- All story images loaded with non-zero natural dimensions through `next/image`.
- All ten machine-enforced visual QA checks pass.
- Firefox 153.0.1 production QA passes through native WebDriver BiDi: the door moves through `-53.78deg`, `-16.83deg`, and `0deg`, then reopens to `-108deg` on reverse scroll.
- Firefox reports `0` error-level console entries and `0` fetch errors; the final card is fully opaque at the near-closed checkpoint.
- Reduced motion collapses the story to a static 926px section at 1440×900 instead of the three-screen desktop scroll track.

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
- Chrome production visual QA — passed all 10 enforced checks.
- Firefox 153.0.1 production visual QA — passed all WebDriver BiDi checks.

`npm ci` also surfaced the repository dependency tree’s existing npm-audit advisories (12 high-severity entries). No automatic `npm audit fix` was applied because it can rewrite locked dependencies and introduce unrelated or breaking upgrades.
