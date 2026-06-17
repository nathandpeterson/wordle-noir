import type { Preview } from "@storybook/react-vite";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        paper: { name: "Noir paper", value: "#f5f0e8" },
        aged: { name: "Aged paper", value: "#e6dac5" },
        ink: { name: "Ink", value: "#1c1c1a" },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
};

export default preview;
