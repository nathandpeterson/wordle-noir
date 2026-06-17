const stateClasses = {
  empty: "border-noir-rule/70 bg-noir-paper/70 text-noir-ink",
  filled: "border-noir-ink bg-noir-aged text-noir-ink",
  correct: "border-noir-correct bg-noir-correct text-noir-paper",
  present: "border-noir-present bg-noir-present text-noir-ink",
  absent: "border-noir-absent bg-noir-absent text-noir-paper",
} as const;

export type TileState = keyof typeof stateClasses;

type GameTileProps = {
  letter?: string;
  state?: TileState;
};

function GameTile({ letter = "", state = "empty" }: GameTileProps) {
  return (
    <div
      className={`grid aspect-square w-full place-items-center border-2 text-2xl font-bold uppercase leading-none shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] sm:text-3xl ${stateClasses[state]}`}
    >
      {letter}
    </div>
  );
}

export default GameTile;
