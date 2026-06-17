import type { Meta, StoryObj } from "@storybook/react-vite";
import StatusLine from "./StatusLine";

const meta = {
  title: "Components/StatusLine",
  component: StatusLine,
  tags: ["autodocs"],
  args: {
    children: "Awaiting a lead.",
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatusLine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Success: Story = {
  args: {
    children: "Case closed.",
    tone: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Not in the dossier.",
    tone: "warning",
  },
};

export const Muted: Story = {
  args: {
    children: "No more leads.",
    tone: "muted",
  },
};
