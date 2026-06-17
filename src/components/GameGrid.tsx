import GameTile, { type TileState } from "./GameTile";

type PlaceholderTile = {
  letter: string;
  state: TileState;
};

const emptyTile: PlaceholderTile = { letter: "", state: "empty" };

const placeholderRows: PlaceholderTile[][] = [
  [
    { letter: "C", state: "correct" },
    { letter: "A", state: "absent" },
    { letter: "S", state: "present" },
    { letter: "E", state: "absent" },
    { letter: "S", state: "empty" },
  ],
  [
    { letter: "N", state: "filled" },
    { letter: "O", state: "filled" },
    { letter: "I", state: "filled" },
    { letter: "R", state: "filled" },
    { letter: "", state: "empty" },
  ],
  ...Array.from({ length: 4 }, () =>
    Array.from({ length: 5 }, () => emptyTile),
  ),
];

function GameGrid() {
  return (
    <section
      aria-label="Wordle Noir puzzle grid placeholder"
      className="mx-auto grid w-full max-w-[min(300px,34svh)] grid-rows-6 gap-1.5 sm:max-w-[min(330px,34svh)] sm:gap-2"
    >
      {placeholderRows.map((row, rowIndex) => (
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2" key={`row-${rowIndex}`}>
          {row.map((tile, tileIndex) => (
            <GameTile
              key={`${rowIndex}-${tileIndex}`}
              letter={tile.letter}
              state={tile.state}
            />
          ))}
        </div>
      ))}
    </section>
  );
}

export default GameGrid;
