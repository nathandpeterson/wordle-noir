import type { Meta, StoryObj } from "@storybook/react-vite";
import GameGrid, { type PlaceholderTile } from "./GameGrid";

const makeEmptyRow = (): PlaceholderTile[] =>
  Array.from({ length: 5 }, () => ({ letter: "", state: "empty" }));

const rows: ReadonlyArray<ReadonlyArray<PlaceholderTile>> = [
  [
    { letter: "C", state: "correct" },
    { letter: "A", state: "absent" },
    { letter: "S", state: "present" },
    { letter: "E", state: "absent" },
    { letter: "S", state: "correct" },
  ],
  [
    { letter: "N", state: "filled" },
    { letter: "O", state: "filled" },
    { letter: "I", state: "filled" },
    { letter: "R", state: "filled" },
    { letter: "", state: "empty" },
  ],
  ...Array.from({ length: 4 }, makeEmptyRow),
] as const;

const emptyRows: PlaceholderTile[][] = Array.from({ length: 6 }, () =>
  makeEmptyRow(),
);

const meta = {
  title: "Components/GameGrid",
  component: GameGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen px-4 py-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GameGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};

export const Empty: Story = {
  args: {
    label: "Empty puzzle grid",
    rows: emptyRows,
  },
};

export const MixedStates: Story = {
  args: {
    label: "Puzzle grid with submitted and active rows",
    rows,
  },
};

export const Compact: Story = {
  args: {
    label: "Compact puzzle grid",
    rows,
  },
  decorators: [
    (Story) => (
      <div className="w-[320px] px-3 py-6">
        <Story />
      </div>
    ),
  ],
};
