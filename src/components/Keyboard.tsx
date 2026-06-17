import Button from "./ui/Button";
import type { TileState } from "./GameTile";

const keyboardRows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const rowClasses = [
  "grid-cols-10",
  "grid-cols-9 px-4",
  "grid-cols-[1.25fr_repeat(7,minmax(0,1fr))_1.25fr]",
];

const keyStateClasses: Partial<Record<TileState, string>> = {
  correct: "border-noir-correct bg-noir-correct text-noir-paper",
  present: "border-noir-present bg-noir-present text-noir-ink",
  absent: "border-noir-absent bg-noir-absent text-noir-paper",
  filled: "border-noir-ink bg-noir-aged text-noir-ink",
};

type KeyboardProps = {
  disabledKeys?: string[];
  keyStates?: Partial<Record<string, TileState>>;
};

function Keyboard({ disabledKeys = [], keyStates = {} }: KeyboardProps) {
  const disabledKeySet = new Set(disabledKeys.map((key) => key.toUpperCase()));

  return (
    <section aria-label="On-screen keyboard placeholder" className="w-full">
      <div className="mx-auto flex w-full max-w-[560px] flex-col gap-1">
        {keyboardRows.map((row, rowIndex) => (
          <div
            className={`grid gap-1 ${rowClasses[rowIndex] ?? ""}`}
            key={row}
          >
            {rowIndex === 2 && (
              <Button className="min-w-0 px-1 text-[0.7rem] sm:px-2 sm:text-sm">
                Enter
              </Button>
            )}
            {row.split("").map((key) => {
              const state = keyStates[key];
              const stateClass = state ? keyStateClasses[state] : "";

              return (
                <Button
                  className={`min-w-0 px-0 text-sm disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-55 sm:text-base ${stateClass}`}
                  disabled={disabledKeySet.has(key)}
                  key={key}
                >
                  {key}
                </Button>
              );
            })}
            {rowIndex === 2 && (
              <Button
                aria-label="Delete"
                className="min-w-0 px-1 text-lg sm:px-2"
              >
                ←
              </Button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Keyboard;
