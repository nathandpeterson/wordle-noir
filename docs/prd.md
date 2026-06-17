# Wordle Noir — Product Spec

**Status:** Draft  
**Author:** Nathan  
**Last updated:** June 2026

---

## What is this

A Wordle clone with a 1940s noir atmosphere. Same core mechanic — guess a five-letter word in six tries, letters turn to tell you how close you are — but everything else is reskinned to feel like a page ripped out of a pulp detective novel. Typewriter font, sepia paper background, ink-black accents, and a little "clack" sound when letters land. The goal is to make something that feels immediately familiar but has its own personality.

---

## The twist in detail

### Visual identity

- Color palette: cream/parchment background (`#F5F0E8`), ink-black text (`#1C1C1A`), faded amber for "close" (`#C9922A`), deep teal for "correct" (`#1A6B55`), and mid-gray for "not in word" (`#8C8B86`). Light mode only for v1.
- Typography: a monospace or slab-serif that reads like a typewriter — something like `Courier Prime` or `Special Elite` (both on Google Fonts). Headers in a slightly heavier slab.
- The game grid should look like a typewritten form, complete with a thin horizontal rule at the top and a title like _"CASE FILE №[date]"_.
- Keyboard at the bottom styled as physical keys on a vintage machine — slightly raised, slightly off-white.

### Sound

- Sound is opt-in. The player can enable it with a small sound toggle in the header; the game starts muted.
- Typing a letter: a soft typewriter key clack (short, low-pitched)
- Deleting a letter: a lighter reverse click
- Submitting a row: a carriage return sound (the classic typewriter return lever noise)
- Win: a brief, satisfied "ding" like a typewriter bell
- Lose: a single low "thunk"

All sounds are short Web Audio API tones synthesized in code — no external audio files needed, keeps the build simple.

### Win/lose copy

Instead of a generic "Genius!" or "Phew," the result screen shows a randomized noir one-liner keyed to number of guesses:

| Guesses | Win line                                            |
| ------- | --------------------------------------------------- |
| 1       | _"You knew before the body was cold."_              |
| 2       | _"Sharp as a switchblade, kid."_                    |
| 3       | _"The case cracked like a bad alibi."_              |
| 4       | _"You got there. Takes a while to trust your gut."_ |
| 5       | _"City's full of angles. You found yours."_         |
| 6       | _"Closer than it felt. You always were."_           |
| Loss    | _"Some cases go cold. This was one of them."_       |

### Word list

Standard Wordle word list (the original leaked NYT list is public). No special noir vocabulary — keeping it familiar reduces friction and means we don't have to curate anything.

Implementation should bundle static local word arrays, split into a daily solution list and a broader allowed-guesses list.

---

## Mechanics (unchanged from Wordle)

- 5-letter target word, chosen daily by the player's local calendar date
- 6 attempts
- After each guess, tiles reveal:
  - **Correct** (right letter, right position) → deep teal
  - **Present** (right letter, wrong position) → amber
  - **Absent** (letter not in word) → gray
- Keyboard updates to reflect the best state of each letter across guesses
- Only valid 5-letter English words accepted as guesses (use same allowed-guesses list as original Wordle)
- One puzzle per day; state persists in `localStorage` so refreshing doesn't reset progress
- Desktop physical keyboard input is supported for letters, Backspace, and Enter. Mobile can use the on-screen keyboard for v1.

---

## Animations

Stealing the Wordle animations wholesale — these are the best part:

- **Flip reveal**: each tile in a submitted row flips on its Y-axis (CSS `rotateY`) to reveal its color, staggered 100ms per tile
- **Shake on invalid word**: the current row shakes horizontally if the guess isn't in the word list
- **Bounce on win**: the correct row's tiles do a quick vertical bounce after revealing, staggered
- **Pop on type**: a subtle scale-up (`transform: scale(1.1)`) when a letter is typed into a tile, then back to normal

Result messaging waits until the submitted row has finished revealing. All CSS transitions, no library needed.

---

## Screens / states

### Active game

- Title area: `CASE FILE №[MMDDYYYY]`
- 6×5 grid
- On-screen keyboard
- A small "?" icon in the corner that opens instructions
- A small sound icon in the corner that lets the player opt into synthesized sound
- A compact status line for invalid guesses and short feedback

### Instructions modal

Simple overlay explaining the rules and color meanings. Should match the noir aesthetic — styled like a typed memo. Shown automatically on first visit, blocks interaction until dismissed, and is tracked separately from daily puzzle state.

### Win state

- Tiles bounce
- Result card appears below the grid: noir one-liner, guess count, and a share button
- Share button copies the standard emoji grid to clipboard using `⬛`, `🟨`, and `🟩` — no platform branding needed

### Lose state

- Target word revealed below the grid
- Noir loss line displayed
- Share button still available

### Already played today

- Show the completed grid in its final state
- Show result card immediately
- Include a countdown to tomorrow's puzzle at local midnight

---

## Tech notes

This is meant to be a single HTML file or a minimal React app — whatever feels easier to build against. A few implementation notes:

**State shape**

```
{
  solution: string,
  guesses: string[],       // submitted guesses
  currentGuess: string,    // in-progress row
  gameState: 'playing' | 'won' | 'lost',
  hardMode: boolean        // stretch goal
}
```

**Daily word selection**  
Seed by local date: `solutionList[localDaysSinceEpoch % solutionList.length]`. Same word for players on the same local calendar date without needing a backend.

**Persistence**  
`localStorage` keyed by local date string. On load, check if today's key exists; if so, restore state and skip to result display. First-visit instructions use a separate persistent key.

**Sound synthesis**  
Web Audio API. Each sound is a brief `OscillatorNode` — typewriter clacks are noise-filtered oscillators around 200–400Hz, the bell is a sine wave at ~880Hz with fast decay. Sounds only play after the player enables them with the sound toggle.

**No backend required** — this is fully client-side.

---

## Out of scope for v1

- Hard mode (must use confirmed letters in subsequent guesses)
- Dark mode
- Statistics modal (streak, win distribution)
- Full accessibility / screen reader support
- Mobile keyboard handling (on-screen keyboard only for now)
- Internationalization

These are all real Wordle features but adding them would double the build time for something that's primarily an experiment.

---

## Open questions

- Is synthesized sound actually achievable without it sounding bad? Might be worth spiking this first before committing to it as a feature.
- Does the sepia/ink palette read well on modern displays, or does it just look washed out? Should prototype and check early.
