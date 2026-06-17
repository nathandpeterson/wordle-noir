# Wordle Noir Implementation Plan

This document breaks the Wordle Noir build into small, reviewable PR-sized chunks. Each chunk should be independently understandable, shippable to the branch, and easy to review without needing the entire app to be complete.

## PR 1: Establish App Shell and Styling Foundations

**Goal:** Create the visual and structural foundation for the app without implementing game logic.

**Scope:**

- Add global CSS reset and base layout.
- Establish the Noir palette as CSS custom properties.
- Add typography choices and font loading strategy.
- Build the static page frame: header, case-file title area, main play area, footer/status region.
- Add placeholder grid and keyboard components with static data.

**Review focus:**

- Does the app feel directionally noir without becoming noisy?
- Does the page layout work on desktop and narrow mobile widths?
- Are colors and type choices readable enough to continue?

**Validation:**

- Run `npm run build`.
- Visually inspect desktop and mobile viewport sizes.

## PR 2: Establish Frontend Quality Gates

**Goal:** Add the lightweight test and lint foundations before core game logic lands.

**Priority:** Do this next. These tools are cheap to add while the app is still small, and they make the upcoming date, guess-evaluation, and state logic PRs easier to review.

**Scope:**

- Add Vitest with React Testing Library and `jsdom`.
- Add `npm run test`, `npm run test:watch`, and any needed setup file.
- Add focused example tests for an existing component or small helper so the setup is proven.
- Tighten ESLint best-practice rules, including React hooks rules and circular import detection.
- Confirm generated output, coverage output, and Storybook output directories are ignored by lint where needed.

**Review focus:**

- Test setup is simple and Vite-native.
- ESLint catches high-risk React and dependency-graph mistakes without becoming noisy.
- Commands are clear enough to become pre-push checks later.

**Validation:**

- Run `npm run lint`.
- Run `npm run test`.
- Run `npm run build`.

## PR 3: Add Component Storybook

**Goal:** Create a place to develop and review the small UI building blocks before the game grows more states.

**Priority:** Do this after the initial test/lint gate and before heavy component-state work.

**Scope:**

- Add Storybook for Vite + React.
- Add stories for `Button`, `IconButton`, `GameTile`, `GameGrid`, `Keyboard`, and `StatusLine`.
- Cover meaningful visual states such as empty, filled, correct, present, absent, disabled, focused, and compact/mobile-friendly arrangements.
- Ensure global styles and font decisions load in Storybook.
- Add `npm run storybook` and `npm run build-storybook`.

**Review focus:**

- Stories help inspect component states without running through a full game.
- Storybook styling matches the app shell closely enough to be useful.
- Story files stay close to the components and do not introduce app-level logic.

**Validation:**

- Run `npm run build-storybook`.
- Spot-check the key stories locally.

## PR 4: Decide Font and External Asset Strategy

**Goal:** Decide whether v1 should depend on remote Google Fonts or use local/system fonts.

**Options:**

- **Google Fonts:** Use `Courier Prime` or `Special Elite` via stylesheet import. Best atmosphere, small network dependency.
- **System font stack:** Use local monospace/slab-ish fallbacks. Fast and dependency-free, less distinctive.
- **Bundled font files:** Best offline behavior and consistent look, but adds asset management.

**Recommended decision:** Use Google Fonts for v1 unless offline behavior becomes a stated goal.

**Deliverable:**

- Document the choice in the PR description.
- Implement the chosen approach in the app shell.

**Validation:**

- Confirm fallback font remains acceptable if the font fails to load.

## PR 5: Add Word Lists and Daily Puzzle Selection

**Goal:** Add deterministic local-date solution selection and word validation data.

**Scope:**

- Add static `solutions` and `allowedGuesses` word arrays.
- Implement local date key formatting.
- Implement `getTodaysSolution()`.
- Implement `isAllowedGuess()`.
- Add pure helper tests for date selection and allowed-guess validation.

**Review focus:**

- Word list source and licensing/public provenance are clear.
- Date behavior is local-date based, as specified.
- Solution list and allowed guesses are separated.

**Validation:**

- Run `npm run test`.
- Manual check that the same local date returns the same solution.
- Manual check that different local dates advance predictably.

## PR 6: Implement Core Game State and Guess Evaluation

**Goal:** Implement the Wordle mechanics without animation polish.

**Scope:**

- Add state for `solution`, `guesses`, `currentGuess`, and `gameState`.
- Support letter entry, deletion, and submission.
- Implement correct handling of repeated letters during evaluation.
- Prevent guesses after win/loss.
- Show submitted row colors immediately after submit.
- Update keyboard letter states using best-known status.
- Add unit tests for duplicate-letter evaluation, state transitions, and keyboard status precedence.

