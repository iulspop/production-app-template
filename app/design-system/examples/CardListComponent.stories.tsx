import type { Meta, StoryObj } from "@storybook/react-vite";

import { CardListComponent } from "./CardListComponent";

const sampleProps = {
  heading: "Recent Sessions",
  items: [
    { id: "1", meta: "45 min", title: "Morning Check-in" },
    { id: "2", meta: "30 min", title: "Afternoon Reflection" },
    { id: "3", meta: "20 min", title: "Evening Review" },
  ],
};

const meta = {
  component: CardListComponent,
  title: "Design System/Examples/CardList",
} satisfies Meta<typeof CardListComponent>;

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
