import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Core/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger", "outline"],
      description: "Visual style of the button",
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
      description: "Size of the button",
      table: { defaultValue: { summary: "md" } },
    },
    loading: {
      control: "boolean",
      description: "Shows a spinner and disables interaction",
    },
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Confirm Trade",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Cancel",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "View Details",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Export CSV",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Liquidate Position",
  },
};

export const Loading: Story = {
  args: {
    variant: "primary",
    loading: true,
    children: "Processing...",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Confirm Trade",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap gap-3 items-center p-6">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex flex-wrap gap-3 items-center p-6">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const AsChild: Story = {
  name: "asChild (renders as <a>)",
  render: () => (
    <div className="flex flex-wrap gap-3 items-center p-6">
      <Button asChild variant="primary">
        <a href="#">Go to Portfolio</a>
      </Button>
      <Button asChild variant="secondary">
        <a href="#">View Report</a>
      </Button>
      <Button asChild variant="ghost">
        <a href="#">Learn More</a>
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  name: "With Icons",
  render: () => (
    <div className="flex flex-wrap gap-3 items-center p-6">
      <Button
        leftIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        }
      >
        Buy
      </Button>
      <Button
        variant="danger"
        leftIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
            <polyline points="17 18 23 18 23 12" />
          </svg>
        }
      >
        Sell
      </Button>
    </div>
  ),
};
