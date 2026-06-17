import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Submit Lead",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Typewriter: Story = {};

export const Ghost: Story = {
  args: {
    children: "Review File",
    variant: "ghost",
  },
};

export const Disabled: Story = {
  args: {
    children: "Locked",
    disabled: true,
    className: "disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-55",
  },
};

export const Focused: Story = {
  args: {
    children: "Focused",
    autoFocus: true,
    className: "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-noir-present",
  },
};
