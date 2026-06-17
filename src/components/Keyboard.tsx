import Button from "./ui/Button";

const keyboardRows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const rowClasses = [
  "grid-cols-10",
  "grid-cols-9 px-4",
  "grid-cols-[1.25fr_repeat(7,minmax(0,1fr))_1.25fr]",
];

function Keyboard() {
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
            {row.split("").map((key) => (
              <Button
                className="min-w-0 px-0 text-sm sm:text-base"
                key={key}
              >
                {key}
              </Button>
            ))}
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
