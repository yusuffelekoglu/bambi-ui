import type { Preview } from "@storybook/react";
import "../../../packages/ui/src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "surface", value: "#f7f7f8" },
        { name: "dark", value: "#0a0a0f" },
      ],
    },
  },
};

export default preview;