**Review focus:**

- Guess evaluation matches Wordle behavior, especially duplicate letters.
- State transitions are simple and inspectable.
- Keyboard state never downgrades from correct to present/absent.

**Validation:**

- Run `npm run test`.
- Test several duplicate-letter cases manually.
- Run `npm run build`.

## PR 7: Add Physical and On-Screen Keyboard Input

**Goal:** Make input ergonomic across desktop and mobile without adding mobile native keyboard behavior.

**Scope:**

- Wire on-screen keyboard buttons for letters, Enter, and Backspace.
- Add desktop physical keyboard support for `A-Z`, Enter, and Backspace.
- Ignore keyboard events when modal interactions are active.
- Add basic disabled/endgame behavior.

**Review focus:**

- Keyboard input does not double-submit or conflict with browser shortcuts.
- The app remains usable on touch devices via the on-screen keyboard.

**Validation:**

- Manual desktop keyboard pass.
- Manual touch/click keyboard pass.

## PR 8: Add Persistence and Already-Played Restore

**Goal:** Persist daily game progress and restore completed puzzles.

**Scope:**

- Store daily puzzle state in `localStorage` keyed by local date.
- Restore in-progress, won, and lost states on load.
- Avoid restoring stale data for a different date.
- Show completed grid and result card immediately for already-played games.

**Review focus:**

- Storage shape is versionable enough for v1.
- Restored state cannot desync from today's solution.
- Refreshing mid-game does not reset progress.

**Validation:**

- Refresh during play, after win, and after loss.
- Manually change local storage date key or clear storage to verify fresh start.

## PR 9: Build Instructions Modal and First-Visit Behavior

**Goal:** Add the help/instructions experience.

**Scope:**

- Add `?` header control.
- Build noir memo-style modal with rules and color examples.
- Automatically show on first visit.
- Persist `seenInstructions` separately from daily puzzle state.
- Block game interaction while modal is open.

**Review focus:**

- Modal is visually consistent and compact.
- First-visit behavior does not reappear every day.
- Controls are labeled and keyboard-dismiss behavior is reasonable.

**Validation:**

- Clear `seenInstructions` key and reload.
- Open/close modal from header.

## PR 10: Add Result Cards, Share Text, and Countdown

**Goal:** Complete win/loss and already-played result surfaces.

**Scope:**

- Show noir one-liner by guess count or loss state.
- Reveal target word on loss.
- Add share button that copies standard emoji grid.
- Add copy success/failure feedback.
- Add countdown to local midnight for completed games.

**Review focus:**

- Share text is recognizable and spoiler-free.
- Loss state clearly reveals the answer.
- Countdown handles local midnight correctly.

**Validation:**

- Copy share text for win and loss.
- Force completed state and verify countdown updates.

## PR 11: Add End-to-End Smoke Tests

**Goal:** Add Playwright coverage once the app has enough real behavior to test from the user's point of view.

**Priority:** Do this after keyboard, persistence, instructions, and results exist. Earlier than that, E2E tests would be mostly scaffolding; later than this, regressions become harder to catch.

**Scope:**

- Add Playwright configured for the Vite dev server.
- Add `npm run test:e2e` and any required install/setup documentation.
- Cover a happy-path win flow using physical or on-screen input.
- Cover an invalid guess or duplicate-letter case if stable test data exists.
- Cover refresh/restore behavior for an in-progress or completed daily puzzle.
- Add a basic mobile viewport smoke test for layout stability.

**Review focus:**

- Tests exercise user-visible behavior rather than implementation details.
- Test data is deterministic and does not depend on the real current date unless explicitly controlled.
- E2E coverage stays small enough to run locally before push.

**Validation:**

- Run `npm run test:e2e`.
- Run `npm run build`.

## PR 12: Add Animation Pass

**Goal:** Add Wordle-like motion once the core behavior is stable.

**Scope:**

- Add pop-on-type animation.
- Add invalid-guess shake.
- Add staggered flip reveal.
- Add win bounce after reveal completes.
- Delay result card until reveal/bounce timing finishes.

**Review focus:**

- Animations are pleasant but do not make state logic fragile.
- Invalid guesses do not accidentally submit.
- Result card timing feels intentional.

**Validation:**

- Manual invalid guess, valid guess, win, and loss flows.
- Confirm animation does not leave tiles in a wrong visual state after refresh.

## PR 13: Spike Synthesized Sound Quality

