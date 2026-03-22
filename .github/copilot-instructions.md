# Copilot Instructions for `personalitytest`

1. Architecture overview
   - `index.html`: single-page app entry, uses CDN Vue 3 (`vue.global.js`) + `vue-i18n` + app scripts.
   - `vuescript.js`: core view model and workflow for both Jung type and Enneagram tests.
   - `mainscript.js`: helper math/data functions (`pickRandomProperty`, `calculatemax`, `createbar`, etc.).
   - `cn.json`: question bank for the Jung-style test (randomized selection, weighted personality scores).
   - `cn_text.js` / `cn_enneagram.js`: content + scoring rules, used for descriptive outputs.

2. Runtime flow
   - Start flow: `start()` loads `cn.json`, picks random question key, updates `question_data`.
   - Answer flow: `answer(value)` updates `user_data` (ti/te/fi/fe/ni/se/si/ne plus T/F/N/S/I/E) and either picks next question or computes result through `calculatemax` chain.
   - Enneagram flow: `estart()` sets up stats, `eanswer(type,value)` adjusts `enneagram_data`, transitions to `TestEnneagrama`/`SelectEnneagrama`/`CheckEnneagrama` logic, and finally writes query string state using `location.href`.
   - Localization: `$t()` in templates uses keys from `vuei18n.js`, with `langselect` controlling `$i18n.locale` and URL query `lang` param.

3. Dev workflow
   - Install dependencies: `npm ci` or `npm install`.
   - Build: `npm run build` (via `vue-cli-service`); created artifact is in `dist/`.
   - Lint: `npm run lint` (ESLint + Vue plugin).
   - Run (static): open `index.html` in browser or local HTTP server (`npx serve`), includes remote Vue CDN so no other bundling needed for dev preview.

4. Code style and conventions
   - Single global Vue app from `vuescript.js`; no module import for `mainscript.js/cn*.js` in browser flavors.
   - State via `data()` reactive props; many fields are mutated directly (e.g., `this.user_data.ti += ...`).
   - URL query string is used as explicit state regression for refresh/navigation (e.g., `&statue=result_page`, `&dom=...`, `&I=...`).
   - Component uses class-based styling toggles (`bclass`, `eclass`) and `v-if` panels (`nostart`, `result_page`, `enneagram_question`, `enneagram_result`).

5. Integration notes
   - Image paths are generated at runtime in `vuescript.js` (`img1/img2/img3` with `img/{result}.png`).
   - Enneagram branch computation uses `getmax` with ties and sets `trifix` (3-number code).
   - No external backend: everything client-side plus optional Google Ads includes in `index.html`.

6. What to avoid and checks
   - Do not assume modern `import/export` usage except in `vuescript.js` and `vuei18n.js`; the page uses global variables for legacy script files.
   - Keep i18n key naming patterns (`Ti_text`, `Ti_N_text`) when generating text values.
   - Update query params with `location.href` carefully; `replaceParamVal()` is in `mainscript.js` but currently uses `eval` and full reload.

---

✅ Ask: Please review and confirm if you'd like a second pass to add a small section on instrumentation (how to trace `eanswer` transitions) or a concise diagram of shared state updates.