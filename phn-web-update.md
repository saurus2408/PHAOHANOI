# PHN FC Website Update

## Goal
Modernize the UI of all pages and update key components: Player Cards with detail modals, Internal/Friendly match results tabs, and Row-level edit controls in Rankings Admin.

## Tasks
- [x] Task 1: Update `css/shared.css` with modernized design tokens, geometric sharp UI, micro-animations, and custom typography variables. → Verify: View index page and check modern feel.
- [x] Task 2: Update `players.html` to load/save player metadata (position, strength, dob, hometown) encoded in JSON format in the `name` column, add a player details modal on card click, and add edit controls in admin mode. → Verify: Click player card to show modal; add and edit player records.
- [x] Task 3: Update `results.html` to add Internal/Friendly result tabs using the database `status` column, and implement `getTeamAbbreviation()` for automated 3-letter team avatars. → Verify: Toggle tabs and add new results with matching match types.
- [x] Task 4: Update `rankings.html` to use a row-level edit modal instead of inline bulk input fields, and filter team rankings to only include internal matches. → Verify: Edit a player's score via edit icon modal and save.
- [x] Task 5: Harmonize styling on other pages: `index.html`, `awards.html`, and `videos.html`. → Verify: Check consistency across all subpages.
- [x] Task 6: Run local server and verify all flows (CRUD for players, results, rankings, awards, videos). → Verify: Dev server runs without errors.

## Done When
- [x] Overall layout is premium, modern, and uniform.
- [x] Additional player profile fields are fully editable and displayed in a popup detail modal.
- [x] Match results are categorized into Internal and Friendly tabs.
- [x] Team logos auto-abbreviate to 3 letters.
- [x] Rankings admin statistics editing is row-specific, secure, and preserves old scores.
