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

## PR 2: Decide Font and External Asset Strategy

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

## PR 3: Add Word Lists and Daily Puzzle Selection

**Goal:** Add deterministic local-date solution selection and word validation data.

**Scope:**

- Add static `solutions` and `allowedGuesses` word arrays.
- Implement local date key formatting.
- Implement `getTodaysSolution()`.
- Implement `isAllowedGuess()`.
- Add lightweight unit-testable pure helpers if the project test setup exists by then; otherwise keep helpers isolated for later tests.

**Review focus:**

- Word list source and licensing/public provenance are clear.
- Date behavior is local-date based, as specified.
- Solution list and allowed guesses are separated.

**Validation:**

- Manual check that the same local date returns the same solution.
- Manual check that different local dates advance predictably.

## PR 4: Implement Core Game State and Guess Evaluation

**Goal:** Implement the Wordle mechanics without animation polish.

**Scope:**

- Add state for `solution`, `guesses`, `currentGuess`, and `gameState`.
- Support letter entry, deletion, and submission.
- Implement correct handling of repeated letters during evaluation.
- Prevent guesses after win/loss.
- Show submitted row colors immediately after submit.
- Update keyboard letter states using best-known status.

**Review focus:**

- Guess evaluation matches Wordle behavior, especially duplicate letters.
- State transitions are simple and inspectable.
- Keyboard state never downgrades from correct to present/absent.

**Validation:**

- Test several duplicate-letter cases manually.
- Run `npm run build`.

## PR 5: Add Physical and On-Screen Keyboard Input

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

## PR 6: Add Persistence and Already-Played Restore

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

## PR 7: Build Instructions Modal and First-Visit Behavior

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

## PR 8: Add Result Cards, Share Text, and Countdown

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

## PR 9: Add Animation Pass

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

## PR 10: Spike Synthesized Sound Quality

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

## PR 11: Visual Polish and Responsive Pass

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

## PR 12: Final Hardening and README Update

**Goal:** Prepare v1 for handoff.

**Scope:**

- Add or update README with local dev/build instructions.
- Clean up dead code and temporary spike artifacts.
- Confirm lint/build pass.
- Do a full playthrough checklist.
- Capture known limitations and follow-up ideas.

**Review focus:**

- Repo is understandable to a future contributor.
- Known limitations match the PRD's v1 scope.
- No obvious debug-only behavior remains.

**Validation:**

- Run `npm run lint`.
- Run `npm run build`.
- Complete manual win and loss playthroughs.

## Suggested Build Order

1. PR 1: App shell and styling foundations
2. PR 2: Font and external asset decision
3. PR 3: Word lists and daily puzzle selection
4. PR 4: Core game state and guess evaluation
5. PR 5: Keyboard input
6. PR 6: Persistence and restore
7. PR 7: Instructions modal
8. PR 8: Result cards, share, and countdown
9. PR 9: Animations
10. PR 10: Sound quality spike
11. PR 11: Visual polish and responsive pass
12. PR 12: Final hardening and README update

## Cross-Cutting Notes

- Keep each PR small enough to review without needing to mentally simulate the entire game.
- Prefer pure helper functions for date selection, guess evaluation, keyboard status, and share text generation.
- Avoid introducing a UI library unless the app grows beyond the current PRD. The expected v1 surface area is small enough for plain React and CSS.
- Avoid state-management libraries for v1. React state plus a few helpers should be sufficient.
- Treat accessibility as "not a full v1 feature, but no obvious traps": labels on icon buttons, reasonable focus behavior, readable contrast, and no essential information conveyed by color alone in the instructions.
