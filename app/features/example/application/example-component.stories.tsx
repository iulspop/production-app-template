import type { Meta, StoryObj } from "@storybook/react-vite";

import { ExampleComponent } from "./example-component";

const meta = {
  component: ExampleComponent,
  title: "Example/ExampleComponent",
} satisfies Meta<typeof ExampleComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "Hello from Storybook",
  },
};
