import type { Meta, StoryObj } from "@storybook/react-vite";
import IconButton from "./IconButton";

const meta = {
  title: "UI/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    children: "?",
    label: "Open instructions",
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Help: Story = {};

export const Close: Story = {
  args: {
    children: "x",
    label: "Close",
  },
};

export const Disabled: Story = {
  args: {
    children: "!",
    label: "Unavailable",
    disabled: true,
    className: "disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-55",
  },
};

export const Focused: Story = {
  args: {
    autoFocus: true,
    className: "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-noir-present",
  },
};