**Goal:** Determine whether synthesized Web Audio sounds are good enough for v1.

**Scope:**

- Add a tiny internal sound utility or scratch implementation.
- Create opt-in sound toggle, default muted.
- Prototype type, delete, submit, win, and lose sounds.
- Tune envelope/frequency/noise enough to make a keep/drop decision.

**Decision outcomes:**

- **Keep:** Sounds are good enough; retain utility and wire into game events.
- **Simplify:** Keep only bell/submit sounds if clacks are unpleasant.
- **Drop:** Leave the sound toggle out of v1 and document why.

**Review focus:**

- No sound plays until the player opts in.
- Audio initialization works with browser user-gesture rules.
- Sounds feel additive rather than gimmicky.

**Validation:**

- Manual browser test after toggling sound on.
- Confirm muted mode is silent.

## PR 14: Visual Polish and Responsive Pass

**Goal:** Bring the app from functional to polished.

**Scope:**

- Tune tile, keyboard, modal, and result card spacing.
- Verify palette contrast in real use.
- Add parchment/form details without overwhelming the game.
- Ensure text fits in buttons and compact panels.
- Make viewport height behavior comfortable on mobile.

**Review focus:**

- The grid remains the centerpiece.
- UI does not feel like a generic Wordle reskin with only colors changed.
- Mobile layout is stable and not cramped.

**Validation:**

- Manual desktop and mobile viewport screenshots.
- Run `npm run build`.

## PR 15: Add Pre-Push Enforcement

**Goal:** Use Husky to enforce the core local quality gates once the scripts have settled.

**Priority:** Add this late enough that the hook runs known-good commands, but before final handoff so broken lint, tests, or builds do not slip in.

**Scope:**

- Add Husky and initialize repository hooks.
- Add a pre-push hook that runs `npm run lint`, `npm run test`, and `npm run build`.
- Decide whether `npm run test:e2e` belongs in pre-push or remains a manual/CI gate. Default recommendation: keep Playwright out of pre-push unless the suite is very fast and reliable locally.
- Document how to run the same checks manually.

**Review focus:**

- Hook failures are actionable and not flaky.
- The hook enforces best practices without making small local pushes painful.
- README instructions match the actual scripts.

**Validation:**

- Run the pre-push command sequence manually.
- Confirm a sample hook invocation fails when one command fails.

## PR 16: Final Hardening and README Update

**Goal:** Prepare v1 for handoff.

**Scope:**

- Add or update README with local dev/build instructions.
- Clean up dead code and temporary spike artifacts.
- Confirm lint/test/build pass.
- Confirm Playwright smoke tests pass or document any intentional skip.
- Do a full playthrough checklist.
- Capture known limitations and follow-up ideas.

**Review focus:**

- Repo is understandable to a future contributor.
- Known limitations match the PRD's v1 scope.
- No obvious debug-only behavior remains.

**Validation:**

- Run `npm run lint`.
- Run `npm run test`.
- Run `npm run test:e2e`.
- Run `npm run build`.
- Complete manual win and loss playthroughs.

## Suggested Build Order

1. PR 1: App shell and styling foundations
2. PR 2: Frontend quality gates
3. PR 3: Component Storybook
4. PR 4: Font and external asset decision
5. PR 5: Word lists and daily puzzle selection
6. PR 6: Core game state and guess evaluation
7. PR 7: Keyboard input
8. PR 8: Persistence and restore
9. PR 9: Instructions modal
10. PR 10: Result cards, share, and countdown
11. PR 11: End-to-end smoke tests
12. PR 12: Animations
13. PR 13: Sound quality spike
14. PR 14: Visual polish and responsive pass
15. PR 15: Pre-push enforcement
16. PR 16: Final hardening and README update

## Cross-Cutting Notes

- Keep each PR small enough to review without needing to mentally simulate the entire game.
- Prefer pure helper functions for date selection, guess evaluation, keyboard status, and share text generation.
- Prefer Vitest for pure logic and component behavior, Storybook for visual state review, and Playwright only for critical user flows.
- Keep pre-push checks limited to fast, reliable gates. Move slow or flaky checks to manual validation or CI rather than training contributors to bypass hooks.
- Avoid introducing a UI library unless the app grows beyond the current PRD. The expected v1 surface area is small enough for plain React and CSS.
- Avoid state-management libraries for v1. React state plus a few helpers should be sufficient.
- Treat accessibility as "not a full v1 feature, but no obvious traps": labels on icon buttons, reasonable focus behavior, readable contrast, and no essential information conveyed by color alone in the instructions.
