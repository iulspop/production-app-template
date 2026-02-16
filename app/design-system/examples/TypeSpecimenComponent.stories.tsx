import type { Meta, StoryObj } from "@storybook/react-vite";

import { TypeSpecimenComponent } from "./TypeSpecimenComponent";

const meta = {
  component: TypeSpecimenComponent,
  title: "Design System/Examples/TypeSpecimen",
} satisfies Meta<typeof TypeSpecimenComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};
