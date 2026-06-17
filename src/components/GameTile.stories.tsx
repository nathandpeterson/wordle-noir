import type { Meta, StoryObj } from "@storybook/react-vite";
import GameTile, { type TileState } from "./GameTile";

const tileStates: TileState[] = ["empty", "filled", "correct", "present", "absent"];

const meta = {
  title: "Components/GameTile",
  component: GameTile,
  tags: ["autodocs"],
  args: {
    letter: "N",
    state: "filled",
  },
  decorators: [
    (Story) => (
      <div className="w-16">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GameTile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Filled: Story = {};

export const Empty: Story = {
  args: {
    letter: "",
    state: "empty",
  },
};

export const Correct: Story = {
  args: {
    letter: "C",
    state: "correct",
  },
};

export const Present: Story = {
  args: {
    letter: "A",
    state: "present",
  },
};

export const Absent: Story = {
  args: {
    letter: "S",
    state: "absent",
  },
};

export const StateSet: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-2">
      {tileStates.map((state) => (
        <GameTile
          key={state}
          letter={state === "empty" ? "" : state.charAt(0)}
          state={state}
        />
      ))}
    </div>
  ),
};
