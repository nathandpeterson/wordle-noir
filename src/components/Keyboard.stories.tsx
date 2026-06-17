import type { Meta, StoryObj } from "@storybook/react-vite";
import Keyboard from "./Keyboard";

const meta = {
  title: "Components/Keyboard",
  component: Keyboard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen px-3 py-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Keyboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EvaluatedLetters: Story = {
  args: {
    keyStates: {
      C: "correct",
      A: "absent",
      S: "present",
      E: "absent",
      N: "filled",
      O: "filled",
      I: "filled",
      R: "filled",
    },
  },
};

export const DisabledLetters: Story = {
  args: {
    disabledKeys: ["A", "E", "S"],
    keyStates: {
      A: "absent",
      E: "absent",
      S: "present",
    },
  },
};

export const Compact: Story = {
  args: {
    keyStates: {
      C: "correct",
      A: "absent",
      S: "present",
      E: "absent",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[320px] px-2 py-8">
        <Story />
      </div>
    ),
  ],
};
