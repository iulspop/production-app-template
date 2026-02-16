import type { Meta, StoryObj } from "@storybook/react-vite";

import { SessionCardComponent } from "./SessionCardComponent";

const sampleProps = {
  date: "Jan 15, 2026",
  duration: "45 min",
  tags: [
    { label: "Reflection", variant: "warm" as const },
    { label: "Growth", variant: "natural" as const },
    { label: "Focus", variant: "cool" as const },
  ],
  title: "Morning Check-in",
};

const meta = {
  component: SessionCardComponent,
  title: "Design System/Examples/SessionCard",
} satisfies Meta<typeof SessionCardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: sampleProps,
};

export const Dark: Story = {
  args: sampleProps,
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};
